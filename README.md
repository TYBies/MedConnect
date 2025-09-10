# MedConnect - Healthcare Careers Bridge

A web platform connecting African healthcare professionals with career opportunities in Germany's healthcare sector.

## Overview

MedConnect (Healthcare Careers Bridge) helps qualified nurses from Africa navigate the complex process of working in Germany by providing:
- Language training guidance
- Credential recognition support
- Job placement services
- Relocation assistance

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Hosting**: Vercel
- **Database**: Supabase PostgreSQL

## Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Vercel account (for deployment)

## Local Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone [your-repo-url]
cd MedConnect

# Install dependencies
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API and copy your:
   - Project URL
   - Anon/Public API key

3. Create the following tables in Supabase SQL Editor:

```sql
-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nurse applications
CREATE TABLE nurse_applications (
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

-- Employer/Partner inquiries
CREATE TABLE partner_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  inquiry_type TEXT NOT NULL, -- 'employer' or 'partner'
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON nurse_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON partner_inquiries
  FOR INSERT WITH CHECK (true);
```

### 3. Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
MedConnect/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Extracted styles
│   └── app.js              # Application logic
├── src/
│   └── supabase.js         # Supabase client configuration
├── .env.local              # Environment variables (not committed)
├── .gitignore
├── package.json
├── vercel.json             # Vercel deployment config
├── README.md               # This file
└── CLAUDE.md               # Development guidelines
```

## Features

- **Landing Page**: Professional design with clear value proposition
- **Contact Form**: Direct inquiries stored in Supabase
- **Application System**: Nurses can apply directly through the platform
- **Partner Portal**: Healthcare institutions can express interest
- **Responsive Design**: Works on all devices
- **FAQ Section**: Interactive accordion for common questions

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## Support

For issues or questions:
- Email: info@healthcarecareersbridge.com
- WhatsApp: +234 XXX XXX XXXX

## License

All rights reserved © 2024 Healthcare Careers Bridge