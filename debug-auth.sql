-- Debug and fix auth step by step

-- 1. Check what exists
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';
SELECT * FROM auth.users LIMIT 1;

-- 2. Check existing triggers
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' AND event_object_table = 'users';

-- 3. Check existing policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 4. Simple profile creation (run if profiles table missing)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  first_name text,
  last_name text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable RLS
alter table public.profiles enable row level security;

-- 6. Simple policies
create policy "Public profiles are viewable by users who created them." on profiles for select using ( auth.uid() = id );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );