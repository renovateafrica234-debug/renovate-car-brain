-- ============================================================
-- Renovate-Africa Car Sales AI Brain — Supabase Migrations
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. ABUJA FCT DISTRICTS
CREATE TABLE IF NOT EXISTS abuja_districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  zone TEXT NOT NULL CHECK (zone IN ('Central', 'North', 'South', 'East', 'West')),
  avg_income_level TEXT CHECK (avg_income_level IN ('low', 'medium', 'high', 'luxury')),
  popular_makes TEXT[],
  buyer_density INTEGER DEFAULT 0,
  price_premium DECIMAL(4,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BUYER SEGMENTS
CREATE TABLE IF NOT EXISTS buyer_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_name TEXT NOT NULL UNIQUE,
  description TEXT,
  typical_budget_min INTEGER,
  typical_budget_max INTEGER,
  preferred_vehicle_types TEXT[],
  preferred_makes TEXT[],
  common_objections TEXT[],
  districts TEXT[],
  conversion_rate DECIMAL(4,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LISTINGS
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('jiji', 'cars45', 'autochek', 'manual', 'import')),
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  price INTEGER NOT NULL,
  condition TEXT CHECK (condition IN ('new', 'foreign_used', 'nigerian_used', 'accidented')),
  fuel_type TEXT CHECK (fuel_type IN ('petrol', 'diesel', 'hybrid', 'electric')),
  transmission TEXT CHECK (transmission IN ('automatic', 'manual', 'cvt')),
  mileage INTEGER,
  color TEXT,
  location TEXT,
  district TEXT REFERENCES abuja_districts(name),
  seller_name TEXT,
  seller_phone TEXT,
  seller_type TEXT CHECK (seller_type IN ('dealer', 'private', 'importer')),
  images TEXT[],
  description TEXT,
  listing_url TEXT,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  is_flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  scam_score INTEGER DEFAULT 0 CHECK (scam_score >= 0 AND scam_score <= 100),
  arbitrage_potential DECIMAL(5,2) DEFAULT 0.00,
  embedding VECTOR(1536),
  UNIQUE(external_id, source)
);

CREATE INDEX idx_listings_source ON listings(source);
CREATE INDEX idx_listings_make_model ON listings(make, model);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_scam ON listings(scam_score) WHERE scam_score > 50;
CREATE INDEX idx_listings_embedding ON listings USING ivfflat (embedding vector_cosine_ops);

-- 4. LEADS
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp_id TEXT,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'hot', 'converted', 'lost', 'nurturing')),
  segment TEXT REFERENCES buyer_segments(segment_name),
  district TEXT REFERENCES abuja_districts(name),
  budget_min INTEGER,
  budget_max INTEGER,
  preferred_make TEXT[],
  preferred_model TEXT[],
  preferred_condition TEXT[],
  preferred_fuel TEXT[],
  urgency TEXT CHECK (urgency IN ('immediate', 'this_week', 'this_month', 'just_browsing')),
  source TEXT CHECK (source IN ('twitter', 'jiji', 'whatsapp', 'referral', 'facebook', 'instagram', 'linkedin', 'organic')),
  assigned_to TEXT,
  assigned_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  conversation_count INTEGER DEFAULT 0,
  objection TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_hot ON leads(score, status) WHERE score >= 80 AND status IN ('new', 'contacted', 'qualified');
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_followup ON leads(next_followup_at) WHERE next_followup_at IS NOT NULL;

-- 5. CONVERSATIONS
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('whatsapp', 'twitter', 'instagram', 'facebook', 'email')),
  external_conversation_id TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'audio', 'document', 'template')),
  media_url TEXT,
  agent_name TEXT CHECK (agent_name IN ('scraper', 'social', 'content', 'leads', 'followup', 'whatsapp', 'human')),
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'objection')),
  intent TEXT,
  ai_generated BOOLEAN DEFAULT FALSE,
  human_takeover BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_lead ON conversations(lead_id);
CREATE INDEX idx_conversations_platform ON conversations(platform, external_conversation_id);
CREATE INDEX idx_conversations_created ON conversations(created_at DESC);

-- 6. AGENT JOBS
CREATE TABLE IF NOT EXISTS agent_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL CHECK (agent_name IN ('scraper', 'social', 'content', 'leads', 'followup', 'whatsapp')),
  job_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'retrying')),
  payload JSONB,
  result JSONB,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_jobs_agent ON agent_jobs(agent_name, status);
CREATE INDEX idx_agent_jobs_created ON agent_jobs(created_at DESC);

-- 7. DEALS
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'negotiating' CHECK (status IN ('negotiating', 'deposit_paid', 'financing', 'completed', 'cancelled')),
  agreed_price INTEGER,
  deposit_amount INTEGER,
  payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'paystack', 'installment')),
  paystack_reference TEXT,
  commission_rate DECIMAL(4,2) DEFAULT 5.00,
  commission_earned INTEGER,
  closed_by TEXT,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MARKET PRICES
CREATE TABLE IF NOT EXISTS market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  condition TEXT,
  fuel_type TEXT,
  avg_price INTEGER,
  min_price INTEGER,
  max_price INTEGER,
  sample_size INTEGER DEFAULT 0,
  district TEXT REFERENCES abuja_districts(name),
  price_trend TEXT CHECK (price_trend IN ('rising', 'falling', 'stable')),
  trend_percent DECIMAL(5,2) DEFAULT 0.00,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_market_prices_lookup ON market_prices(make, model, year, condition, district);

-- 9. SCAM LOGS
CREATE TABLE IF NOT EXISTS scam_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  trigger TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. USER ROLES
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sales_manager', 'sales_rep', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- RLS POLICIES
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_access_policy" ON leads
  FOR ALL
  USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
    OR assigned_to = auth.uid()::TEXT
  );

CREATE POLICY "conversations_access_policy" ON conversations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM leads l
      WHERE l.id = conversations.lead_id
      AND (l.assigned_to = auth.uid()::TEXT
           OR auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'))
    )
  );

CREATE POLICY "deals_access_policy" ON deals
  FOR ALL
  USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
    OR closed_by = auth.uid()::TEXT
  );

CREATE POLICY "listings_view_policy" ON listings
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "listings_admin_policy" ON listings
  FOR ALL
  USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin')
  );

-- REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE agent_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE deals;

-- FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION notify_hot_lead()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.score >= 80 AND (OLD.score IS NULL OR OLD.score < 80) THEN
    PERFORM pg_notify('hot_lead', json_build_object(
      'lead_id', NEW.id,
      'name', NEW.name,
      'score', NEW.score,
      'phone', NEW.phone,
      'district', NEW.district
    )::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hot_lead_trigger AFTER UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION notify_hot_lead();

-- SEED: ABUJA DISTRICTS
INSERT INTO abuja_districts (name, zone, avg_income_level, popular_makes, buyer_density, price_premium) VALUES
('Wuse', 'Central', 'high', ARRAY['Toyota', 'Honda', 'Lexus'], 850, 1.15),
('Maitama', 'Central', 'luxury', ARRAY['Mercedes-Benz', 'BMW', 'Lexus', 'Toyota'], 620, 1.35),
('Asokoro', 'Central', 'luxury', ARRAY['Mercedes-Benz', 'Range Rover',
