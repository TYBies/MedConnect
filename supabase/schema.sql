-- Supabase Database Schema for Healthcare Careers Bridge
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nurse applications table
CREATE TABLE IF NOT EXISTS nurse_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  nursing_qualification TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  german_level TEXT NOT NULL,
  cv_url TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employer/Partner inquiries table
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('employer', 'partner')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts (public can submit forms)
CREATE POLICY "Allow anonymous inserts on contact_submissions" 
  ON contact_submissions
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on nurse_applications" 
  ON nurse_applications
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on partner_inquiries" 
  ON partner_inquiries
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_nurse_applications_email ON nurse_applications(email);
CREATE INDEX IF NOT EXISTS idx_nurse_applications_country ON nurse_applications(country);
CREATE INDEX IF NOT EXISTS idx_nurse_applications_created ON nurse_applications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_partner_inquiries_email ON partner_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_type ON partner_inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_created ON partner_inquiries(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores general contact form submissions from the website';
COMMENT ON TABLE nurse_applications IS 'Stores detailed applications from nurses seeking opportunities in Germany';
COMMENT ON TABLE partner_inquiries IS 'Stores inquiries from healthcare institutions and potential partners';

-- Sample query to view recent submissions (for admin use)
-- SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
-- SELECT * FROM nurse_applications ORDER BY created_at DESC LIMIT 10;
-- SELECT * FROM partner_inquiries WHERE inquiry_type = 'employer' ORDER BY created_at DESC;