import type { Metadata } from 'next'
import Verify from './verify'

export const metadata: Metadata = {
	title: 'Подтверждение',
	description: '',
}

export default function SigninPage() {
	return <Verify />
}
