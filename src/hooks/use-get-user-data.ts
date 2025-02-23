import { axiosClassic } from '@/api/interceptors'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'

export function useGetUserData() {
	const { data, isLoading, refetch, isPending, error } = useQuery({
		queryKey: ['getUserData'],
		queryFn: async () => await axiosClassic.get<IUser>('/user/get-data'),
		refetchInterval: 600000,
		refetchIntervalInBackground: true,
		staleTime: 180000,
	})

	if (error) {
		console.log('user error')
		signOut()
	}

	return {
		userData: data?.data,
		isUserLoading: isLoading,
		refetchUserRole: refetch,
		isUserPending: isPending,
		isUserError: error,
	}
}
