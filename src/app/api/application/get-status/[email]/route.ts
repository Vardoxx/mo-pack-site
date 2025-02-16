'use server'

import { NextResponse } from 'next/server'
import prisma from '../../../../../../prisma/prisma-client'

export async function GET(
	req: Request,
	{ params }: { params: { email: string } }
) {
	const { email } = await params

	const existUser = await prisma.user.findUnique({
		where: {
			email,
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
