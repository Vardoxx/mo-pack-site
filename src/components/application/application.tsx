'use client'

import Block from '@/components/ui/block'
import { kit } from '@/constants/application.constants'
import { requireMessage } from '@/constants/other.constants'
import { applicationService } from '@/services/application.service'
import { ApplicationRequest } from '@/types/application-api.types'
import { Button, MenuItem, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

const Application = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ApplicationRequest>({
		defaultValues: {
			hours: '',
			kit: '',
			name: '',
			steamId: '',
			reason: '',
		},
	})

	const onSubmit = (data: ApplicationRequest) => {
		mutate(data)
	}

	const { mutate } = useMutation({
		mutationKey: ['application'],
		mutationFn: (data: ApplicationRequest) => applicationService.create(data),
	})

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='w-2/5'>
				<Block title='Подать заявку' fontSize='text-4xl'>
					<form
						className='flex flex-col gap-7'
						onSubmit={handleSubmit(data => onSubmit(data))}
					>
						<div>
							{errors.name && (
								<p className='text-red-600 text-xl'>{errors.name?.message}</p>
							)}
							<Controller
								name='name'
								control={control}
								rules={{
									required: requireMessage,
									maxLength: {
										value: 30,
										message: 'Максимум 30 символов',
									},
								}}
								render={({ field }) => (
									<TextField
										color='warning'
										variant='outlined'
										fullWidth
										label='Ник'
										className='text-white'
										size='medium'
										helperText='Ваш ник в точности как на сервере RSGS, без [RSGS]'
										focused
										sx={{
											'& .MuiInputBase-input': {
												color: 'orange',
											},
											'& .MuiFormHelperText-root': {
												color: 'orange',
											},
										}}
										{...field}
									/>
								)}
							/>
						</div>
						<div>
							{errors.hours && (
								<p className='text-red-600 text-xl'>{errors.hours?.message}</p>
							)}
							<Controller
								name='hours'
								control={control}
								rules={{
									required: requireMessage,
									maxLength: {
										value: 99999,
										message: 'Максимум 99999 символов',
									},
								}}
								render={({ field }) => (
									<TextField
										color='warning'
										variant='outlined'
										fullWidth
										label='Часы'
										className='text-white'
										size='medium'
										focused
										helperText='Ваше точное кол-во часов в SQUAD на данный момент'
										sx={{
											'& .MuiInputBase-input': {
												color: 'orange',
											},
											'& .MuiFormHelperText-root': {
												color: 'orange',
											},
										}}
										{...field}
									/>
								)}
							/>
						</div>
						<div>
							{errors.kit && (
								<p className='text-red-600 text-xl'>{errors.kit?.message}</p>
							)}
							<Controller
								name='kit'
								control={control}
								rules={{ required: requireMessage }}
								render={({ field }) => (
									<TextField
										color='warning'
										variant='outlined'
										fullWidth
										select
										label='Набор'
										className='text-white'
										size='medium'
										focused
										helperText='Выберите один из доступных наборов'
										sx={{
											'& .MuiInputBase-input': {
												color: 'orange',
											},
											'& .MuiFormHelperText-root': {
												color: 'orange',
											},
										}}
										{...field}
										children={kit.map(({ title, value, disabled }) => (
											<MenuItem disabled={disabled} key={title} value={value}>
												{title}
											</MenuItem>
										))}
									/>
								)}
							/>
						</div>
						<div>
							{errors.steamId && (
								<p className='text-red-600 text-xl'>
									{errors.steamId?.message}
								</p>
							)}
							<Controller
								name='steamId'
								control={control}
								rules={{
									required: requireMessage,
									minLength: {
										value: 17,
										message: 'Только 17 символов',
									},
									maxLength: {
										value: 17,
										message: 'Только 17 символов',
									},
								}}
								render={({ field }) => (
									<TextField
										color='warning'
										variant='outlined'
										fullWidth
										label='SteamId'
										className='text-white'
										size='medium'
										focused
										helperText='Последние 17 цифр в конце ссылки на ваш Steam профиль'
										sx={{
											'& .MuiInputBase-input': {
												color: 'orange',
											},
											'& .MuiFormHelperText-root': {
												color: 'orange',
											},
										}}
										{...field}
									/>
								)}
							/>
						</div>
						<div>
							{errors.reason && (
								<p className='text-red-600 text-xl'>{errors.reason?.message}</p>
							)}
							<Controller
								name='reason'
								control={control}
								rules={{
									required: requireMessage,
									maxLength: {
										value: 200,
										message: 'Максимум 200 символов',
									},
								}}
								render={({ field }) => (
									<TextField
										color='warning'
										variant='outlined'
										fullWidth
										label='Причина'
										className='text-white'
										size='medium'
										focused
										helperText='Почему вы хотите в пак?'
										sx={{
											'& .MuiInputBase-input': {
												color: 'orange',
											},
											'& .MuiFormHelperText-root': {
												color: 'orange',
											},
										}}
										{...field}
									/>
								)}
							/>
						</div>
						<Button type='submit' variant='contained' color='warning'>
							Отправить
						</Button>
					</form>
				</Block>
			</div>
		</div>
	)
}

export default Application
