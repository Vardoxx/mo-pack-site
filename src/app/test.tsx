'use client'

import { useSignOut } from '@/hooks/use-sign-out'
import { signIn, useSession } from 'next-auth/react'

export default function TestPage() {
	const session = useSession()
	const { signOut, isPending } = useSignOut()

	return (
		<div>
			<button onClick={() => signIn()}>Sign In</button>
			<div></div>
			<button onClick={() => signOut()}>Sign Out</button>
			<div></div>
			<div>{session.data?.user?.email}</div>
			<div></div>
			<div>{session.data?.user?.name}</div>
		</div>
	)
}
