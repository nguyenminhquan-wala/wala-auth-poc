import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(function middleware(req) {
    var token = req.nextauth.token;
    var path = req.nextUrl.pathname;
    // Protect admin routes
    if (path.startsWith("/admin") && (token === null || token === void 0 ? void 0 : token.role) !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
}, {
    callbacks: {
        authorized: function (_a) {
            var token = _a.token;
            return !!token;
        }
    },
});
export var config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
        "/api/protected/:path*",
    ]
};
