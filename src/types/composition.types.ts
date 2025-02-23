import { CompetitiveEnum, KitEnum } from '@prisma/client'

export interface IComposition {
	kit: KitEnum | null
	name: string | null
	competitive: CompetitiveEnum | null
}
