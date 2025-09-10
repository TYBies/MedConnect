-- Secure RLS fix - Keep security enabled but allow anonymous inserts
-- Run this in Supabase SQL Editor

-- Make sure RLS is enabled (for security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts on nurse_applications" ON nurse_applications;
DROP POLICY IF EXISTS "Allow anonymous inserts on partner_inquiries" ON partner_inquiries;

-- Create proper policies that explicitly allow anonymous users to INSERT only
-- Contact submissions - anyone can insert, no one can read without auth
CREATE POLICY "Enable insert for anon users on contact_submissions" 
ON contact_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Nurse applications - anyone can insert, no one can read without auth
CREATE POLICY "Enable insert for anon users on nurse_applications" 
ON nurse_applications 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Partner inquiries - anyone can insert, no one can read without auth
CREATE POLICY "Enable insert for anon users on partner_inquiries" 
ON partner_inquiries 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Optional: Add read policies for authenticated users only (for admin access)
CREATE POLICY "Enable read for authenticated users on contact_submissions" 
ON contact_submissions 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Enable read for authenticated users on nurse_applications" 
ON nurse_applications 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Enable read for authenticated users on partner_inquiries" 
ON partner_inquiries 
FOR SELECT 
TO authenticated
USING (true);

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('contact_submissions', 'nurse_applications', 'partner_inquiries')
ORDER BY tablename, policyname;