'use client'

import { navBarItems } from '@/constants/side-bar.constants'
import { useCountdown } from '@/hooks/use-countdown'
import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app'
import { useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io'
import { TbMapRoute } from 'react-icons/tb'
import { toast } from 'sonner'

const Sidebar = () => {
	const router = useRouter()
	const pathName = usePathname()

	const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
		{}
	)
	const [isActive, setActive] = useState<boolean>(false)

	function open() {
		!isActive ? setActive(true) : setActive(!isActive)
	}

	function clickElement(to?: string) {
		if (to) {
			router.push(to)
			setActive(!isActive)
		}
	}

	function toggleChildren(id: string) {
		setExpandedItems(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const { isBlock, isLoading, remainingTime } = useCountdown()

	return (
		<div className='relative z-50'>
			{isActive && (
				<div
					onClick={() => setActive(!isActive)}
					className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10 transition-all duration-300'
				/>
			)}

			<div
				onClick={() => open()}
				className='text-3xl p-2 bg-slate-600 cursor-pointer rounded-full text-orange-500 border-2 transition-all border-orange-500 absolute translate-x-8 translate-y-8 hover:scale-105 active:opacity-60 z-20'
			>
				<TbMapRoute />
			</div>

			<div
				className={`${
					isActive ? 'left-0' : '-left-64'
				} fixed top-0 bottom-0 w-64 bg-slate-600 p-4 transition-all duration-300 z-30`}
			>
				<ul className='space-y-4'>
					{navBarItems.map(({ title, to, icon, children, id }) => (
						<li key={id}>
							<div
								onClick={() => {
									if (children) {
										toggleChildren(id)
									} else {
										clickElement(to)
									}
								}}
								className={`group flex items-center gap-3 p-2 text-white cursor-pointer hover:bg-orange-500 rounded-lg transition-all ${
									pathName === to ? 'bg-orange-500' : ''
								}`}
							>
								<div className='text-2xl relative'>{icon}</div>
								{title}
								{children && (
									<IoMdArrowDropright
										className={`absolute text-2xl right-6 transition-all ${
											expandedItems[id] ? 'rotate-90' : ''
										}`}
									/>
								)}
							</div>

							{children && expandedItems[id] && (
								<ul className='ml-4 space-y-2 mt-2 bg-slate-700 p-2 rounded-md'>
									{children.map(({ icon, title, to, id }) => (
										<li
											key={id}
											onClick={
												title === 'Пройти'
													? isBlock
														? () =>
																toast.error(
																	`Вы не можете пройти тест ещё ${remainingTime}`
																)
														: () => clickElement(to)
													: () => clickElement(to)
											}
											className={`group flex items-center gap-3 p-2 text-white cursor-pointer hover:bg-orange-500 rounded-lg transition-all`}
										>
											<div className='text-2xl'>{icon}</div>
											{title === 'Пройти'
												? isLoading
													? 'Загрузка'
													: isBlock
													? remainingTime
													: title
												: title}
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
