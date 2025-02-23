import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { KitEnum } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/prisma-client'

export async function GET() {
	const session = await getServerSession(nextAuthCfg)

	const kitOrder: KitEnum[] = ['SL', 'ENG', 'LAT', 'RFL', 'MD']

	if (!session)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	const members = await prisma.user.findMany({
		where: {
			role: {
				in: ['member', 'admin', 'owner'],
			},
		},
		select: {
			name: true,
			kit: true,
			competitive: true,
		},
	})

	const sortedMembers = members.sort((a, b) => {
		const aIndex = kitOrder.indexOf(a.kit!)
		const bIndex = kitOrder.indexOf(b.kit!)

		return aIndex - bIndex
	})

	return NextResponse.json(sortedMembers, { status: 200 })
}
