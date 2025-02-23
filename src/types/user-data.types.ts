import { CompetitiveEnum, KitEnum, UserEnum } from '@prisma/client'

export interface IUser {
	id: string
	name: string | null
	email: string | null
	emailVerified: Date | null
	role: UserEnum
	kit: KitEnum | null
	steamId: string | null
	competitive: CompetitiveEnum | null
}
