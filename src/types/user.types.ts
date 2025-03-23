import { CompetitiveEnum, KitEnum, UserEnum } from '@prisma/client'

export interface IUser {
	id: string
	name: string
	role: UserEnum
	kit: KitEnum
	steamId: string
	competitive: CompetitiveEnum
}

export interface IUserDataWithStatus extends IUser {
	unauthorized: boolean
}
