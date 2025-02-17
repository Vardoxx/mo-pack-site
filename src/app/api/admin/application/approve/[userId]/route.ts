import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'

export async function PUT(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params

	const application = await prisma.application.findFirst({
		where: {
			userId,
		},
	})

	if (!application)
		return NextResponse.json('Заявка не найдена', { status: 400 })

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			name: {
				set: application?.name,
			},
			steamId: {
				set: application?.steamId,
			},
			kit: {
				set: application?.kit,
			},
			role: {
				set: 'member',
			},
		},
	})

	if (!updatedUser)
		return NextResponse.json('Пользователь не найден', { status: 400 })

	return NextResponse.json('Заявка одобрена', { status: 200 })
}
