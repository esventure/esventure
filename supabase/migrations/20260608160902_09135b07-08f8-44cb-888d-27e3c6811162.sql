DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit project inquiry" ON public.project_inquiries;

REVOKE INSERT, SELECT, UPDATE, DELETE ON public.contact_submissions FROM anon, authenticated;
REVOKE INSERT, SELECT, UPDATE, DELETE ON public.project_inquiries FROM anon, authenticated;

GRANT ALL ON public.contact_submissions TO service_role;
GRANT ALL ON public.project_inquiries TO service_role;