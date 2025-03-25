import { GradeEnum, KitEnum } from '@prisma/client'

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

export interface PassTestResponse {
	grade: GradeEnum
	wrongAnswers: PassTestResponseWrongAnswers[]
}

export interface PassTestResponseWrongAnswers {
	question: string
	questionArrangement: number
	answer: string
	answerArrangement: number
}

export interface UserTest {
	id: string
	createdAt: Date
	grade: GradeEnum
	wrongAnswers: UserTestWrongAnswers[]
}

export interface UserTestWrongAnswers {
	question: string
}
