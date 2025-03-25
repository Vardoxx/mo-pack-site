import { axiosClassic } from '@/api/interceptors'
import { UserTest } from '@/types/test.types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useGetUserTests() {
	const { data, isLoading, refetch, isPending } = useQuery({
		queryKey: ['getUserTests'],
		queryFn: async () =>
			await axiosClassic.get<UserTest[]>('/test/get-user-tests'),
	})

	const [userTests, setUserTests] = useState<UserTest[]>(data?.data!)

	useEffect(() => {
		if (data?.data) {
			setUserTests(data.data)
		}
	}, [data])

	return {
		userTests,
		isUserTestsLoading: isLoading,

		isUserTestsPending: isPending,
		refetchUserTests: refetch,
	}
}
