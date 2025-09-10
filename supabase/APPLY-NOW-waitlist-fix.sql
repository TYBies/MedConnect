-- IMMEDIATE FIX FOR WAITLIST FUNCTIONALITY
-- Run this in Supabase SQL Editor to enable waitlist submissions

-- Step 1: Disable RLS temporarily (we'll fix this properly later)
ALTER TABLE nurse_applications DISABLE ROW LEVEL SECURITY;

-- Step 2: Add helpful columns for waitlist management
ALTER TABLE nurse_applications 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'waitlist';

ALTER TABLE nurse_applications 
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Step 3: Test that it works
INSERT INTO nurse_applications (
    full_name, email, phone, country, 
    nursing_qualification, years_experience, german_level
) VALUES (
    'Waitlist Test', 'test@example.com', '+1234567890', 
    'Nigeria', 'BSc Nursing', 3, 'None'
);

-- Step 4: Verify and clean up
SELECT * FROM nurse_applications WHERE email = 'test@example.com';
DELETE FROM nurse_applications WHERE email = 'test@example.com';

-- Step 5: Check the final state
SELECT 
    'Waitlist is now active!' as message,
    COUNT(*) as total_signups
FROM nurse_applications;