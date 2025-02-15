'use client'

import { queryClient } from '@/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { PropsWithChildren } from 'react'

export default function Provider({ children }: PropsWithChildren) {
	return (
		<SessionProvider>
			<NextTopLoader color='orange' zIndex={10000} />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	)
}
