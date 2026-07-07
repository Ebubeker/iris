-- Leads table: every contact-form submission is stored here FIRST, before the
-- best-effort email notification. This guarantees no lead is ever lost even if
-- the email provider (Web3Forms) fails, is rate-limited, or gets spam-filtered.
-- Iris reviews leads in the admin panel; visitors can only insert, never read.
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone TEXT CHECK (char_length(phone) <= 40),
  service TEXT CHECK (char_length(service) <= 200),
  message TEXT CHECK (char_length(message) <= 5000),
  -- lifecycle so Iris can track follow-up: new -> contacted -> closed
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  source TEXT DEFAULT 'website-contact-form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Visitors (anon) may submit a lead, but always as 'new' and never read anything back.
CREATE POLICY "Allow public to submit leads" ON leads
  FOR INSERT TO anon WITH CHECK (status = 'new');

-- Only the authenticated admin can read/manage leads (privacy: leads contain PII).
CREATE POLICY "Allow authenticated read access to leads" ON leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to update leads" ON leads
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to delete leads" ON leads
  FOR DELETE TO authenticated USING (true);

-- Reuses update_updated_at_column() created by supabase-schema.sql
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- anon needs INSERT only; SELECT stays restricted to the (authenticated) admin.
GRANT INSERT ON leads TO anon;
GRANT ALL ON leads TO authenticated;
