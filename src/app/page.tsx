import type { Metadata } from 'next'
import Welcome from './welcome'

export const metadata: Metadata = {
	title: 'Welcome',
	description: '',
}

export default function WelcomePage() {
	return <Welcome />
}
