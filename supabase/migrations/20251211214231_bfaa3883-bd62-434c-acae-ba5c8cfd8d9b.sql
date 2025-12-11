-- Enable RLS to protect data from direct API access
-- Service role used by edge function bypasses RLS
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;