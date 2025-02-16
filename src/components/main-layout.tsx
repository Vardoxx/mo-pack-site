'use client'

import { useGetApplicationStatus } from '@/hooks/use-get-application-status'
import { clientGuard } from '@/utils/client-guard.utils'
import { PropsWithChildren } from 'react'
import AfterApplication from './ui/after-application'
import Application from './ui/application'
import Download from './ui/download'

const MainLayout = ({ children }: PropsWithChildren) => {
	const { member } = clientGuard()
	const applicationStatus = useGetApplicationStatus()

	if (!applicationStatus) return <Download />

	if (member()) return <div>{children}</div>

	if (applicationStatus === null) return <Application />

	if (applicationStatus === 'pending') return <AfterApplication />
}

export default MainLayout
