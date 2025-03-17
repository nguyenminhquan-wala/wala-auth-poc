export interface AuthConfig {
    googleClientId: string;
    googleClientSecret: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    supabaseServiceRoleKey: string;
    nextAuthUrl: string;
    nextAuthSecret: string;
}
export interface Role {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
}
export interface Permission {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
}
export interface User {
    id: string;
    email: string;
    role_id: string | null;
    created_at: string;
}
export interface Database {
    public: {
        Tables: {
            roles: {
                Row: Role;
                Insert: Omit<Role, 'id' | 'created_at'>;
                Update: Partial<Omit<Role, 'id' | 'created_at'>>;
            };
            permissions: {
                Row: Permission;
                Insert: Omit<Permission, 'id' | 'created_at'>;
                Update: Partial<Omit<Permission, 'id' | 'created_at'>>;
            };
            users: {
                Row: User;
                Insert: Omit<User, 'id' | 'created_at'>;
                Update: Partial<Omit<User, 'id' | 'created_at'>>;
            };
        };
    };
}
