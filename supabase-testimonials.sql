-- Testimonials table: clients submit recommendations from the site,
-- Iris approves them in the admin panel before they appear publicly.
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  role TEXT CHECK (char_length(role) <= 150),
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 10 AND 2000),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Visitors only ever see approved testimonials
CREATE POLICY "Allow public read access to approved testimonials" ON testimonials
  FOR SELECT USING (approved = true);

-- The admin (authenticated) sees everything, including pending submissions
CREATE POLICY "Allow authenticated read access to all testimonials" ON testimonials
  FOR SELECT TO authenticated USING (true);

-- Visitors can submit a testimonial, but never as already-approved
CREATE POLICY "Allow public to submit unapproved testimonials" ON testimonials
  FOR INSERT TO anon WITH CHECK (approved = false);

-- The admin can add testimonials directly (e.g. ones received via WhatsApp)
CREATE POLICY "Allow authenticated to insert testimonials" ON testimonials
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update testimonials" ON testimonials
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to delete testimonials" ON testimonials
  FOR DELETE TO authenticated USING (true);

-- Reuses update_updated_at_column() created by supabase-schema.sql
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

GRANT SELECT, INSERT ON testimonials TO anon;
GRANT ALL ON testimonials TO authenticated;
