import { FC, ReactNode } from 'react'

const Block: FC<{ title: string; children?: ReactNode }> = ({
	title,
	children,
}) => {
	return (
		<div className='flex flex-col items-center gap-5 bg-slate-800 rounded-2xl p-4 border-2 border-orange-500'>
			<div className='text-6xl'>{title}</div>
			<div className='w-full text-center text-orange-300 text-xl '>
				{children}
			</div>
		</div>
	)
}

export default Block
