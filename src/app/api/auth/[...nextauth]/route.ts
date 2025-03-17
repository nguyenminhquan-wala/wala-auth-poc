import { createClient } from '@supabase/supabase-js'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { Database } from '@/types/supabase'
import { JWT } from 'next-auth/jwt'
import { Account, Profile, User } from 'next-auth'
import { AdapterUser } from '@auth/core/adapters'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ 
      user,
      account,
    }: {
      user: User | AdapterUser
      account: Account | null
    }) {
      if (account?.provider === 'google') {
        // Check if user exists
        const { data: existingUser, error: queryError } = await supabase
          .from('users')
          .select('*, roles(name, permissions(name))')
          .eq('email', user.email)
          .single()

        if (queryError && !existingUser) {
          // Get default user role
          const { data: defaultRole } = await supabase
            .from('roles')
            .select('id')
            .eq('name', 'user')
            .single()

          if (!defaultRole) {
            console.error('Default role not found')
            return false
          }

          // Create new user with default role
          const { error: insertError } = await supabase
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
    },
    async jwt({ 
      token,
      user,
      account,
    }: {
      token: JWT
      user: User | AdapterUser | undefined
      account: Account | null
    }) {
      if (user && account?.provider === 'google') {
        // Fetch user data with role and permissions
        const { data: userData } = await supabase
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
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (session?.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        session.user.permissions = token.permissions as string[]
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt' as const,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 