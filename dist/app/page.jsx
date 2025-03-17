'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePermissions } from '@/hooks/usePermissions';
export default function Home() {
    var session = useSession().data;
    var _a = usePermissions(), hasPermission = _a.hasPermission, role = _a.role, permissions = _a.permissions;
    if (!session) {
        return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-gray-600">Please sign in to continue</p>
          <button onClick={function () { return signIn('google'); }} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Sign in with Google
          </button>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
            <button onClick={function () { return signOut(); }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              Sign out
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Your Role</h2>
              <p className="text-gray-600">{role}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold">Your Permissions</h2>
              <ul className="list-disc list-inside text-gray-600">
                {permissions.map(function (permission) { return (<li key={permission}>{permission}</li>); })}
              </ul>
            </div>

            {/* Example of permission-based rendering */}
            {hasPermission('create:posts') && (<div className="mt-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Create New Post
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>);
}
