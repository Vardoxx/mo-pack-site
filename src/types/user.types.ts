import { KitEnum, UserEnum } from '@prisma/client'

export interface IUser {
	kit: KitEnum
	name: string
	email: string
	role: UserEnum
	steamID: number
}
