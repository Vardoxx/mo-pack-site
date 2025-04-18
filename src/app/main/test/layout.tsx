import { SITE_NAME } from '@/cfg/seo.cfg'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
}

export default function TestLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
