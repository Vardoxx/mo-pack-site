import { axiosClassic } from '@/api/interceptors'
import { IUser } from '@/types/user.types'

export const getUserService = {
	async getData() {
		const response: IUser = await axiosClassic.get('/user')

		return response
	},
}
