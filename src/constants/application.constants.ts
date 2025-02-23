import { axiosClassic } from '@/api/interceptors'

interface IKitsCount {
	sl: number
	eng: number
	lat: number
	rfl: number
	md: number
}

interface IKit {
	title: string
	value: string
	disabled: boolean
}

const kitsCount: { data: IKitsCount } = await axiosClassic.get(
	'/composition/kits-count'
)

export const kit: IKit[] = [
	{
		title: 'Сквадной',
		value: 'SL',
		disabled: kitsCount.data.sl >= 1 ? true : false,
	},
	{
		title: 'Сапёр',
		value: 'ENG',
		disabled: kitsCount.data.eng >= 2 ? true : false,
	},
	{
		title: 'Труба',
		value: 'LAT',
		disabled: kitsCount.data.lat >= 3 ? true : false,
	},
	{
		title: 'Стрелок',
		value: 'RFL',
		disabled: kitsCount.data.rfl >= 3 ? true : false,
	},
	{
		title: 'Медик',
		value: 'MD',
		disabled: kitsCount.data.md >= 3 ? true : false,
	},
]
