# 🔧 FIX: Can't Update Scores or Change Location

## The Problem
You followed `DATABASE_SCHEMA.md` but it's missing the `tournament_settings` table that the app needs to:
- Track current pub location
- Allow admin to change pubs
- Make the progress bar work correctly

## ✅ The Solution

### Run this SQL in Supabase (copy & paste entire block):

```sql
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

-- Enable realtime (skip if already added)
DO $$ 
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE tournament_settings;
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

-- Insert initial settings
INSERT INTO tournament_settings (id, current_pub_id, tournament_started, tournament_ended)
VALUES (1, 'lamb-flag', false, false)
ON CONFLICT (id) DO UPDATE SET
  current_pub_id = COALESCE(tournament_settings.current_pub_id, 'lamb-flag');

-- Verify it worked
SELECT * FROM tournament_settings;
```

### After running the SQL:

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Go to admin dashboard**: http://localhost:4322/admin/login
   - Password: `xmas2024`

3. **You should now see**:
   - ✅ "Change Current Pub" section with Previous/Next buttons
   - ✅ Dropdown to select any pub
   - ✅ Ability to enter scores for players

---

## Why This Happened

The `DATABASE_SCHEMA.md` file was created before I added the tournament controls feature. The `COMPLETE_SETUP.sql` file has everything including the missing table, but you ran the old schema first.

This one SQL script above will fix everything! 🎄
