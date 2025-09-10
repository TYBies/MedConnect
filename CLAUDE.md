# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Healthcare Careers Bridge - A web platform connecting African healthcare professionals with career opportunities in Germany. The platform facilitates the entire journey from language training to job placement and relocation.

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (keeping it simple for MVP)
- **Backend**: Supabase (PostgreSQL database + Auth + Realtime)
- **Hosting**: Vercel (static site with serverless functions)
- **Local Dev**: Vite for fast development server

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel
```

## Project Structure

```
MedConnect/
├── public/
│   ├── index.html          # Main application (converted from start_here.html)
│   ├── styles.css          # Extracted CSS styles
│   └── app.js              # Main JavaScript with Supabase integration
├── src/
│   └── supabase.js         # Supabase client initialization
├── .env.local              # Environment variables (never commit)
├── package.json            # Dependencies and scripts
└── vercel.json             # Vercel deployment configuration
```

## Key Features to Implement

1. **Contact Form** (index.html:798-812)
   - Captures: name, email, message
   - Stores in: `contact_submissions` table
   - Add validation and success feedback

2. **Apply Now Button** (index.html:563)
   - Opens modal with application form
   - Captures: personal info, qualifications, experience, German level
   - Stores in: `nurse_applications` table

3. **Partner With Us Button** (index.html:564)
   - Opens modal for healthcare institutions
   - Captures: organization info, needs, contact details
   - Stores in: `partner_inquiries` table

## Supabase Schema

Three main tables:
- `contact_submissions` - General contact form entries
- `nurse_applications` - Detailed nurse applications
- `partner_inquiries` - Healthcare institution inquiries

All tables have RLS enabled with anonymous insert policies.

## Code Architecture Notes

### Current State
- All code is in a single HTML file (start_here.html)
- CSS embedded in `<style>` tags (lines 7-531)
- JavaScript inline (lines 857-905)
- Mobile menu and FAQ accordion already functional

### Migration Strategy
1. Extract CSS to `public/styles.css`
2. Extract and enhance JS to `public/app.js`
3. Add Supabase client in `src/supabase.js`
4. Create modal components for application forms
5. Add form validation and error handling
6. Implement success notifications

## Important Implementation Details

### Forms
- Prevent default form submission
- Validate all fields client-side
- Show loading states during submission
- Display clear success/error messages
- Clear form after successful submission

### Modals
- Create reusable modal component
- Implement for "Apply Now" and "Partner With Us"
- Add close on escape key and outside click
- Ensure accessibility (ARIA attributes, focus management)

### Error Handling
- Graceful fallback if Supabase is unavailable
- User-friendly error messages
- Log errors for debugging (console.error)

### Security
- Use environment variables for Supabase keys
- Never expose service role key (use anon key only)
- Validate and sanitize all inputs
- Use Supabase RLS for data protection

## Testing Checklist

Before deployment, ensure:
- [ ] All forms submit successfully to Supabase
- [ ] Mobile menu works on all screen sizes
- [ ] FAQ accordion functions correctly
- [ ] Modals open/close properly
- [ ] Form validation prevents invalid submissions
- [ ] Success messages display correctly
- [ ] Error handling works for network failures
- [ ] Environment variables are properly configured
- [ ] No console errors in production build

## Deployment Notes

### Vercel Setup
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Use default build settings (Vite will be detected)
4. Enable automatic deployments from main branch

### Environment Variables Required
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Common Tasks

### Adding a new form field
1. Update HTML form structure
2. Add validation in app.js
3. Update Supabase table schema
4. Update insert function to include new field

### Modifying styles
1. Edit `public/styles.css`
2. Keep existing CSS variables for consistency
3. Test responsive design on mobile

### Debugging Supabase issues
1. Check browser console for errors
2. Verify environment variables are loaded
3. Check Supabase dashboard for RLS policies
4. Test queries in Supabase SQL editor