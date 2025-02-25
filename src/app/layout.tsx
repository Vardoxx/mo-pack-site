import { SITE_NAME } from '@/cfg/seo.cfg'
import '@fontsource/jetbrains-mono'
import type { Metadata } from 'next'
import './globals.css'
import Provider from './provider'

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
	return (
		<html lang='en'>
			<body className={`antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
