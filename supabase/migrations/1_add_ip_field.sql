-- Add IP field for rate limiting
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS ip TEXT;

-- Add comment for the new field
COMMENT ON COLUMN public.contact_submissions.ip IS 'IP address for rate limiting';