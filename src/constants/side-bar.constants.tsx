import { URL } from '@/cfg/pages-url.cfg'
import idGenerator from '@/utils/id-generator.utils'
import { ReactNode } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaBook, FaPenAlt } from 'react-icons/fa'
import { GiHumanPyramid } from 'react-icons/gi'
import { ImNewspaper } from 'react-icons/im'

interface INavBarItemsChildren {
	id: string
	title: string
	to: string
	icon: ReactNode
}

interface INavBarItems {
	id: string
	title: string
	to?: string
	icon: ReactNode
	children?: INavBarItemsChildren[]
}

export const navBarItems: INavBarItems[] = [
	{
		title: 'Состав',
		to: URL.COMPOSITION,
		icon: <GiHumanPyramid />,
		id: idGenerator(),
	},
	{
		title: 'Тест',
		icon: <ImNewspaper />,
		id: idGenerator(),

		children: [
			{
				icon: <FaPenAlt />,
				title: 'Пройти',
				to: URL.TEST,
				id: idGenerator(),
			},
			{
				icon: <FaBook />,
				title: 'История',
				to: URL.TEST,
				id: idGenerator(),
			},
		],
	},
	{
		title: 'Профиль',
		to: URL.PROFILE,
		icon: <CgProfile />,
		id: idGenerator(),
	},
]
