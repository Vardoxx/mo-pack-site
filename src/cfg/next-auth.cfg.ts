import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserEnum } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import prisma from '../../prisma/prisma-client'

export const nextAuthCfg: AuthOptions = {
	pages: {
		signIn: '/auth/sign-in',
		verifyRequest: '/auth/verify',
		newUser: process.env.NEXTAUTH_URL,
	},
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	providers: [
		Email({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.email = user.email
				token.role = user.role
				token.kit = user.kit
				token.steamId = user.steamId
			}
			return token
		},

		async session({ session, token }) {
			session.user = {
				...session.user,
				role: token.role as UserEnum,
				kit: token.kit,
				steamId: token.steamId as number,
			}

			return session
		},
	},
}
