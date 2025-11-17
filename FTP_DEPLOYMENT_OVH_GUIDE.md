# FTP Deployment Guide - SmartHub Tunis v3 (OVH)

**Date:** October 23, 2025
**Version:** 3.0
**Project:** SmartHub Tunis - English Learning Platform
**Deployment:** OVH Hosting - `/slim/` subdirectory

---

## 📋 Pre-Deployment Checklist

- [x] Production build completed (`npm run build` / `npx vite build`)
- [x] All TypeScript compiled correctly
- [x] Removed 65 duplicate `.js` files from source
- [x] Avatar component centered and functional
- [x] `.htaccess` file created for SPA routing
- [x] All 34 quizzes (U1 + U2) included and registered
- [x] HeyGen AI avatar script integrated in MyCompanion component
- [x] Build size: ~304 KB main bundle (gzipped: 89 KB)

---

## 📦 Deployment Package Contents

**Build Location:** `C:\Users\asus\en-a1\dist\`

### Files to Upload to OVH `/slim/` directory:

```
dist/
├── index.html              # Main entry point
├── vite.svg               # Favicon
├── .htaccess              # SPA routing rules
└── assets/                # 57 files total
    ├── CSS files (2)
    │   ├── index-*.css (main Tailwind styles)
    │   └── u1-vocabulary-*.css
    ├── JavaScript files (55)
    │   ├── index-*.js (main bundle)
    │   ├── u1-vocabulary-*.js (vocabulary quizzes)
    │   ├── u1-grammar-*.js (grammar quizzes)
    │   ├── u1-reading-*.js (reading quizzes)
    │   ├── u1-speaking-*.js (speaking quiz)
    │   ├── u2-vocabulary-*.js (U2 vocabulary quizzes)
    │   ├── u2-grammar-*.js (U2 grammar quizzes)
    │   ├── u2-reading-*.js (U2 reading quizzes)
    │   ├── u2-speaking-*.js (U2 speaking quizzes)
    │   ├── u2-listening-*.js (U2 listening quizzes)
    │   ├── Individual quiz chunks (vo_01-01-*.js, etc.)
    │   └── Utility chunks
    └── Images/Fonts (as needed)
```

**Total Build Size:** 2.0 MB (uncompressed) | ~150 KB (gzipped)

---

## 🚀 FTP Upload Instructions

### 1. Connect to OVH FTP

- **Host:** `ftp.yourdomain.com` (your OVH FTP host)
- **Username:** Your OVH FTP username
- **Password:** Your OVH FTP password
- **Port:** 21 (standard FTP)

**Recommended FTP Clients:**
- FileZilla (Windows/Mac/Linux) - Free & reliable
- WinSCP (Windows) - Simple interface
- Cyberduck (Mac) - User-friendly

### 2. Navigate to Deployment Directory

```
/slim/
```

This is where the old version is currently deployed. You'll be overwriting it with the new version.

### 3. Upload Files

**Option A: Upload Entire `dist/` Folder (Recommended)**
```
1. Open FTP client
2. Navigate to /slim/ directory
3. Delete old files:
   - Delete all .js files from assets/
   - Delete all .css files from assets/
   - Delete old index.html
   - Keep .htaccess (or replace with new one)

4. Upload ALL files from dist/:
   - Drag & drop dist folder contents to /slim/
   - Ensure permissions are set correctly (644 for files, 755 for directories)
```

**Option B: Selective Upload**
```
1. Upload index.html (overwrite)
2. Upload vite.svg (overwrite)
3. Upload .htaccess (overwrite or create new)
4. Delete ALL files in /slim/assets/
5. Upload all files from dist/assets/
```

### 4. File Permissions

After upload, verify permissions:
- **Files:** 644 (rw-r--r--)
- **Directories:** 755 (rwxr-xr-x)

Most FTP clients handle this automatically. If not:
- In FileZilla: Right-click → File attributes → Set to 644/755

### 5. Clear Browser Cache

After deployment, clear your browser cache:
- **Chrome/Edge:** `Ctrl+Shift+Delete`
- **Firefox:** `Ctrl+Shift+Delete`
- **Safari:** `Cmd+Shift+Delete`

Or force refresh: `Ctrl+F5` (or `Cmd+Shift+R` on Mac)

---

## ✅ Post-Deployment Verification

### 1. Test Main Routes

Visit these URLs and verify they load correctly:

```
✓ http://yourdomain.com/slim/
✓ http://yourdomain.com/slim/vocabulary
✓ http://yourdomain.com/slim/grammar
✓ http://yourdomain.com/slim/reading
✓ http://yourdomain.com/slim/speaking
✓ http://yourdomain.com/slim/listening
✓ http://yourdomain.com/slim/companion          [NEW - Avatar feature]
✓ http://yourdomain.com/slim/evaluation
✓ http://yourdomain.com/slim/curriculum
✓ http://yourdomain.com/slim/plan
```

### 2. Test Quiz Routes (Sample)

```
✓ http://yourdomain.com/slim/quiz/vo_01-01
✓ http://yourdomain.com/slim/quiz/vo_02-01      [U2]
✓ http://yourdomain.com/slim/quiz/gr_02-03      [U2]
✓ http://yourdomain.com/slim/quiz/re_02-02      [U2]
```

### 3. Test Avatar Feature

```
1. Navigate to /companion
2. Verify page loads with centered avatar
3. Click avatar button
4. Check microphone permission prompt
5. Test conversation greeting:
   "Hello. I am a non-native learner of English. My level is A1.
    I want you to help me converse in English about who I am,
    shopping and everyday activities."
