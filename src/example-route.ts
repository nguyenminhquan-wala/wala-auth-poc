import NextAuth from 'next-auth'
import { authProvider } from './example-auth'

export const { GET, POST } = NextAuth(authProvider.getNextAuthOptions()) 