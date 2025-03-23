import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { IUserDataWithStatus } from '@/types/user.types'
import { getServerSession } from 'next-auth'
import prisma from '../../prisma/prisma-client'

export async function getServerSessionUserData() {
	const session = await getServerSession(nextAuthCfg)

	let user: any = {}

	if (session) {
		user = await prisma.user.findUnique({
			where: {
				email: session?.user.email!,
			},
			select: {
				id: true,
				name: true,
				role: true,
				kit: true,
				steamId: true,
				competitive: true,
			},
		})
	}

	return {
		...(user as IUserDataWithStatus),
		unauthorized: !session ? true : false,
	}
}
