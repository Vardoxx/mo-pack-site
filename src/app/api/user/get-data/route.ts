import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const session = await getServerSession(nextAuthCfg)

	if (!session)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email!,
		},
	})

	if (!user)
		return NextResponse.json({ message: 'Не существует' }, { status: 404 })

	return NextResponse.json(user, { status: 200 })
}
