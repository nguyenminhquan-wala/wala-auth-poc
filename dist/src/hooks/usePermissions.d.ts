export declare function usePermissions(): {
    hasPermission: (permission: string) => boolean;
    hasRole: (role: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    isAdmin: boolean;
    isAuthenticated: boolean;
    permissions: string[];
    role: string | undefined;
};
