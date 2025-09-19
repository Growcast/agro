-- Create contact submissions table from scratch
-- This migration creates the complete table structure

-- Create the contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    tipo_cultivo TEXT,
    tipo_ambiente TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (anonymous users can submit forms)
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to view submissions
CREATE POLICY "Only authenticated users can view submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON public.contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON public.contact_submissions(email);

-- Add helpful comments
COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions from Growcast website';
COMMENT ON COLUMN public.contact_submissions.name IS 'Full name of the contact';
COMMENT ON COLUMN public.contact_submissions.email IS 'Email address of the contact';
COMMENT ON COLUMN public.contact_submissions.tipo_cultivo IS 'Type of crop (frutilla, tomate, etc.)';
COMMENT ON COLUMN public.contact_submissions.tipo_ambiente IS 'Type of environment (invernadero, campo abierto, etc.)';