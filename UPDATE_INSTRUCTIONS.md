# 🔄 How to Update Tournament Data

## Update Pubs in Supabase

To update your Supabase database with the new tournament information:

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `UPDATE_TOURNAMENT.sql` from this project
4. Copy and paste the SQL into the editor
5. Click **Run** to execute

### Option 2: Using Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db reset  # Resets database with fresh schema
# OR
supabase db push   # Pushes migration files
```

### Option 3: Manual Update via API

You can also update pubs through the admin dashboard API:

1. Login to admin dashboard at `/admin/login`
2. Password: `xmas2024`
3. Use the admin interface to manage players and scores

---

## ✅ What's Been Updated

### Frontend Pages
- ✅ **index.astro** - Updated hero section with tournament date, Christmas emoji, starting location
- ✅ **stats.astro** - Updated title and analytics header
- ✅ **admin/login.astro** - Updated page title
- ✅ **admin/index.astro** - Updated page title

### Database
- ✅ **UPDATE_TOURNAMENT.sql** - SQL script ready to run
- ✅ **DATABASE_SCHEMA.md** - Updated with new pubs data

### Documentation
- ✅ **TOURNAMENT_RULES.md** - Complete rules document with all challenges, penalties, and timeline

---

## 📋 Tournament Details Summary

**Name:** PUB GOLF VOL.4 - THE XMAS ONE  
**Date:** November 14, 2025  
**Start Location:** Bicester Village Train Station  
**First Pub:** Lamb and Flag (19:30)  
**Number of Pubs:** 7  
**Admin Password:** `xmas2024`

---

## 🏃 Next Steps

1. Run the SQL update script in Supabase
2. Verify pubs data is updated correctly
3. Add players through the admin dashboard
4. Start tracking scores in real-time!

---

## 🔐 Important Notes

- The admin password is stored in `.env` file
- For production, consider changing the password
- Real-time updates are enabled on the scores table
- All scores are visible to the public, but only admins can modify them

---

*The tournament is ready to go! Good luck and happy golfing! 🎄⛳*
