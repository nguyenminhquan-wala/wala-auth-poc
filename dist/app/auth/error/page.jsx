"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthError;
var navigation_1 = require("next/navigation");
var link_1 = __importDefault(require("next/link"));
function AuthError() {
    var searchParams = (0, navigation_1.useSearchParams)();
    var error = searchParams.get('error');
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-3xl font-bold text-red-600">Authentication Error</h2>
        <p className="text-gray-600 mt-2">
          {error || 'An error occurred during authentication'}
        </p>
        <div className="mt-4">
          <link_1.default href="/auth/signin" className="text-indigo-600 hover:text-indigo-500">
            Try again
          </link_1.default>
        </div>
      </div>
    </div>);
}
