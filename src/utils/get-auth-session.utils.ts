import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

export async function getServerAuthSession(req: NextApiRequest): Promise<any> {
	const token = await getToken({ req })

	if (!token) {
		return null
	}

	return {
		user: {
			email: token.email,
			name: token.name,
			image: token.picture,
		},
	}
}
