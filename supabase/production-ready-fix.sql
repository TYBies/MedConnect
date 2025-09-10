-- Production-ready secure solution
-- Run this entire script in Supabase SQL Editor

-- 1. First, check current RLS status and policies
SELECT 
    schemaname,
    tablename,
    policyname,
    roles,
    cmd,
    permissive
FROM pg_policies
WHERE tablename = 'contact_submissions';

-- 2. Clean up all existing policies
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contact_submissions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON contact_submissions', pol.policyname);
    END LOOP;
END $$;

-- 3. Ensure RLS is enabled (for security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create the correct policy for anonymous inserts
-- This is the KEY: We need to explicitly grant to PUBLIC role
CREATE POLICY "allow_anon_insert_contact" 
ON contact_submissions
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

-- 5. Also create for the other tables
ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on other tables
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename IN ('nurse_applications', 'partner_inquiries')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- Create insert policies for other tables
CREATE POLICY "allow_anon_insert_nurse" 
ON nurse_applications
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "allow_anon_insert_partner" 
ON partner_inquiries
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

-- 6. Add secure read policies - only authenticated users can read
CREATE POLICY "authenticated_read_contact" 
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_read_nurse" 
ON nurse_applications
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_read_partner" 
ON partner_inquiries
FOR SELECT
TO authenticated
USING (true);

-- 7. Verify the setup
SELECT 
    tablename,
    policyname,
    roles,
    cmd
FROM pg_policies
WHERE tablename IN ('contact_submissions', 'nurse_applications', 'partner_inquiries')
ORDER BY tablename, cmd;