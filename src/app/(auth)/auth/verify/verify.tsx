'use client'

import { useForm } from 'react-hook-form'
import { BiMailSend } from 'react-icons/bi'

const Verify = () => {
	const { handleSubmit, control } = useForm<{ email: string }>({
		defaultValues: {
			email: '',
		},
	})

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='flex flex-col justify-around w-1/3 min-w-80 h-56 bg-slate-800 rounded-2xl p-4 border-2 border-orange-500 text-center items-center'>
				<BiMailSend className='text-7xl' />
				<p className='text-3xl'>ПИСЬМО ОТПРАВЛЕНО</p>
			</div>
		</div>
	)
}

export default Verify
