import { NO_INDEX_PAGE } from '@/cfg/seo.cfg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Профиль',
	...NO_INDEX_PAGE,
}

export default function ProfilePage() {
	return <div>ProfilePage</div>
}
