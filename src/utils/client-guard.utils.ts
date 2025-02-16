import { useSession } from 'next-auth/react'

export function clientGuard() {
	const session = useSession()

	const role = session.data?.user.role

	function member() {
		if (role === 'member' || role === 'admin' || role === 'owner') return true
	}

	function admin() {
		if (role === 'admin' || role === 'owner') return true
	}

	function owner() {
		if (role === 'owner') return true
	}

	return { member, admin, owner }
}
