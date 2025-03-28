"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
var ClientBody_1 = require("../components/ClientBody");
require("./globals.css");
var inter = (0, google_1.Inter)({ subsets: ["latin"] });
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <ClientBody_1.ClientBody className={inter.className}>{children}</ClientBody_1.ClientBody>
    </html>);
}
