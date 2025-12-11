-- Create table to store project planner submissions
CREATE TABLE public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  situation TEXT NOT NULL,
  handoff TEXT NOT NULL,
  urgency TEXT NOT NULL,
  budget TEXT,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- No RLS needed - only edge function writes via service role