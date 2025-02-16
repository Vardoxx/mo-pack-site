import { UserEnum } from '@prisma/client'
import { User as BaseUser } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: User & {
			role: UserEnum
			kit?: KitEnum
			steamId?: number
		}
	}

	interface User extends BaseUser {
		kit?: KitEnum
		role?: UserEnum
		steamId?: number
	}
}