```

### 4. Check Browser Console

- Open Dev Tools: `F12`
- Check **Console** tab for any errors
- Expected: No red error messages
- Some warnings about sources are OK

### 5. Test Asset Loading

- Verify images load (logo, icons)
- Verify CSS styling applied
- Verify animations work (page transitions)
- Verify fonts loaded correctly

### 6. Test TTS (Text-to-Speech)

- Navigate to any vocabulary quiz
- Click the speaker icon
- Verify audio plays
- Works best in Chrome/Edge

---

## 🔧 Troubleshooting

### Issue: 404 Errors on Sub-routes

**Problem:** Visiting `/slim/vocabulary` shows 404

**Solution:**
- Verify `.htaccess` is uploaded to `/slim/` directory
- Check `.htaccess` content:
  ```
  RewriteBase /slim/
  RewriteRule . index.html [QSA,L]
  ```
- Ask OVH support: "Enable mod_rewrite"

### Issue: Avatar Not Appearing

**Problem:** Avatar section empty or "Start Your Conversation" title only

**Solution:**
- Check browser console for errors (F12)
- Verify HeyGen service is accessible: https://labs.heygen.com
- Clear browser cache and refresh
- Try different browser (Chrome works best)

### Issue: Slow Load Times

**Problem:** Pages take 10+ seconds to load

**Solution:**
- Check OVH server performance in control panel
- Verify all assets compressed (check .gz files)
- Consider enabling Gzip compression in OVH settings
- Clear OVH cache if available

### Issue: Styling Broken (No Colors/Fonts)

**Problem:** Page loads but looks wrong

**Solution:**
- Verify all `.css` files uploaded to `assets/`
- Check file permissions (644)
- Clear browser cache (Ctrl+Shift+Delete)
- Verify path configuration correct (`base: '/slim/'`)

### Issue: Quizzes Won't Load

**Problem:** Quiz pages show error

**Solution:**
- Verify all `.js` files uploaded (55+ files in assets)
- Check quiz IDs match routes: `vo_01-01`, `gr_02-03`, etc.
- Verify lazy-loading working (check Network tab in Dev Tools)

---

## 📊 Deployment Summary

### What's New in Version 3

✅ **My English Companion Feature**
- New `/companion` route with centered HeyGen avatar
- Interactive AI conversational coach
- Instructions and tips for users
- Responsive design (mobile & desktop)

✅ **Code Quality**
- Removed 65 duplicate `.js` files
- 100% TypeScript codebase
- Proper code splitting with lazy loading
- Better CSS organization

✅ **Deployment Ready**
- `.htaccess` file for proper SPA routing
- Optimized bundle sizes
- Cache busting with hashed filenames
- Ready for production

### Build Statistics

| Metric | Value |
|--------|-------|
| Total Build Files | 60 |
| JavaScript Bundles | 55 chunks |
| CSS Files | 2 |
| Main Bundle Size | 304 KB |
| Main Bundle (Gzipped) | 89 KB |
| Total Assets | ~2.0 MB |
| Build Time | 34.73 seconds |
| TypeScript Strict Mode | ✅ Enabled |

### Content Overview

| Unit | Vocabulary | Grammar | Reading | Speaking | Listening | Total |
|------|-----------|---------|---------|----------|-----------|-------|
| Unit 1 | 4 | 4 | 2 | 1 | 1 | 12 |
| Unit 2 | 4 | 4 | 4 | 4 | 4 | 20 |
| **Total** | **8** | **8** | **6** | **5** | **5** | **32** |

*Plus companion page (1) = 33 interactive features*

---

## 🔐 Security Notes

- **HTTPS:** Verify your domain has SSL certificate (OVH provides free Let's Encrypt)
- **HeyGen API:** Uses secure HTTPS connection
- **No API Keys:** All keys are embedded in HeyGen share links (safe)
- **Microphone:** Only requested when user clicks avatar

---

## 📞 Support & References

### OVH Resources
- [OVH FTP Guide](https://help.ovhcloud.com/csm)
- [Enable mod_rewrite on OVH](https://docs.ovh.com/us/en/hosting/web-hosting-mod-rewrite/)
- OVH Control Panel: https://www.ovh.com/auth

### Tools
- **FileZilla:** https://filezilla-project.org/
- **HeyGen Avatar:** https://www.heygen.com/
- **Vite Documentation:** https://vitejs.dev/

### Project Files
- **Source Code:** `/src/` directory (not deployed)
- **Build Output:** `/dist/` directory (deployed to OVH)
- **Configuration:** `vite.config.ts`, `tsconfig.json`

---

## ✨ Next Steps

After successful deployment:

1. **Monitor Performance:** Check OVH analytics for traffic/errors
2. **Gather Feedback:** Get student feedback on avatar feature
3. **Plan Unit 3:** Start creating Unit 3 content when ready
4. **Backup:** Keep local backup of this production build
5. **Version Control:** Tag this version in Git

---

**Deployment Date:** October 23, 2025
**Status:** ✅ Ready for Production
**Prepared by:** Claude Code
**Next Deployment:** When Unit 3 or fixes are ready
