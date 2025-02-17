'use server'

import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const session = await getServerSession(nextAuthCfg)

	const existUser = await prisma.user.findUnique({
		where: {
			email: session?.user.email!,
		},
	})

	if (!existUser) {
		return NextResponse.json(
			{ message: 'Пользователь не найден' },
			{ status: 400 }
		)
	}

	const status = await prisma.application.findFirst({
		where: {
			userId: existUser.id,
		},
		select: {
			status: true,
		},
	})

	if (!status) {
		return NextResponse.json({ status: null })
	}

	return NextResponse.json({ status: status.status })
}
