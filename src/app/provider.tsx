'use client'

import { queryClient } from '@/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function Provider({ children }: PropsWithChildren) {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	)
}
