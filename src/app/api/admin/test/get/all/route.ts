import { NextResponse } from 'next/server'
import prisma from '../../../../../../../prisma/prisma-client'

export async function GET() {
	const allTests = await prisma.test.findMany()

	return NextResponse.json(allTests, {
		status: 200,
	})
}
