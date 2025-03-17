"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.NextAuthProvider = exports.ClientBody = exports.AuthProvider = void 0;
var AuthProvider_1 = require("./lib/AuthProvider");
Object.defineProperty(exports, "AuthProvider", { enumerable: true, get: function () { return AuthProvider_1.AuthProvider; } });
__exportStar(require("./types/config"), exports);
var ClientBody_1 = require("./components/ClientBody");
Object.defineProperty(exports, "ClientBody", { enumerable: true, get: function () { return ClientBody_1.ClientBody; } });
var NextAuthProvider_1 = require("./providers/NextAuthProvider");
Object.defineProperty(exports, "NextAuthProvider", { enumerable: true, get: function () { return NextAuthProvider_1.NextAuthProvider; } });
__exportStar(require("./hooks/usePermissions"), exports);
__exportStar(require("./types/next-auth"), exports);
var schema_1 = require("./schema");
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return schema_1.schema; } });
