import { day } from '@/constants/time.constants'
import { timeBlock } from '@/server-utils/time-block'
import { NextResponse } from 'next/server'
import prisma from '../../../../../../prisma/prisma-client'

export async function GET(
	req: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params

	const lastUserTest = await prisma.userTests.findFirst({
		where: {
			userId,
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

	const remainingTime = timeBlock(lastUserTest.createdAt, day * 2)

	return NextResponse.json(
		{ block: !remainingTime ? false : true, remainingTime: remainingTime },
		{ status: 200 }
	)
}
