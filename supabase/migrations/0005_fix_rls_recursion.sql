-- Remove RLS policies that reference get_user_role to avoid recursion on profiles
-- Organizations
DROP POLICY IF EXISTS "Admins can manage organizations" ON public.organizations;

-- Replace with org_membership-based policies
CREATE POLICY IF NOT EXISTS "Organizations readable by members or public" ON public.organizations
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Organizations updatable by admins via membership" ON public.organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.organization_members m
      WHERE m.organization_id = organizations.id
        AND m.user_id = auth.uid()
        AND m.role = 'admin'
        AND m.is_active
    )
  );

-- Ticket categories
DROP POLICY IF EXISTS "Admins and agents can manage categories" ON public.ticket_categories;
CREATE POLICY IF NOT EXISTS "Categories readable by all" ON public.ticket_categories
  FOR SELECT USING (true);
-- Allow updates by authenticated users for now (adjust later per-org)
CREATE POLICY IF NOT EXISTS "Categories updatable by authenticated" ON public.ticket_categories
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Tickets
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.tickets;
DROP POLICY IF EXISTS "Agents and admins can update tickets" ON public.tickets;

-- Replace with membership and ownership based policies (no role function)
CREATE POLICY IF NOT EXISTS "Tickets readable by ownership or assignment" ON public.tickets
  FOR SELECT USING (
    customer_id = auth.uid() OR assigned_agent_id = auth.uid() OR (
      organization_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.organization_members m
        WHERE m.organization_id = tickets.organization_id
          AND m.user_id = auth.uid()
          AND m.is_active
      )
    )
  );

CREATE POLICY IF NOT EXISTS "Tickets updatable by owner or assigned or org members" ON public.tickets
  FOR UPDATE USING (
    customer_id = auth.uid() OR assigned_agent_id = auth.uid() OR (
      organization_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.organization_members m
        WHERE m.organization_id = tickets.organization_id
          AND m.user_id = auth.uid()
          AND m.is_active
      )
    )
  );

-- Ticket comments
DROP POLICY IF EXISTS "Users can view comments on accessible tickets" ON public.ticket_comments;
DROP POLICY IF EXISTS "Users can create comments on accessible tickets" ON public.ticket_comments;

CREATE POLICY IF NOT EXISTS "Comments readable by ticket access" ON public.ticket_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_comments.ticket_id AND (
        t.customer_id = auth.uid() OR t.assigned_agent_id = auth.uid() OR (
          t.organization_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.organization_id = t.organization_id AND m.user_id = auth.uid() AND m.is_active
          )
        )
      )
    )
  );

CREATE POLICY IF NOT EXISTS "Comments insert by ticket access" ON public.ticket_comments
  FOR INSERT WITH CHECK (
    author_id = auth.uid() AND EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_comments.ticket_id AND (
        t.customer_id = auth.uid() OR t.assigned_agent_id = auth.uid() OR (
          t.organization_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.organization_members m
            WHERE m.organization_id = t.organization_id AND m.user_id = auth.uid() AND m.is_active
          )
        )
      )
    )
  );

-- Articles
DROP POLICY IF EXISTS "Agents and admins can view all articles" ON public.articles;
DROP POLICY IF EXISTS "Agents and admins can manage articles" ON public.articles;

CREATE POLICY IF NOT EXISTS "Articles view published" ON public.articles
  FOR SELECT USING (published = true);
-- Allow authors to manage their own articles
CREATE POLICY IF NOT EXISTS "Articles authors manage their own" ON public.articles
  FOR ALL USING (author_id = auth.uid());
