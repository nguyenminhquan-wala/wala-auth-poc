'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePermissions } from './hooks/usePermissions';
export default function Example() {
    var session = useSession().data;
    var _a = usePermissions(), hasPermission = _a.hasPermission, role = _a.role, permissions = _a.permissions;
    if (!session) {
        return <button onClick={function () { return signIn('google'); }}>Sign in</button>;
    }
    return (<div>
      <h1>Welcome {session.user.name}</h1>
      <p>Role: {role}</p>
      <p>Permissions: {permissions.join(', ')}</p>
      {hasPermission('create:posts') && (<button>Create Post</button>)}
      <button onClick={function () { return signOut(); }}>Sign out</button>
    </div>);
}
