'use client'

import { useSession } from 'next-auth/react'

export function usePermissions() {
  const { data: session } = useSession()
  
  const hasPermission = (permission: string): boolean => {
    if (!session?.user?.permissions) return false
    return session.user.permissions.includes(permission)
  }

  const hasRole = (role: string): boolean => {
    if (!session?.user?.role) return false
    return session.user.role === role
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission))
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission))
  }

  return {
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: hasRole('admin'),
    isAuthenticated: !!session,
    permissions: session?.user?.permissions || [],
    role: session?.user?.role,
  }
} 