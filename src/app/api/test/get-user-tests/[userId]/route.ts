import { NextResponse } from 'next/server'
import prisma from '../../../../../../prisma/prisma-client'

export async function GET(
	req: Request,
	{ params }: { params: { userId: string } }
) {
	const { userId } = await params

	const tests =
		(await prisma.userTests.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				createdAt: true,
				grade: true,
			},
		})) || []

	return NextResponse.json(tests, { status: 200 })
}
