import { axiosClassic } from '@/api/interceptors'
import { ApplicationRequest } from '@/types/application-api.types'

export const applicationService = {
	async create(request: ApplicationRequest): Promise<any> {
		console.log(request)

		const response = await axiosClassic.post<ApplicationRequest>(
			'/application/create',
			request
		)

		return response
	},
}
