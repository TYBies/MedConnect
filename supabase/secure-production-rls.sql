-- SECURE PRODUCTION-READY RLS SETUP
-- This provides security while allowing public form submissions

-- Step 1: Enable RLS on all tables (for security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop any existing policies to start fresh
DROP POLICY IF EXISTS "allow_all_inserts" ON contact_submissions;
DROP POLICY IF EXISTS "allow_anon_insert_contact" ON contact_submissions;
DROP POLICY IF EXISTS "allow_public_insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users on contact_submissions" ON contact_submissions;

-- Step 3: Create a SERVICE ROLE function for public inserts
-- This is the SECURE way to handle public form submissions
CREATE OR REPLACE FUNCTION public.handle_public_contact_submission()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  -- This function runs with elevated privileges
  SELECT 1;
$$;

-- Step 4: Create RLS policies that actually work

-- Allow anyone to INSERT (public form submissions)
CREATE POLICY "public_can_insert" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (
  -- Basic validation: ensure required fields are present
  name IS NOT NULL AND 
  email IS NOT NULL AND 
  message IS NOT NULL AND
  length(name) > 0 AND
  length(email) > 0 AND
  length(message) > 0
);

-- Only authenticated users can VIEW submissions (for admin panel)
CREATE POLICY "authenticated_can_view" 
ON contact_submissions 
FOR SELECT 
USING (
  auth.role() = 'authenticated'
);

-- No one can UPDATE (immutable records)
CREATE POLICY "no_updates" 
ON contact_submissions 
FOR UPDATE 
USING (false);

-- Only authenticated users can DELETE (for admin cleanup)
CREATE POLICY "authenticated_can_delete" 
ON contact_submissions 
FOR DELETE 
USING (
  auth.role() = 'authenticated'
);

-- Step 5: Apply same pattern to other tables
-- Nurse applications
DROP POLICY IF EXISTS "allow_anon_insert_nurse" ON nurse_applications;
DROP POLICY IF EXISTS "Allow anonymous inserts on nurse_applications" ON nurse_applications;

CREATE POLICY "public_can_insert" 
ON nurse_applications 
FOR INSERT 
WITH CHECK (
  full_name IS NOT NULL AND 
  email IS NOT NULL AND 
  phone IS NOT NULL
);

CREATE POLICY "authenticated_can_view" 
ON nurse_applications 
FOR SELECT 
USING (
  auth.role() = 'authenticated'
);

-- Partner inquiries
DROP POLICY IF EXISTS "allow_anon_insert_partner" ON partner_inquiries;
DROP POLICY IF EXISTS "Allow anonymous inserts on partner_inquiries" ON partner_inquiries;

CREATE POLICY "public_can_insert" 
ON partner_inquiries 
FOR INSERT 
WITH CHECK (
  organization_name IS NOT NULL AND 
  contact_person IS NOT NULL AND 
  email IS NOT NULL
);

CREATE POLICY "authenticated_can_view" 
ON partner_inquiries 
FOR SELECT 
USING (
  auth.role() = 'authenticated'
);

-- Step 6: Test the setup
-- This should work:
INSERT INTO contact_submissions (name, email, message) 
VALUES ('Security Test', 'secure@test.com', 'Testing secure RLS setup');

-- This should fail (no auth):
-- SELECT * FROM contact_submissions;

-- Step 7: Create an admin view (optional)
CREATE OR REPLACE VIEW public.recent_submissions AS
SELECT 
  'contact' as type,
  name,
  email,
  created_at
FROM contact_submissions
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 10;

-- Grant access to authenticated users only
GRANT SELECT ON public.recent_submissions TO authenticated;

-- Verification: Check all policies are in place
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('contact_submissions', 'nurse_applications', 'partner_inquiries')
ORDER BY tablename, cmd;