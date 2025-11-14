-- Just verify and fix the tournament_settings table
-- Run this to check if everything is working

-- Check if table exists and has data
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM tournament_settings) 
    THEN '✅ Table exists with data'
    ELSE '❌ Table is empty'
  END as status;

-- Show current settings
SELECT * FROM tournament_settings;

-- If the table is empty, insert initial data
INSERT INTO tournament_settings (id, current_pub_id, tournament_started, tournament_ended)
VALUES (1, 'lamb-flag', false, false)
ON CONFLICT (id) DO UPDATE SET
  current_pub_id = COALESCE(tournament_settings.current_pub_id, 'lamb-flag');

-- Verify pubs are loaded
SELECT COUNT(*) as pub_count FROM pubs;
SELECT id, name, order_index FROM pubs ORDER BY order_index;
