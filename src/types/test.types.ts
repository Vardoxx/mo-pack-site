import { KitEnum } from '@prisma/client'

export interface PassTestData {
	id: string
	kit: KitEnum
	questions: PassTestQuestion[]
}

export interface PassTestQuestion {
	text: string
	arrangement: number
	answers: PassTestAnswer[]
}

export interface PassTestAnswer {
	text: string
	arrangement: number
}

export interface PassTestRequire {
	questionArrangement: number
	answerArrangement: number
}
