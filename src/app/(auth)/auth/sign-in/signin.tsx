'use client'

import { Button, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'

const Signin = () => {
	const { handleSubmit, control } = useForm<{ email: string }>({
		defaultValues: {
			email: '',
		},
	})

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit(data => signIn('email', data))}
				className='flex flex-col justify-between w-1/3 min-w-80 h-56 bg-slate-800 rounded-2xl p-4  border-2 border-orange-500'
			>
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
					Нажимая 'ВОЙТИ' вы разрешаете обработку ваших персональных данных и
					соглашаетесь с политикой конфиденциальности
				</div>
				<Button type='submit' variant='contained' size='large' color='warning'>
					Войти
				</Button>
			</form>
		</div>
	)
}

export default Signin
