var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createClient } from '@supabase/supabase-js';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
var supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
var authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        signIn: function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var _c, existingUser, queryError, defaultRole, insertError;
                var user = _b.user, account = _b.account;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!((account === null || account === void 0 ? void 0 : account.provider) === 'google')) return [3 /*break*/, 4];
                            return [4 /*yield*/, supabase
                                    .from('users')
                                    .select('*, roles(name, permissions(name))')
                                    .eq('email', user.email)
                                    .single()];
                        case 1:
                            _c = _d.sent(), existingUser = _c.data, queryError = _c.error;
                            if (!(queryError && !existingUser)) return [3 /*break*/, 4];
                            return [4 /*yield*/, supabase
                                    .from('roles')
                                    .select('id')
                                    .eq('name', 'user')
                                    .single()];
                        case 2:
                            defaultRole = (_d.sent()).data;
                            if (!defaultRole) {
                                console.error('Default role not found');
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, supabase
                                    .from('users')
                                    .insert({
                                    id: user.id,
                                    email: user.email,
                                    role_id: defaultRole.id,
                                })];
                        case 3:
                            insertError = (_d.sent()).error;
                            if (insertError) {
                                console.error('Error creating user:', insertError);
                                return [2 /*return*/, false];
                            }
                            _d.label = 4;
                        case 4: return [2 /*return*/, true];
                    }
                });
            });
        },
        jwt: function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var userData;
                var _c;
                var token = _b.token, user = _b.user, account = _b.account;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!(user && (account === null || account === void 0 ? void 0 : account.provider) === 'google')) return [3 /*break*/, 2];
                            return [4 /*yield*/, supabase
                                    .from('users')
                                    .select("\n            *,\n            roles:role_id (\n              name,\n              permissions:role_permissions (\n                permission:permissions (\n                  name\n                )\n              )\n            )\n          ")
                                    .eq('email', user.email)
                                    .single()];
                        case 1:
                            userData = (_d.sent()).data;
                            if (userData === null || userData === void 0 ? void 0 : userData.roles) {
                                token.role = userData.roles.name;
                                token.permissions = ((_c = userData.roles.permissions) === null || _c === void 0 ? void 0 : _c.map(function (p) { return p.permission.name; })) || [];
                                token.id = userData.id;
                            }
                            _d.label = 2;
                        case 2: return [2 /*return*/, token];
                    }
                });
            });
        },
        session: function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var session = _b.session, token = _b.token;
                return __generator(this, function (_c) {
                    if (session === null || session === void 0 ? void 0 : session.user) {
                        session.user.role = token.role;
                        session.user.id = token.id;
                        session.user.permissions = token.permissions;
                    }
                    return [2 /*return*/, session];
                });
            });
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
};
var handler = NextAuth(authOptions);
export function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, handler(request)];
        });
    });
}
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, handler(request)];
        });
    });
}
