import { nextAuthCfg } from '@/cfg/next-auth.cfg'
import NextAuth from 'next-auth'

const authHandler = NextAuth(nextAuthCfg)

export { authHandler as GET, authHandler as POST }
