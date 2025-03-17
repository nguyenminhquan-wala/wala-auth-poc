import { AuthConfig, Database } from '../types/config';
import { NextAuthOptions } from 'next-auth';
export declare class AuthProvider {
    private config;
    private supabase;
    constructor(config: AuthConfig);
    getNextAuthOptions(): NextAuthOptions;
    private handleSignIn;
    private handleJWT;
    private handleSession;
    getSupabaseClient(): import("@supabase/supabase-js").SupabaseClient<Database, "public", any>;
}
