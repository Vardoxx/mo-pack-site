import { Toaster as BaseToaster } from 'sonner'

const Toaster = () => {
	const toasterStyle = {
		background: '#1a202c',
		color: '#fff',
		borderRadius: '8px',
		borderColor: 'orange',
	}

	return (
		<BaseToaster
			toastOptions={{
				style: toasterStyle,
			}}
			duration={1000000}
			position='bottom-right'
			theme='dark'
		/>
	)
}

export default Toaster
