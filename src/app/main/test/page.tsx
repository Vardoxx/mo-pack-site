import { NO_INDEX_PAGE } from '@/cfg/seo.cfg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Тесты',
	...NO_INDEX_PAGE,
}

export default function TestPage() {
	return <div>TestPage</div>
}
