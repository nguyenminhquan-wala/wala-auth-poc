'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-3xl font-bold text-red-600">Authentication Error</h2>
        <p className="text-gray-600 mt-2">
          {error || 'An error occurred during authentication'}
        </p>
        <div className="mt-4">
          <Link
            href="/auth/signin"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  )
} 