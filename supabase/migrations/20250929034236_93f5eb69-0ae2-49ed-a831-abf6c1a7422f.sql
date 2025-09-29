-- Create consultations table to store client project details
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget TEXT,
  timeline TEXT,
  description TEXT,
  conversation_messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for the contact form)
CREATE POLICY "Anyone can submit consultations" 
ON public.consultations 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing (only authenticated users, for admin access later)
CREATE POLICY "Authenticated users can view consultations" 
ON public.consultations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();