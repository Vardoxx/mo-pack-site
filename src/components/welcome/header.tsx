import { GiBull } from 'react-icons/gi'

const Header = () => {
	return (
		<div className='flex flex-col items-center gap-5'>
			<div className='text-8xl'>
				MO<span className='text-yellow-400'>☆</span>PACK
			</div>
			<div>
				<GiBull className='text-9xl' />
			</div>
			<div className='border-b border-white w-full mt-8' />
		</div>
	)
}

export default Header
