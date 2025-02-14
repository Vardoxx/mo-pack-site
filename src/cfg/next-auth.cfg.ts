import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import prisma from '../../prisma/prisma-client'

export const nextAuthCfg: AuthOptions = {
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
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email
			}
			return token
		},
	},
}
