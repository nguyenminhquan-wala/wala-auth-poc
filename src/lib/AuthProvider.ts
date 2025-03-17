import { createClient } from '@supabase/supabase-js'
import { AuthConfig, Database } from '../types/config'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export class AuthProvider {
  private config: AuthConfig
  private supabase: ReturnType<typeof createClient<Database>>

  constructor(config: AuthConfig) {
    this.config = config
    this.supabase = createClient<Database>(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    )
  }

  getNextAuthOptions(): NextAuthOptions {
    return {
      providers: [
        GoogleProvider({
          clientId: this.config.googleClientId,
          clientSecret: this.config.googleClientSecret,
        }),
      ],
      callbacks: {
        signIn: this.handleSignIn.bind(this),
        jwt: this.handleJWT.bind(this),
        session: this.handleSession.bind(this),
      },
      pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
      },
      session: {
        strategy: 'jwt' as const,
      },
    }
  }

  private async handleSignIn({ user, account }: any) {
    if (account?.provider === 'google') {
      const { data: existingUser, error: queryError } = await this.supabase
        .from('users')
        .select('*, roles(name, permissions(name))')
        .eq('email', user.email)
        .single()

      if (queryError && !existingUser) {
        const { data: defaultRole } = await this.supabase
          .from('roles')
          .select('id')
          .eq('name', 'user')
          .single()

        if (!defaultRole) {
          console.error('Default role not found')
          return false
        }

        const { error: insertError } = await this.supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email!,
            role_id: defaultRole.id,
          })

        if (insertError) {
          console.error('Error creating user:', insertError)
          return false
        }
      }
    }
    return true
  }

  private async handleJWT({ token, user, account }: any) {
    if (user && account?.provider === 'google') {
      const { data: userData } = await this.supabase
        .from('users')
        .select(`
          *,
          roles:role_id (
            name,
            permissions:role_permissions (
              permission:permissions (
                name
              )
            )
          )
        `)
        .eq('email', user.email)
        .single()

      if (userData?.roles) {
        token.role = userData.roles.name
        token.permissions = userData.roles.permissions?.map(
          (p: any) => p.permission.name
        ) || []
        token.id = userData.id
      }
    }
    return token
  }

  private async handleSession({ session, token }: any) {
    if (session?.user) {
      session.user.role = token.role as string
      session.user.id = token.id as string
      session.user.permissions = token.permissions as string[]
    }
    return session
  }

  getSupabaseClient() {
    return this.supabase
  }
} 