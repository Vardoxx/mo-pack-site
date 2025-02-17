// guard/admin.guard.ts
import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '../../../prisma/prisma-client'

export async function adminGuard() {
	const session = await getServerSession(nextAuthCfg)

	if (!session?.user?.email) {
		return NextResponse.json('Не авторизован', { status: 401 })
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
	})

	if (user?.role === 'admin' || user?.role === 'owner') {
		return
	}

	return NextResponse.json('Доступ ограничен', { status: 403 })
}
