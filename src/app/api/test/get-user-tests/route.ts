import { getServerSessionUserData } from '@/server-utils/get-server-session-data'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET(req: Request) {
	const user = await getServerSessionUserData()

	if (user.unauthorized)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	if (user.role === 'guest')
		return NextResponse.json({ message: 'Доступ ограничен' }, { status: 403 })

	const tests =
		(await prisma.userTests.findMany({
			where: {
				userId: user.id,
			},
			select: {
				id: true,
				createdAt: true,
				grade: true,
				wrongAnswers: {
					select: {
						question: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})) || []

	return NextResponse.json(tests, { status: 200 })
}
