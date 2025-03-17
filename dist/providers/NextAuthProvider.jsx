'use client';
import { SessionProvider } from 'next-auth/react';
export function NextAuthProvider(_a) {
    var children = _a.children;
    return <SessionProvider>{children}</SessionProvider>;
}
