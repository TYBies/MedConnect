import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log what we're getting from environment
console.log('Environment check:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    env: import.meta.env
});

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.');
    console.error('Expected: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    throw new Error('Supabase configuration missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations
export const database = {
    // Submit contact form
    async submitContact(data) {
        try {
            const { data: result, error } = await supabase
                .from('contact_submissions')
                .insert([{
                    name: data.name,
                    email: data.email,
                    message: data.message
                }])
                .select();

            if (error) throw error;
            return { success: true, data: result };
        } catch (error) {
            console.error('Error submitting contact form:', error);
            return { success: false, error: error.message };
        }
    },

    // Submit nurse application
    async submitNurseApplication(data) {
        try {
            // First check if email already exists in waitlist
            const { data: existing, error: checkError } = await supabase
                .from('nurse_applications')
                .select('email, created_at')
                .eq('email', data.email);

            console.log('Checking for existing email:', data.email);
            console.log('Existing records found:', existing);

            // Check if we have any existing records (array will be empty if none)
            if (existing && existing.length > 0) {
                // User already on waitlist
                console.log('Email already registered!');
                return { 
                    success: false, 
                    error: 'already_registered',
                    message: 'This email is already registered on our waitlist. We\'ll be in touch soon!' 
                };
            }

            // If not exists, proceed with insertion
            const { data: result, error } = await supabase
                .from('nurse_applications')
                .insert([{
                    full_name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    nursing_qualification: data.nursingQualification,
                    years_experience: data.yearsExperience,
                    german_level: data.germanLevel,
                    cv_url: data.cvUrl || null,
                    additional_info: data.additionalInfo || null
                }])
                .select();

            if (error) throw error;
            return { success: true, data: result };
        } catch (error) {
            console.error('Error submitting nurse application:', error);
            return { success: false, error: error.message };
        }
    },

    // Submit partner inquiry
    async submitPartnerInquiry(data) {
        try {
            const { data: result, error } = await supabase
                .from('partner_inquiries')
                .insert([{
                    organization_name: data.organizationName,
                    contact_person: data.contactPerson,
                    email: data.email,
                    phone: data.phone,
                    inquiry_type: data.inquiryType,
                    message: data.message
                }])
                .select();

            if (error) throw error;
            return { success: true, data: result };
        } catch (error) {
            console.error('Error submitting partner inquiry:', error);
            return { success: false, error: error.message };
        }
    }
};

// Export for use in other files
export default supabase;