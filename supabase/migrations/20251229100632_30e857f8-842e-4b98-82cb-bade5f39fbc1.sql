-- Create contact_submissions table for lead capture
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (service role will insert)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No public policies - only service role can insert