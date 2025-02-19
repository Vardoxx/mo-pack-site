import { axiosClassic } from '@/api/interceptors'
import { ApplicationStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useGetApplicationStatus(enabled?: boolean) {
	const { data, isLoading, refetch, isPending } = useQuery({
		queryKey: ['getApplicationStatus'],
		queryFn: async () =>
			await axiosClassic.get<{ status: ApplicationStatus }>(
				'/application/get-status'
			),
		enabled,
	})

	const [status, setStatus] = useState<ApplicationStatus>(data?.data.status!)

	useEffect(() => {
		if (data?.data.status) {
			setStatus(data.data.status)
		}
	}, [data])

	return {
		status,
		isStatusLoading: isLoading,

		isStatusPending: isPending,
		refetchApplicationStatus: refetch,
	}
}
