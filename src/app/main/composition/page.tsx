import { NO_INDEX_PAGE } from '@/cfg/seo.cfg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Состав',
	...NO_INDEX_PAGE,
}

export default function CompositionPage() {
	return <div>CompositionPage</div>
}
