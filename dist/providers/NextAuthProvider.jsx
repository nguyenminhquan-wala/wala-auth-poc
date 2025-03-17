"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextAuthProvider = NextAuthProvider;
var react_1 = require("next-auth/react");
function NextAuthProvider(_a) {
    var children = _a.children;
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
}
