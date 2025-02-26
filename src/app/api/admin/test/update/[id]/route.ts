import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'
import { TestRequire } from '../../create/route'

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params

	const existTest = await prisma.test.findUnique({
		where: {
			id,
		},
	})

	if (!existTest)
		return NextResponse.json({ message: 'Не найдено' }, { status: 404 })

	const data: TestRequire = await req.json()

	const updatedTest = await prisma.test.update({
		where: {
			id,
		},
		data: {
			kit: data.kit,
			questions: {
				deleteMany: {},
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

	return NextResponse.json(updatedTest, { status: 200 })
}
