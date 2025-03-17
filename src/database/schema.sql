-- Create roles table
CREATE TABLE public.roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create permissions table
CREATE TABLE public.permissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create role_permissions junction table
CREATE TABLE public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (role_id, permission_id)
);

-- Modify users table to use UUID for role reference
CREATE TABLE public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role_id UUID REFERENCES public.roles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view roles" ON public.roles
    FOR SELECT USING (true);

CREATE POLICY "Users can view permissions" ON public.permissions
    FOR SELECT USING (true);

CREATE POLICY "Users can view role_permissions" ON public.role_permissions
    FOR SELECT USING (true);

CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.uid()::text = id);

-- Insert default roles
INSERT INTO public.roles (name, description) VALUES
    ('admin', 'Administrator with full access'),
    ('user', 'Regular user with basic access'),
    ('manager', 'Manager with elevated access');

-- Insert default permissions
INSERT INTO public.permissions (name, description) VALUES
    ('create:posts', 'Can create posts'),
    ('edit:posts', 'Can edit posts'),
    ('delete:posts', 'Can delete posts'),
    ('view:posts', 'Can view posts'),
    ('manage:users', 'Can manage users'),
    ('manage:roles', 'Can manage roles');

-- Assign permissions to roles
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'admin';

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'user'
AND p.name IN ('view:posts', 'create:posts');

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'manager'
AND p.name IN ('view:posts', 'create:posts', 'edit:posts', 'delete:posts'); 