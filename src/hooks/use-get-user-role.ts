import { axiosClassic } from '@/api/interceptors'
import { UserEnum } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useGetUserRole() {
	const { data, isLoading, refetch, isPending } = useQuery({
		queryKey: ['getUserRole'],
		queryFn: async () =>
			await axiosClassic.get<{ role: UserEnum }>('/user/get-role'),
		refetchInterval: 600000,
		refetchIntervalInBackground: true,
		staleTime: 180000,
	})

	const [role, setRole] = useState<UserEnum>(data?.data.role!)

	useEffect(() => {
		if (data?.data.role) {
			setRole(data.data.role)
		}
	}, [data])

	return {
		role,
		isUserLoading: isLoading,
		refetchUserRole: refetch,
		isUserPending: isPending,
	}
}
