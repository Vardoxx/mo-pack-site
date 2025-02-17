import { axiosClassic } from '@/api/interceptors'
import { UserEnum } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useGetUserRole() {
	const { data, isLoading } = useQuery({
		queryKey: ['getUserRole'],
		queryFn: async () =>
			await axiosClassic.get<{ role: UserEnum }>('/user/get-role'),
		refetchInterval: 600000,
		refetchIntervalInBackground: true,
	})

	const [role, setRole] = useState<UserEnum>('guest')

	useEffect(() => {
		if (data?.data.role) {
			setRole(data.data.role)
		}
	}, [data])

	return { role, isUserLoading: isLoading }
}
