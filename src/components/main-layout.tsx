'use client'

import { useGetApplicationStatus } from '@/hooks/use-get-application-status'
import { useGetUserRole } from '@/hooks/use-get-user-role'
import { PropsWithChildren } from 'react'
import AfterApplication from './ui/after-application'
import Application from './ui/application'
import Download from './ui/download'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { role, isUserLoading } = useGetUserRole()
	const { status, isStatusLoading } = useGetApplicationStatus(
		role !== 'guest' ? false : true
	)

	if (isUserLoading || isStatusLoading) return <Download />

	if (role === 'member' || role === 'admin' || role === 'owner') {
		return <div>{children}</div>
	} else {
		if (status === null) return <Application />
		if (status === 'pending') return <AfterApplication />
	}
}

export default MainLayout
