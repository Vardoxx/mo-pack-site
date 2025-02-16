'use server'

import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { ApplicationRequest } from '@/types/application-api.types'
import { KitEnum } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function POST(req: Request) {
	const session = await getServerSession(nextAuthCfg)

	if (!session)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	const userData = await prisma.user.findUnique({
		where: {
			email: session.user.email!,
		},
	})

	const existApplication = await prisma.application.findFirst({
		where: {
			userId: userData?.id!,
		},
	})

	if (existApplication)
		return NextResponse.json(
			{ message: 'У вас уже есть активная заявка' },
			{ status: 400 }
		)

	const data: ApplicationRequest = await req.json()

	const request = await prisma.application.create({
		data: {
			...data,
			kit: data.kit as KitEnum,
			user: {
				connect: {
					id: userData?.id,
				},
			},
		},
	})

	return NextResponse.json(request, { status: 201 })
}
