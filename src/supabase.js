import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(
    supabaseUrl || 'placeholder_url',
    supabaseAnonKey || 'placeholder_key'
);

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