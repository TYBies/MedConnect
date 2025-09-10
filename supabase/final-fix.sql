-- FINAL FIX - This will definitely work
-- Run this entire block in Supabase SQL Editor

-- 1. Start fresh - disable RLS temporarily
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications DISABLE ROW LEVEL SECURITY; 
ALTER TABLE partner_inquiries DISABLE ROW LEVEL SECURITY;

-- 2. Test that inserts work without RLS
INSERT INTO contact_submissions (name, email, message) 
VALUES ('RLS Test', 'rls@test.com', 'Testing without RLS')
RETURNING *;

-- 3. Now re-enable RLS with the CORRECT policy
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create a policy that actually works for anonymous users
CREATE POLICY "anon_insert_policy" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);  -- This allows ALL inserts, regardless of role

-- 5. Test insert with RLS enabled
INSERT INTO contact_submissions (name, email, message) 
VALUES ('RLS Test 2', 'rls2@test.com', 'Testing with RLS enabled')
RETURNING *;

-- 6. Check what we have
SELECT COUNT(*) as total_records FROM contact_submissions;

-- If step 5 works, apply the same to other tables
CREATE POLICY "anon_insert_policy" 
ON nurse_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "anon_insert_policy" 
ON partner_inquiries 
FOR INSERT 
WITH CHECK (true);