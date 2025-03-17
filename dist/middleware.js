"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var middleware_1 = require("next-auth/middleware");
var server_1 = require("next/server");
exports.default = (0, middleware_1.withAuth)(function middleware(req) {
    var token = req.nextauth.token;
    var path = req.nextUrl.pathname;
    // Protect admin routes
    if (path.startsWith("/admin") && (token === null || token === void 0 ? void 0 : token.role) !== "admin") {
        return server_1.NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return server_1.NextResponse.next();
}, {
    callbacks: {
        authorized: function (_a) {
            var token = _a.token;
            return !!token;
        }
    },
});
exports.config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
        "/api/protected/:path*",
    ]
};
