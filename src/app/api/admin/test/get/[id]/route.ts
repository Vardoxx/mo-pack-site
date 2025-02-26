import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params

	const test = await prisma.test.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			kit: true,
			questions: {
				orderBy: {
					arrangement: 'asc',
				},
				select: {
					text: true,
					arrangement: true,
					answers: {
						orderBy: {
							arrangement: 'asc',
						},
						select: {
							text: true,
							arrangement: true,
							isCorrect: true,
						},
					},
				},
			},
		},
	})

	if (!test)
		return NextResponse.json({ message: 'Не найдено' }, { status: 404 })

	return NextResponse.json(test, { status: 200 })
}
