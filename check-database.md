# 🔍 Database Update Required

## Issue
The tournament progress shows "Challenge - Drink" placeholders because your Supabase database still has old/empty pub data.

## ✅ Solution: Update Your Database

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Update Script
1. Copy the entire contents of `UPDATE_TOURNAMENT.sql` from this project
2. Paste it into the SQL Editor
3. Click **Run** (or press Cmd/Ctrl + Enter)

### What This Does:
- Deletes old pubs data
- Inserts the 7 new pubs for Christmas tournament:
  1. Lamb & Flag - Secret Santa
  2. Kings Arms - Split the G
  3. Wig & Pen - Spotify Wrapped
  4. The Crown - Is it Safe With Alcohol?
  5. The Chequers - Xmas Tradition Quiz
  6. Wheatsheaf Yard - 12 Shots of Xmas
  7. St Aldates Tavern - Boxing Day

### Step 3: Verify
After running the script, refresh your leaderboard page at http://localhost:4322/

You should now see:
- ✅ All 7 pub names in the progress section
- ✅ Correct challenges and drinks
- ✅ Proper par values

---

## Alternative: Check Current Data

Run this query in SQL Editor to see what's currently in your database:

```sql
SELECT * FROM pubs ORDER BY order_index;
```

If it returns 0 rows or old data, you definitely need to run the UPDATE_TOURNAMENT.sql script!

---

## Need Help?

If you're still seeing issues after running the script:
1. Check browser console for errors (F12)
2. Verify your `.env` file has correct Supabase credentials
3. Ensure realtime is enabled on the `pubs` table
