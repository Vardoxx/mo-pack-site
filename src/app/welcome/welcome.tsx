'use client'

import { URL } from '@/cfg/pages-url.cfg'
import Block from '@/components/block'
import Header from '@/components/welcome/header'
import { application, requirements, what } from '@/constants/welcome.constants'
import idGenerator from '@/utils/id-generator.utils'
import { Button } from '@mui/material'
import { useRouter } from 'nextjs-toploader/app'

const Welcome = () => {
	const router = useRouter()

	return (
		<div className='w-full h-full flex items-center justify-center my-3'>
			<div className='w-3/4 flex flex-col justify-center gap-14 items-center'>
				<Header />

				<Block title='Что это?'>{what}</Block>

				<Block title='Требования'>
					{requirements.map(({ title, description }) => (
						<p key={idGenerator()}>
							<span className='text-yellow-400 font-bold'>{title} </span>
							{description}
						</p>
					))}
				</Block>

				<Block title='Подать заявку'>
					{application}
					<div className='flex w-full justify-around mt-5'>
						<Button
							onClick={() => router.push(URL.SIGN_IN)}
							variant='contained'
							size='large'
							color='warning'
						>
							Войти | Зарегистрироваться
						</Button>
						<Button
							href='https://discord.com/invite/rsgs'
							target='_blank'
							variant='contained'
							size='large'
							color='success'
						>
							Сервер RSGS
						</Button>
					</div>
				</Block>
			</div>
		</div>
	)
}

export default Welcome
{
	/* <div>
					<Image
						src='/pack-logo.png'
						alt='pack-logo'
						width={600}
						height={600}
						className='rounded-3xl border-2 border-orange-500'
					/>
				</div> */
}
