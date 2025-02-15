import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { URL as URL_PAGE } from './cfg/pages-url.cfg'

export async function middleware(request: NextRequest) {
	const { url } = request

	const token = await getToken({ req: request })

	const isAuthPage = url.includes(URL_PAGE.AUTH)
	const isWelcomePage = url.includes(URL_PAGE.WELCOME)

	if (isWelcomePage && token) {
		return NextResponse.redirect(new URL(URL_PAGE.MAIN, request.url))
	}

	if (isAuthPage && token) {
		return NextResponse.redirect(new URL(URL_PAGE.MAIN, request.url))
	}

	if ((isAuthPage || isWelcomePage) && !token) {
		return NextResponse.next()
	}

	if (!token) {
		return NextResponse.redirect(new URL(URL_PAGE.SIGN_IN, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/main/:path*', '/welcome', '/auth/:path*'],
}
