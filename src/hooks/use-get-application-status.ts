import { axiosClassic } from '@/api/interceptors'
import { ApplicationStatus } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useGetApplicationStatus(): ApplicationStatus | null {
	const { data: session } = useSession()
	const [status, setStatus] = useState<ApplicationStatus | null>(null)

	useEffect(() => {
		const fetchApplicationStatus = async () => {
			if (session?.user?.email) {
				try {
					const response = await axiosClassic.get(
						`/application/get-status/${session.user.email}`
					)
					setStatus(response.data.status || null)
				} catch (error) {
					console.error('Error fetching application status:', error)
					setStatus(null)
				}
			}
		}

		fetchApplicationStatus()
	}, [session?.user?.email])

	return status
}
