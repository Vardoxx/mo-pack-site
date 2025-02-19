'use client'

import { useGetApplicationStatus } from '@/hooks/use-get-application-status'
import { useGetUserRole } from '@/hooks/use-get-user-role'
import { PropsWithChildren } from 'react'
import AfterApplication from '../application/after-application'
import Application from '../application/application'
import Download from '../ui/download'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { role, isUserPending } = useGetUserRole()

	const { status, isStatusLoading } = useGetApplicationStatus(
		role !== 'guest' || !role ? false : true
	)

	if (isUserPending || isStatusLoading) return <Download />

	if (role === 'member' || role === 'admin' || role === 'owner') {
		return <div>{children}</div>
	} else {
		if (status === 'none') return <Application />
		if (status === 'pending') return <AfterApplication />
	}
}

export default MainLayout
