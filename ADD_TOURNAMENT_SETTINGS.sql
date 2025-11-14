-- Add tournament settings table to track current pub and other settings
CREATE TABLE IF NOT EXISTS tournament_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_pub_id TEXT REFERENCES pubs(id),
  tournament_started BOOLEAN DEFAULT FALSE,
  tournament_ended BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (id = 1) -- Only allow one row
);

-- Enable RLS
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Settings are viewable by everyone"
  ON tournament_settings FOR SELECT
  USING (true);

CREATE POLICY "Settings can only be modified by service role"
  ON tournament_settings FOR ALL
  USING (auth.role() = 'service_role');

-- Insert initial settings (first pub)
INSERT INTO tournament_settings (id, current_pub_id, tournament_started, tournament_ended)
VALUES (1, 'lamb-flag', false, false)
ON CONFLICT (id) DO NOTHING;

-- Enable realtime for tournament settings
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_settings;

-- Verify
SELECT * FROM tournament_settings;
