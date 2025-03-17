"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var ClientBody_1 = require("./components/ClientBody");
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <ClientBody_1.ClientBody>{children}</ClientBody_1.ClientBody>
    </html>);
}
