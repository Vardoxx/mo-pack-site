import type { Metadata } from 'next'
import Signin from './signin'

export const metadata: Metadata = {
	title: 'Вход',
	description: '',
}

export default function SigninPage() {
	return <Signin />
}
