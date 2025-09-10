#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Attempting to disable RLS via API...\n');

// Unfortunately, we can't disable RLS via the client library
// We need to use raw SQL through the Supabase dashboard

console.log('Since RLS changes require admin privileges, here\'s what you need to do:\n');
console.log('OPTION 1 - Quick Fix (Disable RLS):');
console.log('----------------------------------------');
console.log('1. Go to: https://supabase.com/dashboard/project/rnowzeipdcrgwqwaazcp/sql');
console.log('2. Run this SQL:');
console.log('');
console.log('ALTER TABLE nurse_applications DISABLE ROW LEVEL SECURITY;');
console.log('');
console.log('OPTION 2 - Secure Fix (Update RLS Policy):');
console.log('----------------------------------------');
console.log('1. Go to: https://supabase.com/dashboard/project/rnowzeipdcrgwqwaazcp/sql');
console.log('2. Run this SQL:');
console.log('');
console.log(`-- Drop existing policy
DROP POLICY IF EXISTS "Allow anonymous inserts on nurse_applications" ON nurse_applications;

-- Create new policy that actually works
CREATE POLICY "Enable insert for all users" 
ON nurse_applications 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Also allow authenticated users to view
CREATE POLICY "Enable read for authenticated users" 
ON nurse_applications 
FOR SELECT 
TO authenticated
USING (true);`);
console.log('');
console.log('After running either option, your waitlist form will work! 🎉');
console.log('');
console.log('Test it at: http://localhost:3002/');