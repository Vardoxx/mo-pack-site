import { FaRegClock } from 'react-icons/fa'
import Block from '../block'

const AfterApplication = () => {
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='w-2/5'>
				<Block title='Заявка отправлена' fontSize='text-4xl'>
					<div className='flex flex-col items-center gap-4'>
						<FaRegClock className='text-7xl' />
						<p>Ответ поступит вам на почту в скором времени</p>
					</div>
				</Block>
			</div>
		</div>
	)
}

export default AfterApplication
