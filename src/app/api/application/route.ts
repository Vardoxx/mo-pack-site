import { ApplicationRequest } from '@/types/application-api.types'
import { useSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/prisma-client'

export async function POST(request: Request) {
	const email = await useSession().data?.user?.email?.toString()

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	const data: ApplicationRequest = await request.json()

	const response = await prisma.application.create({
		data: {
			...data,
			user: {
				connect: {
					id: user?.id,
				},
			},
		},
	})

	return NextResponse.json(response)
}
