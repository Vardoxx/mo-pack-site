import { second } from '@/constants/time.constants'
import { getServerSessionUserData } from '@/server-utils/get-server-session-data'
import { timeBlock } from '@/server-utils/time-block'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const user = await getServerSessionUserData()

	if (user.unauthorized)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	const lastUserTest = await prisma.userTests.findFirst({
		where: {
			userId: user.id,
		},
		select: {
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	if (!lastUserTest)
		return NextResponse.json(
			{
				block: false,
			},
			{ status: 200 }
		)

	const remainingTime = timeBlock(lastUserTest.createdAt, second * 20)

	return NextResponse.json(
		{ block: !remainingTime ? false : true, remainingTime: remainingTime },
		{ status: 200 }
	)
}
