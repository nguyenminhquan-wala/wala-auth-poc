'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { usePermissions } from './hooks/usePermissions'

export default function Example() {
  const { data: session } = useSession()
  const { hasPermission, role, permissions } = usePermissions()

  if (!session) {
    return <button onClick={() => signIn('google')}>Sign in</button>
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Role: {role}</p>
      <p>Permissions: {permissions.join(', ')}</p>
      {hasPermission('create:posts') && (
        <button>Create Post</button>
      )}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
} 