'use client'

import { URL } from '@/cfg/pages-url.cfg'
import { Button, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'

const Signin = () => {
	const { handleSubmit, control } = useForm<{ email: string }>({
		defaultValues: {
			email: '',
		},
	})

	const router = useRouter()

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit(data => signIn('email', data))}
				className='flex flex-col justify-between w-1/3 min-w-80 h-max bg-slate-800 rounded-2xl p-4 pt-1.5 gap-3 border-2 border-orange-500'
			>
				<div className='flex justify-end'>
					<CgClose
						onClick={() => router.push(URL.WELCOME)}
						className='text-2xl cursor-pointer transition-all hover:text-red-600'
					/>
				</div>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<TextField
							color='warning'
							variant='outlined'
							fullWidth
							label='Почта'
							className='text-white'
							size='medium'
							focused
							sx={{
								'& .MuiInputBase-input': {
									color: 'orange',
								},
							}}
							{...field}
						/>
					)}
				/>

				<div className='text-gray-400'>
					Нажимая 'Отправить письмо' вы разрешаете обработку ваших персональных
					данных и соглашаетесь с политикой конфиденциальности
				</div>
				<Button type='submit' variant='contained' size='large' color='warning'>
					Отправить письмо
				</Button>
			</form>
		</div>
	)
}

export default Signin
