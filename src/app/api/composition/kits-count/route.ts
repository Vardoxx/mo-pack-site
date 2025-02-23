import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const SL = await prisma.user.count({
		where: {
			kit: 'SL',
		},
	})

	const ENG = await prisma.user.count({
		where: {
			kit: 'ENG',
		},
	})

	const LAT = await prisma.user.count({
		where: {
			kit: 'LAT',
		},
	})

	const RFL = await prisma.user.count({
		where: {
			kit: 'RFL',
		},
	})

	const MD = await prisma.user.count({
		where: {
			kit: 'MD',
		},
	})

	return NextResponse.json({
		sl: SL,
		eng: ENG,
		lat: LAT,
		rfl: RFL,
		md: MD,
	})
}
