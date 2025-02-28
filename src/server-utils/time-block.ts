import { day, hour, minute, second } from '@/constants/time.constants'

export function timeBlock(date: Date, timeToBlock: number) {
	const now = new Date()
	const diff = now.getTime() - date.getTime()

	if (diff < timeToBlock) {
		const remainingTime = timeToBlock - diff
		const days = Math.floor(remainingTime / day)
		const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / hour)
		const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / minute)
		const seconds = Math.floor((remainingTime % (1000 * 60)) / second)

		return { days, hours, minutes, seconds }
	}

	return null
}
