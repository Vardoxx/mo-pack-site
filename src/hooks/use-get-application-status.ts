import { axiosClassic } from '@/api/interceptors'
import { ApplicationStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useGetApplicationStatus(enabled?: boolean) {
	const { data, isLoading } = useQuery({
		queryKey: ['getApplicationStatus'],
		queryFn: async () =>
			await axiosClassic.get<{ status: ApplicationStatus }>(
				'/application/get-status'
			),
		refetchInterval: 60000,
		enabled,
	})

	const [status, setStatus] = useState<ApplicationStatus>('pending')

	useEffect(() => {
		if (data?.data.status) {
			setStatus(data.data.status)
		}
	}, [data])

	return { status, isStatusLoading: isLoading }
}
