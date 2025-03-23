import { getServerSessionUserData } from '@/server-utils/get-server-session-data'
import { NextResponse } from 'next/server'

export async function GET() {
	const user = await getServerSessionUserData()

	if (user.unauthorized)
		return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })

	if (!user)
		return NextResponse.json({ message: 'Не существует' }, { status: 404 })

	return NextResponse.json(user, { status: 200 })
}
