import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnowzeipdcrgwqwaazcp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3d6ZWlwZGNyZ3dxd2FhemNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTc2ODEsImV4cCI6MjA3MzAzMzY4MX0.fHPGZ0uhHG-nN7DL6V2uVsaOIwTd0P1Pxv2dtIyPfLM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing Supabase connection...\n');
    
    // Test 1: Try to insert
    console.log('Test 1: Attempting to insert data...');
    const { data: insertData, error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
            name: 'CLI Test User',
            email: 'test@cli.com',
            message: 'Testing from Node.js CLI'
        }])
        .select();
    
    if (insertError) {
        console.error('❌ Insert failed:', insertError.message);
        console.error('Error details:', insertError);
    } else {
        console.log('✅ Insert successful!');
        console.log('Inserted data:', insertData);
    }
    
    // Test 2: Check if we can query (should fail for anon)
    console.log('\nTest 2: Attempting to read data...');
    const { data: selectData, error: selectError } = await supabase
        .from('contact_submissions')
        .select('*')
        .limit(1);
    
    if (selectError) {
        console.log('❌ Select failed (this is expected for anonymous users):', selectError.message);
    } else {
        console.log('✅ Select successful (unexpected for anon):', selectData);
    }
    
    // Test 3: Check table existence
    console.log('\nTest 3: Checking if table exists...');
    const { data: tables, error: tableError } = await supabase
        .rpc('get_tables', {}, { get: true })
        .single()
        .catch(() => ({ data: null, error: 'RPC not available' }));
    
    if (tableError) {
        console.log('ℹ️ Cannot check tables via RPC (normal for anon users)');
    } else {
        console.log('Tables:', tables);
    }
}

testConnection().catch(console.error);