"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBody = ClientBody;
var react_1 = require("react");
var NextAuthProvider_1 = require("../providers/NextAuthProvider");
function ClientBody(_a) {
    var children = _a.children, className = _a.className;
    (0, react_1.useEffect)(function () {
        // Remove VS Code specific classes that might cause hydration issues
        document.body.classList.remove('vsc-initialized');
    }, []);
    return (<body className={className}>
      <NextAuthProvider_1.NextAuthProvider>{children}</NextAuthProvider_1.NextAuthProvider>
    </body>);
}
