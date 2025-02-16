import { SITE_NAME } from '@/cfg/seo.cfg'
import MainLayout from '@/components/main-layout'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <MainLayout>{children}</MainLayout>
}
