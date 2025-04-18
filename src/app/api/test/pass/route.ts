import { getServerSessionUserData } from '@/server-utils/get-server-session-data'
import { timeBlock } from '@/server-utils/time-block'
import { GradeEnum } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export interface TestPassRequire {
	questionArrangement: number
	answerArrangement: number
}

export async function POST(req: Request) {
	const user = await getServerSessionUserData()

	if (user.unauthorized)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	if (user.role === 'guest')
		return NextResponse.json({ message: 'Доступ ограничен' }, { status: 403 })

	const lastUserTest = await prisma.userTests.findFirst({
		where: {
			userId: user.id,
		},
		select: {
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	if (lastUserTest) {
		const remainingTime = timeBlock(lastUserTest.createdAt, 10000)

		if (remainingTime) {
			return NextResponse.json(
				{
					message: `Вы не можете проходить тест ещё ${remainingTime.days} дней ${remainingTime.hours} часов ${remainingTime.minutes} минут ${remainingTime.seconds} секунд`,
				},
				{ status: 422 }
			)
		}
	}

	const data: TestPassRequire[] = await req.json()

	if (
		data.filter(
			e =>
				e.questionArrangement > 30 ||
				e.questionArrangement <= 0 ||
				e.answerArrangement > 4 ||
				e.answerArrangement <= 0
		).length > 0
	)
		return NextResponse.json(
			{ message: 'Входящие данные некорректны' },
			{ status: 422 }
		)

	const test = await prisma.test.findUnique({
		where: {
			kit: user.kit,
		},
		select: {
			questions: {
				select: {
					arrangement: true,
					answers: {
						select: {
							text: true,
							arrangement: true,
							isCorrect: true,
							question: {
								select: {
									text: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (!test)
		return NextResponse.json({ message: 'Не найдено' }, { status: 404 })

	const incorrectAnswersWithQuestions =
		test?.questions.flatMap(question =>
			question.answers
				.filter(answer => !answer.isCorrect)
				.map(answer => {
					const matchedData = data.find(
						e =>
							e.questionArrangement === question.arrangement &&
							e.answerArrangement === answer.arrangement
					)

					if (matchedData) {
						return {
							question: answer.question?.text || null,
							questionArrangement: question.arrangement,
							answer: answer.text || null,
							answerArrangement: answer.arrangement,
						}
					}
					return null
				})
		) || []

	const filteredIncorrectAnswersWithQuestions =
		incorrectAnswersWithQuestions.filter(e => e !== null)

	const grade = getGrade(filteredIncorrectAnswersWithQuestions?.length)

	if (grade === GradeEnum.S)
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				competitive: 'FRONT',
			},
		})

	const userTest = await prisma.userTests.create({
		data: {
			userId: user.id,
			grade,
			wrongAnswers: {
				create:
					filteredIncorrectAnswersWithQuestions.map(e => ({
						question: e.question,
						questionArrangement: e.questionArrangement,

						answer: e.answer,
						answerArrangement: e.answerArrangement,
					})) || [],
			},
		},
		select: {
			grade: true,
			wrongAnswers: {
				select: {
					question: true,
					questionArrangement: true,

					answer: true,
					answerArrangement: true,
				},
			},
		},
	})

	return NextResponse.json(userTest, { status: 200 })
}

function getGrade(incorrectAnswersQuantity: number) {
	if (incorrectAnswersQuantity >= 24) return GradeEnum.F
	if (incorrectAnswersQuantity >= 20) return GradeEnum.D
	if (incorrectAnswersQuantity >= 10) return GradeEnum.C
	if (incorrectAnswersQuantity >= 6) return GradeEnum.B
	if (incorrectAnswersQuantity >= 1) return GradeEnum.A
	return GradeEnum.S
}
