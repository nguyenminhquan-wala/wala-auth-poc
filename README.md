# @wala/auth

A Next.js authentication and authorization library with Google OAuth and Supabase integration.

## Installation

```bash
npm install @wala/auth
```

## Setup

1. First, set up your environment variables in your Next.js app:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

2. Initialize the AuthProvider in your app:

```typescript
// src/lib/auth.ts
import { AuthProvider } from '@wala/auth'

export const authProvider = new AuthProvider({
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  nextAuthUrl: process.env.NEXTAUTH_URL!,
  nextAuthSecret: process.env.NEXTAUTH_SECRET!,
})
```

3. Set up NextAuth in your app:

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authProvider } from '@/lib/auth'

export const { GET, POST } = NextAuth(authProvider.getNextAuthOptions())
```

4. Wrap your app with the NextAuthProvider:

```typescript
// src/app/layout.tsx
import { ClientBody } from '@wala/auth'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>
  )
}
```

5. Use the authentication hooks in your components:

```typescript
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePermissions } from '@wala/auth'

export default function MyComponent() {
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
```

## Database Schema

The library expects the following Supabase tables:

```sql
-- Create roles table
CREATE TABLE public.roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create permissions table
CREATE TABLE public.permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create role_permissions junction table
CREATE TABLE public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (role_id, permission_id)
);

-- Create users table
CREATE TABLE public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role_id UUID REFERENCES public.roles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## Example Files

The library includes several example files to help you get started:

1. `example.tsx`: Shows how to use the authentication hooks in a component
2. `example-auth.ts`: Shows how to initialize the AuthProvider
3. `example-route.ts`: Shows how to set up the NextAuth route
4. `example-layout.tsx`: Shows how to set up the root layout with the ClientBody component

You can find these files in the `src` directory of the library.

## License

MIT
