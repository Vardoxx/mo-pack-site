import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'

export async function PUT(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params

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
			competitive: {
				set: 'RESERVE',
			},
		},
	})

	if (!updatedUser)
		return NextResponse.json('Пользователь не найден', { status: 400 })

	await prisma.application.delete({
		where: {
			id: application.id,
		},
	})

	return NextResponse.json('Заявка одобрена', { status: 200 })
}
