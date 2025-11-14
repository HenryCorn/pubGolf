-- ==========================================
-- PUB GOLF VOL.4 - THE XMAS ONE
-- Complete Database Setup Script
-- Run this entire file in Supabase SQL Editor
-- ==========================================

-- ==========================================
-- STEP 1: Create Tables and Basic Schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  avatar TEXT NOT NULL DEFAULT '👤',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pubs table
CREATE TABLE IF NOT EXISTS pubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  drink TEXT NOT NULL,
  par INTEGER NOT NULL,
  challenge TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on pubs order
CREATE INDEX IF NOT EXISTS pubs_order_idx ON pubs(order_index);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  pub_id TEXT NOT NULL REFERENCES pubs(id) ON DELETE CASCADE,
  sips INTEGER NOT NULL DEFAULT 0 CHECK (sips >= 0),
  penalties INTEGER NOT NULL DEFAULT 0 CHECK (penalties >= 0),
  bonuses INTEGER NOT NULL DEFAULT 0 CHECK (bonuses >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, pub_id)
);

-- Create indexes on scores
CREATE INDEX IF NOT EXISTS scores_player_idx ON scores(player_id);
CREATE INDEX IF NOT EXISTS scores_pub_idx ON scores(pub_id);

-- Create tournament settings table
CREATE TABLE IF NOT EXISTS tournament_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_pub_id TEXT REFERENCES pubs(id),
  tournament_started BOOLEAN DEFAULT FALSE,
  tournament_ended BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (id = 1)
);

-- ==========================================
-- STEP 2: Enable Row Level Security
-- ==========================================

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE pubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_settings ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- STEP 3: Create RLS Policies
-- ==========================================

-- Players policies
DROP POLICY IF EXISTS "Players are viewable by everyone" ON players;
CREATE POLICY "Players are viewable by everyone"
  ON players FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Players can only be modified by service role" ON players;
CREATE POLICY "Players can only be modified by service role"
  ON players FOR ALL
  USING (auth.role() = 'service_role');

-- Pubs policies
DROP POLICY IF EXISTS "Pubs are viewable by everyone" ON pubs;
CREATE POLICY "Pubs are viewable by everyone"
  ON pubs FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Pubs can only be modified by service role" ON pubs;
CREATE POLICY "Pubs can only be modified by service role"
  ON pubs FOR ALL
  USING (auth.role() = 'service_role');

-- Scores policies
DROP POLICY IF EXISTS "Scores are viewable by everyone" ON scores;
CREATE POLICY "Scores are viewable by everyone"
  ON scores FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Scores can only be modified by service role" ON scores;
CREATE POLICY "Scores can only be modified by service role"
  ON scores FOR ALL
  USING (auth.role() = 'service_role');

-- Tournament settings policies
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON tournament_settings;
CREATE POLICY "Settings are viewable by everyone"
  ON tournament_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Settings can only be modified by service role" ON tournament_settings;
CREATE POLICY "Settings can only be modified by service role"
  ON tournament_settings FOR ALL
  USING (auth.role() = 'service_role');

-- ==========================================
-- STEP 4: Enable Realtime
-- ==========================================

-- Enable realtime for scores and tournament_settings
ALTER PUBLICATION supabase_realtime ADD TABLE scores;
ALTER PUBLICATION supabase_realtime ADD TABLE tournament_settings;

-- ==========================================
-- STEP 5: Insert Christmas Tournament Data
-- ==========================================

-- Delete existing pubs data (if any)
DELETE FROM pubs;

-- Insert the 7 Christmas pubs
INSERT INTO pubs (id, name, drink, par, challenge, order_index) VALUES
  ('lamb-flag', 'Lamb & Flag', 'Pint (Cider/Beer)', 4, 'Secret Santa', 1),
  ('kings-arms', 'Kings Arms', 'Guinness', 5, 'Split the G', 2),
  ('wig-pen', 'Wig & Pen', 'Cerveza Victoria', 3, 'Spotify Wrapped', 3),
  ('crown', 'The Crown', 'Mixer', 2, 'Is it Safe With Alcohol?', 4),
  ('chequers', 'The Chequers', 'IPA', 4, 'Is It Actually a Xmas Tradition in Latin America?', 5),
  ('wheatsheaf', 'Wheatsheaf Yard', 'Tequila-based mixer', 1, '12(/4) Shots of Xmas', 6),
  ('st-aldates', 'St Aldates Tavern', 'Fireball Shots', 1, 'Boxing Day (Pub)', 7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  drink = EXCLUDED.drink,
  par = EXCLUDED.par,
  challenge = EXCLUDED.challenge,
  order_index = EXCLUDED.order_index;

-- Insert initial tournament settings
INSERT INTO tournament_settings (id, current_pub_id, tournament_started, tournament_ended)
VALUES (1, 'lamb-flag', false, false)
ON CONFLICT (id) DO UPDATE SET
  current_pub_id = COALESCE(tournament_settings.current_pub_id, 'lamb-flag');

-- ==========================================
-- STEP 6: Verify Setup
-- ==========================================

-- Check that everything was created successfully
SELECT 'Tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('players', 'pubs', 'scores', 'tournament_settings');

SELECT 'Pubs loaded:' as status;
SELECT id, name, challenge, order_index FROM pubs ORDER BY order_index;

SELECT 'Tournament settings:' as status;
SELECT * FROM tournament_settings;

-- ==========================================
-- SUCCESS! 🎄
-- Your database is ready for Pub Golf VOL.4
-- ==========================================
