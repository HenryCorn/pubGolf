# Supabase Database Schema

This document describes the database schema for the Pub Golf application.

## Tables

### `players`

Stores information about tournament players.

```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  avatar TEXT NOT NULL DEFAULT '👤',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Unique constraint on `name`

**RLS Policies:**
- `SELECT` allowed for `anon` role (public read access)
- `INSERT`, `UPDATE`, `DELETE` allowed only for `service_role` (admin operations)

---

### `pubs`

Stores information about the pubs (holes) in the tournament.

```sql
CREATE TABLE pubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  drink TEXT NOT NULL,
  par INTEGER NOT NULL,
  challenge TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Index on `order_index` for sorting

**RLS Policies:**
- `SELECT` allowed for `anon` role (public read access)
- `INSERT`, `UPDATE`, `DELETE` allowed only for `service_role` (admin operations)

---

### `scores`

Stores individual scores for each player at each pub.

```sql
CREATE TABLE scores (
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
```

**Indexes:**
- Primary key on `id`
- Foreign key on `player_id` referencing `players(id)`
- Foreign key on `pub_id` referencing `pubs(id)`
- Unique constraint on `(player_id, pub_id)` - one score per player per pub

**RLS Policies:**
- `SELECT` allowed for `anon` role (public read access)
- `INSERT`, `UPDATE` (UPSERT) allowed only for `service_role` (admin operations)
- `DELETE` allowed only for `service_role` (admin operations)

---

## SQL Setup Script

Run this SQL in your Supabase SQL editor:

```sql
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

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE pubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for players
CREATE POLICY "Players are viewable by everyone"
  ON players FOR SELECT
  USING (true);

CREATE POLICY "Players can only be modified by service role"
  ON players FOR ALL
  USING (auth.role() = 'service_role');

-- RLS Policies for pubs
CREATE POLICY "Pubs are viewable by everyone"
  ON pubs FOR SELECT
  USING (true);

CREATE POLICY "Pubs can only be modified by service role"
  ON pubs FOR ALL
  USING (auth.role() = 'service_role');

-- RLS Policies for scores
CREATE POLICY "Scores are viewable by everyone"
  ON scores FOR SELECT
  USING (true);

CREATE POLICY "Scores can only be modified by service role"
  ON scores FOR ALL
  USING (auth.role() = 'service_role');

-- Enable Realtime for scores table
ALTER PUBLICATION supabase_realtime ADD TABLE scores;

-- Insert pubs data for PUB GOLF VOL.4 - THE XMAS ONE
INSERT INTO pubs (id, name, drink, par, challenge, order_index) VALUES
  ('lamb-flag', 'Lamb & Flag', 'Pint (Cider/Beer)', 4, 'Secret Santa', 1),
  ('kings-arms', 'Kings Arms', 'Guinness', 5, 'Split the G', 2),
  ('wig-pen', 'Wig & Pen', 'Cerveza Victoria', 3, 'Spotify Wrapped', 3),
  ('crown', 'The Crown', 'Mixer', 2, 'Is it Safe With Alcohol?', 4),
  ('chequers', 'The Chequers', 'IPA', 4, 'Is It Actually a Xmas Tradition in Latin America?', 5),
  ('wheatsheaf', 'Wheatsheaf Yard', 'Tequila-based mixer', 1, '12(/4) Shots of Xmas', 6),
  ('st-aldates', 'St Aldates Tavern', 'Fireball Shots', 1, 'Boxing Day (Pub)', 7)
ON CONFLICT (id) DO NOTHING;
```

## Realtime Configuration

To enable realtime updates:

1. Go to your Supabase project dashboard
2. Navigate to Database → Replication
3. Enable replication for the `scores` table
4. Clients can subscribe to changes using the Supabase Realtime API

## Database Views (Optional)

You can create views for common queries:

```sql
-- View for leaderboard with total scores
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  p.id,
  p.name,
  p.avatar,
  COALESCE(SUM(s.sips + s.penalties - s.bonuses), 0) as total_score,
  COUNT(s.id) as holes_played
FROM players p
LEFT JOIN scores s ON p.id = s.player_id
GROUP BY p.id, p.name, p.avatar
ORDER BY total_score ASC, holes_played DESC;
```
