import { GiBull } from 'react-icons/gi'

const Download = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='animate-bounce flex flex-col items-center justify-center'>
				<p className='animate-ping'>Загрузка</p>
				<GiBull className='text-9xl animate-spin' />
			</div>
		</div>
	)
}

export default Download
