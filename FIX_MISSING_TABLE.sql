-- ==========================================
-- ADD MISSING TOURNAMENT_SETTINGS TABLE
-- Run this in Supabase SQL Editor
-- ==========================================

-- Create tournament settings table
CREATE TABLE IF NOT EXISTS tournament_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_pub_id TEXT REFERENCES pubs(id),
  tournament_started BOOLEAN DEFAULT FALSE,
  tournament_ended BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (id = 1)
);

-- Enable Row Level Security
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON tournament_settings;
CREATE POLICY "Settings are viewable by everyone"
  ON tournament_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Settings can only be modified by service role" ON tournament_settings;
CREATE POLICY "Settings can only be modified by service role"
  ON tournament_settings FOR ALL
  USING (auth.role() = 'service_role');

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_settings;

-- Insert initial settings (start at first pub)
INSERT INTO tournament_settings (id, current_pub_id, tournament_started, tournament_ended)
VALUES (1, 'lamb-flag', false, false)
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT 'Tournament settings created:' as status;
SELECT * FROM tournament_settings;
