'use client'

import { useGetApplicationStatus } from '@/hooks/use-get-application-status'
import { useGetUserRole } from '@/hooks/use-get-user-role'
import { Button } from '@mui/material'
import { useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { toast } from 'sonner'
import Block from '../ui/block'

const AfterApplication = () => {
	const { refetchApplicationStatus, isStatusLoading } =
		useGetApplicationStatus()

	const { refetchUserRole } = useGetUserRole()

	const [isReload, setIsReload] = useState(false)

	async function tryApplicationStatus() {
		const { data, isSuccess: statusSuccess } = await refetchApplicationStatus()

		if (isStatusLoading) return

		if (statusSuccess && data?.status) {
			if (data.data.status === 'pending') {
				toast.warning('Заявка в обработке')
			}

			if (data.data.status === 'approved') {
				toast.success('Заявка одобрена')
				await refetchUserRole()
			}

			if (data.data.status === 'denied') {
				toast.error('Заявка отклонена')
			}
		}

		setIsReload(true)
		setTimeout(() => {
			setIsReload(false)
		}, 5000)
	}

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='w-2/5'>
				<Block title='Заявка отправлена' fontSize='text-4xl'>
					<div className='flex flex-col items-center gap-4'>
						<FaRegClock className='text-7xl' />
						<p>Ответ поступит вам на почту в скором времени</p>
						<Button
							loading={isStatusLoading}
							variant='contained'
							color='warning'
							onClick={() => tryApplicationStatus()}
							disabled={isReload || isStatusLoading}
						>
							{isReload
								? 'Пожалуйста, подождите...'
								: 'Проверить статус заявки'}
						</Button>
					</div>
				</Block>
			</div>
		</div>
	)
}

export default AfterApplication
