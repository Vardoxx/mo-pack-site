import { URL } from '@/cfg/pages-url.cfg'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	trailingSlash: false,
	async redirects() {
		return [
			{
				source: URL.root,
				destination: URL.WELCOME,
				permanent: true,
			},
			{
				source: URL.MAIN,
				destination: URL.COMPOSITION,
				permanent: true,
			},
		]
	},
}

export default nextConfig
