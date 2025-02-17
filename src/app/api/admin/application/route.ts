import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import { adminGuard } from '@/server-utils/guards/admin.guard'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export async function GET() {
	const guardRes = await adminGuard()

	if (guardRes) return guardRes

	const session = await getServerSession(nextAuthCfg)

	const all = await prisma.user.findMany()

	return NextResponse.json(all)
}
