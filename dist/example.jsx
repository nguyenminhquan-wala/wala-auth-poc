"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Example;
var react_1 = require("next-auth/react");
var usePermissions_1 = require("./hooks/usePermissions");
function Example() {
    var session = (0, react_1.useSession)().data;
    var _a = (0, usePermissions_1.usePermissions)(), hasPermission = _a.hasPermission, role = _a.role, permissions = _a.permissions;
    if (!session) {
        return <button onClick={function () { return (0, react_1.signIn)('google'); }}>Sign in</button>;
    }
    return (<div>
      <h1>Welcome {session.user.name}</h1>
      <p>Role: {role}</p>
      <p>Permissions: {permissions.join(', ')}</p>
      {hasPermission('create:posts') && (<button>Create Post</button>)}
      <button onClick={function () { return (0, react_1.signOut)(); }}>Sign out</button>
    </div>);
}
