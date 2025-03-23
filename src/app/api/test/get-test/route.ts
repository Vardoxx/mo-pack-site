import { getServerSessionUserData } from '@/server-utils/get-server-session-data'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const user = await getServerSessionUserData()

	if (user.unauthorized)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	if (user.role === 'guest')
		return NextResponse.json({ message: 'Доступ ограничен' }, { status: 403 })

	const test = await prisma.test.findUnique({
		where: {
			kit: user.kit,
		},
		select: {
			kit: true,
			questions: {
				select: {
					text: true,
					arrangement: true,
					answers: {
						select: {
							text: true,
							arrangement: true,
						},
					},
				},
			},
		},
	})

	return NextResponse.json(test, { status: 200 })
}
