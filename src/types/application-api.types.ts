import { KitEnum } from '@prisma/client'

export interface ApplicationRequest {
	name: string

	hours: string

	steamId: string

	kit: KitEnum | string

	reason: string
}
