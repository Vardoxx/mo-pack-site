import { KitEnum } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '../../../../../../prisma/prisma-client'

export interface TestRequire {
	kit: KitEnum
	questions: IQuestion[]
}

export interface IQuestion {
	text: string
	arrangement: number
	answers: IAnswer[]
}

export interface IAnswer {
	arrangement: number
	text: string
	isCorrect: boolean
}

export async function POST(req: Request) {
	const data: TestRequire = await req.json()

	const existTest = await prisma.test.findUnique({
		where: {
			kit: data.kit,
		},
	})

	if (existTest)
		return NextResponse.json(
			{ message: `Тест для ${data.kit} набора уже существует` },
			{ status: 409 }
		)

	const test = await prisma.test.create({
		data: {
			kit: data.kit,
			questions: {
				create: data.questions.map(question => ({
					arrangement: question.arrangement,
					text: question.text,
					answers: {
						create: question.answers.map(answer => ({
							arrangement: answer.arrangement,
							text: answer.text,
							isCorrect: answer.isCorrect,
						})),
					},
				})),
			},
		},
		include: {
			questions: {
				include: {
					answers: true,
				},
			},
		},
	})

	return NextResponse.json(test, { status: 200 })
}

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: {
			testId: string
		}
	}
) {
	const data: TestRequire = await req.json()

	const existTest = await prisma.test.findUnique({
		where: {
			kit: data.kit,
		},
	})

	if (existTest)
		return NextResponse.json(
			{ message: `Тест для ${data.kit} набора уже существует` },
			{ status: 409 }
		)

	const test = await prisma.test.create({
		data: {
			kit: data.kit,
			questions: {
				create: data.questions.map(question => ({
					arrangement: question.arrangement,
					text: question.text,
					answers: {
						create: question.answers.map(answer => ({
							arrangement: answer.arrangement,
							text: answer.text,
							isCorrect: answer.isCorrect,
						})),
					},
				})),
			},
		},
		include: {
			questions: {
				include: {
					answers: true,
				},
			},
		},
	})

	return NextResponse.json(test, { status: 200 })
}
