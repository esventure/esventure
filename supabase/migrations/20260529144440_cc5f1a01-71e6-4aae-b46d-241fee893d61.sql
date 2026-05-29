-- Allow anonymous inserts only; no SELECT policies = no public reads
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can submit project inquiry"
ON public.project_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);