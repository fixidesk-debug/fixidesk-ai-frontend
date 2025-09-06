-- Drop all existing policies on public.profiles to resolve recursion (42P17)
DO $$
DECLARE r record;
BEGIN
  FOR r IN (
    SELECT polname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles'
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', r.polname);
  END LOOP;
END$$;

-- Recreate safe, non-recursive policies on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Profiles are viewable by owner" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY IF NOT EXISTS "Profiles are updatable by owner" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY IF NOT EXISTS "Profiles insert by self" ON public.profiles
  FOR INSERT WITH CHECK (id = auth.uid());
