import NextAuth from 'next-auth'
import { authProvider } from './example-auth'
import { NextRequest } from 'next/server'

const handler = NextAuth(authProvider.getNextAuthOptions())

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
} 