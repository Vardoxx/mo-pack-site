import { KitEnum } from '@prisma/client'

export interface ApplicationRequest {
	name: string

	hours: number

	steamId: number

	kit: KitEnum

	reason: string
}
