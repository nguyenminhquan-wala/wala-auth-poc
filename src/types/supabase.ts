export type UserRole = 'admin' | 'user'

export type Role = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export type Permission = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export type RolePermission = {
  role_id: string
  permission_id: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: Role
        Insert: Omit<Role, 'id' | 'created_at'>
        Update: Partial<Omit<Role, 'id' | 'created_at'>>
      }
      permissions: {
        Row: Permission
        Insert: Omit<Permission, 'id' | 'created_at'>
        Update: Partial<Omit<Permission, 'id' | 'created_at'>>
      }
      role_permissions: {
        Row: RolePermission
        Insert: Omit<RolePermission, 'created_at'>
        Update: Partial<Omit<RolePermission, 'created_at'>>
      }
      users: {
        Row: {
          id: string
          email: string
          role_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role_id?: string | null
          created_at?: string
        }
      }
    }
  }
} 