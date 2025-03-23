import { NO_INDEX_PAGE } from '@/cfg/seo.cfg'
import type { Metadata } from 'next'
import Pass from './pass'

export const metadata: Metadata = {
	title: 'Сдать тест',
	...NO_INDEX_PAGE,
}

export default function TestPage() {
	return <Pass />
}
