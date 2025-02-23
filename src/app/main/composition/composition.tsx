'use client'

import { axiosClassic } from '@/api/interceptors'
import { useGetUserData } from '@/hooks/use-get-user-data'
import { IComposition } from '@/types/composition.types'
import { useQuery } from '@tanstack/react-query'

const Composition = () => {
	const { data, isLoading, isPending } = useQuery({
		queryKey: ['getMembers'],
		queryFn: async () => await axiosClassic.get<IComposition[]>('/composition'),
	})

	const { userData } = useGetUserData()

	const userName = userData?.name

	const rows = data?.data || []

	return (
		<div className='w-full p-6'>
			<h1 className='text-3xl font-bold mb-6 flex items-center justify-center text-white'>
				Текущий состав
			</h1>

			{isLoading || isPending ? (
				<p>Загрузка...</p>
			) : (
				<table className='min-w-full table-auto border-collapse'>
					<thead>
						<tr className='bg-orange-500'>
							<th className='px-6 py-3 border-b border-orange-500 text-white'>
								Ник
							</th>
							<th className='px-6 py-3 border-b border-orange-500 text-white'>
								Набор
							</th>
							<th className='px-6 py-3 border-b border-orange-500 text-white'>
								Компет
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							const isUser = row.name === userName

							return (
								<tr key={index} className={`${isUser ? 'bg-slate-600' : ''}`}>
									<td className='px-6 py-4 border-b border-orange-500 text-white'>
										{row.name}
									</td>
									<td className='px-6 py-4 border-b border-orange-500 text-white'>
										{row.kit}
									</td>
									<td className='px-6 py-4 border-b border-orange-500 text-white'>
										{row.competitive}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Composition
