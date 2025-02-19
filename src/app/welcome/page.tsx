import { NO_INDEX_PAGE } from '@/cfg/seo.cfg'
import type { Metadata } from 'next'
import Welcome from './welcome'

export const metadata: Metadata = {
	title: `Добро пожаловать`,
	...NO_INDEX_PAGE,
}

export default function WelcomePage() {
	return (
		<div className='wrapper'>
			<Welcome />
		</div>
	)
}
