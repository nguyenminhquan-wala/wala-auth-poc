'use client'

import { useEffect } from 'react'
import { NextAuthProvider } from '../providers/NextAuthProvider'

interface ClientBodyProps {
  children: React.ReactNode
  className?: string
}

export function ClientBody({ children, className }: ClientBodyProps) {
  useEffect(() => {
    // Remove VS Code specific classes that might cause hydration issues
    document.body.classList.remove('vsc-initialized')
  }, [])

  return (
    <body className={className}>
      <NextAuthProvider>{children}</NextAuthProvider>
    </body>
  )
} 