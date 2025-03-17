"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermissions = usePermissions;
var react_1 = require("next-auth/react");
function usePermissions() {
    var _a, _b;
    var session = (0, react_1.useSession)().data;
    var hasPermission = function (permission) {
        var _a;
        if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.permissions))
            return false;
        return session.user.permissions.includes(permission);
    };
    var hasRole = function (role) {
        var _a;
        if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role))
            return false;
        return session.user.role === role;
    };
    var hasAnyPermission = function (permissions) {
        return permissions.some(function (permission) { return hasPermission(permission); });
    };
    var hasAllPermissions = function (permissions) {
        return permissions.every(function (permission) { return hasPermission(permission); });
    };
    return {
        hasPermission: hasPermission,
        hasRole: hasRole,
        hasAnyPermission: hasAnyPermission,
        hasAllPermissions: hasAllPermissions,
        isAdmin: hasRole('admin'),
        isAuthenticated: !!session,
        permissions: ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.permissions) || [],
        role: (_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.role,
    };
}
