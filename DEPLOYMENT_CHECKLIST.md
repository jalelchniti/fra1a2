# Quick FTP Deployment Checklist - OVH

**Date:** October 23, 2025
**Build Version:** 3.0 - MyCompanion Feature
**Status:** ✅ Ready for Deployment

---

## Pre-Deployment

- [x] Build completed successfully: `npx vite build` (34.73s)
- [x] All 65 duplicate `.js` files removed
- [x] `.htaccess` created for SPA routing
- [x] All routes tested locally
- [x] Avatar feature tested and centered
- [x] HeyGen script integrated

## FTP Upload Checklist

### 1. Connect to FTP
- [ ] Open FileZilla or preferred FTP client
- [ ] Connect: `ftp://yourdomain.com/slim/`
- [ ] Verify connected successfully

### 2. Backup Old Version
- [ ] Optional: Download old files to local backup folder
- [ ] Note current deployment date for reference

### 3. Upload New Files

**Quick Method:**
- [ ] Delete contents of `/slim/` directory
- [ ] Upload ALL files from `dist/` to `/slim/`
- [ ] Wait for upload to complete

**Careful Method (if other projects in /slim/):**
- [ ] Delete only: all `.js` files in `assets/`
- [ ] Delete only: all `.css` files in `assets/`
- [ ] Delete only: `index.html` and `vite.svg`
- [ ] Upload: `dist/index.html` → `/slim/index.html`
- [ ] Upload: `dist/vite.svg` → `/slim/vite.svg`
- [ ] Upload: `dist/.htaccess` → `/slim/.htaccess`
- [ ] Upload: ALL files from `dist/assets/` → `/slim/assets/`

### 4. Verify Upload
- [ ] Check file count matches (60 files expected)
- [ ] Verify `.htaccess` exists in `/slim/`
- [ ] Check `assets/` folder has 57 files
- [ ] Verify no `.ds_store` or system files uploaded

### 5. Set Permissions (if needed)
- [ ] Files: 644 (rw-r--r--)
- [ ] Directories: 755 (rwxr-xr-x)
- [ ] Most FTP clients do this automatically

## Post-Deployment Testing

### Clear Cache
- [ ] Clear your browser cache (Ctrl+Shift+Delete)
- [ ] Force refresh home page (Ctrl+F5)

### Test Home Page
- [ ] Visit: `http://yourdomain.com/slim/`
- [ ] Page loads without 404 errors
- [ ] Logo and styling visible
- [ ] Navigation links present

### Test Navigation
- [ ] Click "Vocabulary" → `/slim/vocabulary` loads
- [ ] Click "Grammar" → `/slim/grammar` loads
- [ ] Click "Companion" → `/slim/companion` loads ✨
- [ ] Click "Curriculum" → `/slim/curriculum` loads

### Test New Companion Feature
- [ ] Visit `/companion` page
- [ ] See "My English Companion" heading
- [ ] See centered avatar under "Start Your Conversation"
- [ ] Click avatar button
- [ ] Microphone permission prompt appears
- [ ] Avatar expands on mobile (responsive)

### Test Quiz Routes (3 samples)
- [ ] Visit `/quiz/vo_01-01` → Vocabulary quiz loads
- [ ] Visit `/quiz/vo_02-01` → Unit 2 quiz loads
- [ ] Visit `/quiz/gr_02-03` → Unit 2 grammar loads

### Test TTS (Text-to-Speech)
- [ ] Open any vocabulary quiz
- [ ] Click speaker icon
- [ ] Audio plays
- [ ] Works in Chrome/Edge/Firefox

### Check Console (F12)
- [ ] No red error messages
- [ ] Some warnings OK
- [ ] Network tab shows all assets loaded

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| 404 on sub-routes | Check `.htaccess` uploaded to `/slim/` |
| Avatar not visible | Clear cache, check console for errors |
| Styling broken | Verify all CSS files uploaded |
| Slow loading | Check server performance, enable compression |
| Quizzes won't load | Verify all JS chunks uploaded to assets |

## Rollback Plan

If deployment fails:
1. Delete `/slim/` contents
2. Re-upload previous deployment version
3. Verify routes work again
4. Contact support if issues persist

## Important URLs

**Deployed Application:**
```
http://yourdomain.com/slim/
```

**Main Routes:**
```
/slim/                    - Home
/slim/vocabulary          - Vocabulary lessons
/slim/grammar             - Grammar lessons
/slim/reading             - Reading exercises
/slim/speaking            - Speaking practice
/slim/listening           - Listening practice
/slim/companion           - AI Avatar Coach (NEW)
/slim/evaluation          - Assessment
/slim/curriculum          - Full curriculum
/slim/plan                - Business calculator
```

**Sample Quiz Routes:**
```
/slim/quiz/vo_01-01       - Unit 1 Vocabulary
/slim/quiz/vo_02-01       - Unit 2 Vocabulary
/slim/quiz/gr_02-03       - Unit 2 Grammar
/slim/quiz/re_02-02       - Unit 2 Reading
/slim/quiz/sp_02-04       - Unit 2 Speaking
/slim/quiz/li_02-01       - Unit 2 Listening
```

## Files & Sizes Summary

| Item | Count/Size |
|------|-----------|
| Total Files in dist | 60 |
| JS Bundles | 55 |
| CSS Files | 2 |
| HTML Files | 1 |
| Config Files | 1 (.htaccess) |
| **Total Size** | **~2.0 MB** |
| **Gzipped** | **~150 KB** |

## Deployment Notes

- **Build Date:** October 23, 2025, 12:06 PM
- **Build Time:** 34.73 seconds
- **TypeScript Strict Mode:** ✅ Enabled
- **All 65 .js duplicates:** ✅ Removed
- **Avatar Feature:** ✅ Centered and Functional
- **HeyGen Integration:** ✅ Complete
- **Unit 2 Content:** ✅ All 20 quizzes included

---

**Status:** ✅ READY FOR PRODUCTION DEPLOYMENT

Estimated deployment time: **5-10 minutes** (depending on connection speed)

After deployment, inform users about the new "My Companion" feature for AI-powered English conversation practice!
