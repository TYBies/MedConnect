#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
    console.log('🚀 Running waitlist migration...\n');
    
    try {
        // Step 1: Check current state
        console.log('📊 Checking current database state...');
        const { data: beforeData, error: beforeError } = await supabase
            .from('nurse_applications')
            .select('*')
            .limit(1);
        
        if (beforeError) {
            console.log('⚠️  RLS might be blocking queries:', beforeError.message);
        } else {
            console.log('✅ Can query nurse_applications table');
        }
        
        // Step 2: Test insert with current setup
        console.log('\n🧪 Testing waitlist submission...');
        const testData = {
            full_name: 'Migration Test User',
            email: 'migration-test@example.com',
            phone: '+1234567890',
            country: 'Nigeria',
            nursing_qualification: 'BSc Nursing',
            years_experience: 3,
            german_level: 'None'
        };
        
        const { data: insertData, error: insertError } = await supabase
            .from('nurse_applications')
            .insert([testData])
            .select();
        
        if (insertError) {
            console.log('❌ Insert failed:', insertError.message);
            console.log('\n⚠️  RLS is blocking inserts. You need to:');
            console.log('1. Go to Supabase Dashboard > SQL Editor');
            console.log('2. Run this command:');
            console.log('   ALTER TABLE nurse_applications DISABLE ROW LEVEL SECURITY;');
            console.log('3. Or run the APPLY-NOW-waitlist-fix.sql file');
        } else {
            console.log('✅ Insert successful! Waitlist is working.');
            
            // Clean up test data
            const { error: deleteError } = await supabase
                .from('nurse_applications')
                .delete()
                .eq('email', 'migration-test@example.com');
            
            if (!deleteError) {
                console.log('🧹 Test data cleaned up');
            }
        }
        
        // Step 3: Get current count
        const { count, error: countError } = await supabase
            .from('nurse_applications')
            .select('*', { count: 'exact', head: true });
        
        if (!countError) {
            console.log(`\n📈 Current waitlist size: ${count} applications`);
        }
        
        console.log('\n✨ Migration check complete!');
        
        if (insertError) {
            console.log('\n📝 Next steps:');
            console.log('1. Copy the SQL from supabase/APPLY-NOW-waitlist-fix.sql');
            console.log('2. Go to: https://supabase.com/dashboard/project/rnowzeipdcrgwqwaazcp/sql');
            console.log('3. Paste and run the SQL');
            console.log('4. Your waitlist will be ready!');
        }
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();