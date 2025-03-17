'use client';
import { useEffect } from 'react';
import { NextAuthProvider } from '../providers/NextAuthProvider';
export function ClientBody(_a) {
    var children = _a.children, className = _a.className;
    useEffect(function () {
        // Remove VS Code specific classes that might cause hydration issues
        document.body.classList.remove('vsc-initialized');
    }, []);
    return (<body className={className}>
      <NextAuthProvider>{children}</NextAuthProvider>
    </body>);
}
