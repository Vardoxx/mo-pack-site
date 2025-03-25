import { axiosClassic } from '@/api/interceptors'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface ITime {
	days: number
	hours: number
	minutes: number
	seconds: number
}

interface IRemainingTimeResponse {
	block: boolean
	remainingTime: ITime
}

export function useCountdown() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['countdown'],
		queryFn: () =>
			axiosClassic.get<IRemainingTimeResponse>('/test/remaining-status'),
	})

	const [remainingTime, setRemainingTime] = useState<string>('00:00:00:00')
	const [isBlock, setIsBlock] = useState<boolean>(false)

	useEffect(() => {
		if (isLoading || !data?.data?.remainingTime) return

		const { remainingTime: time, block } = data.data
		setIsBlock(block)

		let totalSeconds =
			time.days * 24 * 60 * 60 +
			time.hours * 60 * 60 +
			time.minutes * 60 +
			time.seconds

		const interval = setInterval(() => {
			if (totalSeconds <= 0) {
				clearInterval(interval)
				setRemainingTime('00:00:00:00')
				setIsBlock(false)
				return
			}

			totalSeconds -= 1
			const days = Math.floor(totalSeconds / (24 * 60 * 60))
			const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
			const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
			const seconds = totalSeconds % 60

			setRemainingTime(
				`${String(days).padStart(2, '0')}:${String(hours).padStart(
					2,
					'0'
				)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
					2,
					'0'
				)}`
			)
		}, 1000)

		return () => clearInterval(interval)
	}, [data, isLoading])

	return { remainingTime, isBlock, isLoading, refetch }
}
