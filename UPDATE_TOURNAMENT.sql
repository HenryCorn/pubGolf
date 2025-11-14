-- PUB GOLF VOL.4 - THE XMAS ONE
-- Tournament Date: November 14, 2025
-- Update pubs data with new challenges and details

-- Delete existing pubs data
DELETE FROM pubs;

-- Insert updated pubs for Christmas tournament
INSERT INTO pubs (id, name, drink, par, challenge, order_index) VALUES
  ('lamb-flag', 'Lamb & Flag', 'Pint (Cider/Beer)', 4, 'Secret Santa', 1),
  ('kings-arms', 'Kings Arms', 'Guinness', 5, 'Split the G', 2),
  ('wig-pen', 'Wig & Pen', 'Cerveza Victoria', 3, 'Spotify Wrapped', 3),
  ('crown', 'The Crown', 'Mixer', 2, 'Is it Safe With Alcohol?', 4),
  ('chequers', 'The Chequers', 'IPA', 4, 'Is It Actually a Xmas Tradition in Latin America?', 5),
  ('wheatsheaf', 'Wheatsheaf Yard', 'Tequila-based mixer', 1, '12(/4) Shots of Xmas', 6),
  ('st-aldates', 'St Aldates Tavern', 'Fireball Shots', 1, 'Boxing Day (Pub)', 7);

-- Verify the update
SELECT * FROM pubs ORDER BY order_index;
