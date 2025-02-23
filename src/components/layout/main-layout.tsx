'use client'

import { useGetApplicationStatus } from '@/hooks/use-get-application-status'
import { useGetUserData } from '@/hooks/use-get-user-data'
import { IUser } from '@/types/user.types'
import { PropsWithChildren, useEffect, useState } from 'react'
import AfterApplication from '../application/after-application'
import Application from '../application/application'
import Download from '../ui/download'
import Sidebar from './side-bar'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { userData, isUserPending, isUserLoading, refetchUserRole } =
		useGetUserData()
	const { status } = useGetApplicationStatus(
		userData?.role !== 'guest' || !userData?.role ? false : true
	)

	const [localUserData, setLocalUserData] = useState<IUser | null>(userData!)

	useEffect(() => {
		if (userData) {
			setLocalUserData(userData)
		}
	}, [userData])

	const handleUserRoleUpdate = async () => {
		await refetchUserRole()
	}

	if (isUserPending || isUserLoading) {
		return <Download />
	} else {
		if (
			localUserData?.role === 'member' ||
			localUserData?.role === 'admin' ||
			localUserData?.role === 'owner'
		) {
			return (
				<>
					<Sidebar />
					<div className='wrapper'>{children}</div>
				</>
			)
		} else {
			if (status === 'none') return <Application />
			if (status === 'pending')
				return <AfterApplication onApprove={handleUserRoleUpdate} />
		}
	}
}

export default MainLayout
