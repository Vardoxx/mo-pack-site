import { URL } from '@/cfg/pages-url.cfg'
import { ReactNode } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GiHumanPyramid } from 'react-icons/gi'
import { ImNewspaper } from 'react-icons/im'

interface INavBarItems {
	title: string
	to: string
	icon: ReactNode
}

export const navBarItems: INavBarItems[] = [
	{
		title: 'Состав',
		to: URL.COMPOSITION,
		icon: <GiHumanPyramid />,
	},
	{
		title: 'Тесы',
		to: URL.TEST,
		icon: <ImNewspaper />,
	},
	{
		title: 'Профиль',
		to: URL.PROFILE,
		icon: <CgProfile />,
	},
]
