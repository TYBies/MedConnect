-- Fix RLS policies for all tables
-- Run this in Supabase SQL Editor

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow anonymous inserts on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts on nurse_applications" ON nurse_applications;
DROP POLICY IF EXISTS "Allow anonymous inserts on partner_inquiries" ON partner_inquiries;

-- Option 1: Disable RLS temporarily (easier for MVP)
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS, use these policies instead:
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Enable insert for all users" ON contact_submissions
--   FOR INSERT TO anon, authenticated
--   WITH CHECK (true);

-- CREATE POLICY "Enable insert for all users" ON nurse_applications
--   FOR INSERT TO anon, authenticated
--   WITH CHECK (true);

-- CREATE POLICY "Enable insert for all users" ON partner_inquiries
--   FOR INSERT TO anon, authenticated
--   WITH CHECK (true);

-- Verify the changes
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('contact_submissions', 'nurse_applications', 'partner_inquiries');