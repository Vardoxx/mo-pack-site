'use client'

import Toaster from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import 'nprogress/nprogress.css' // Import NProgress styles
import { PropsWithChildren } from 'react'

export default function Provider({ children }: PropsWithChildren) {
	const queryClient = new QueryClient()

	return (
		<SessionProvider>
			<NextTopLoader color='orange' zIndex={10000} />
			<Toaster />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	)
}
