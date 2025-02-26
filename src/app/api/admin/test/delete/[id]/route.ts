import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'

export async function DELETE(
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

	const { kit } = await prisma.test.delete({
		where: {
			id,
		},
		select: {
			kit: true,
		},
	})

	return NextResponse.json(
		{ message: `Тест для ${kit} полностью удалён` },
		{ status: 200 }
	)
}
