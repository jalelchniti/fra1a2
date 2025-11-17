# 🚀 SmartHub Tunis - Version 2 FTP Deployment Guide

**Version:** 2 (Units 1 & 2 - Complete Content)
**Build Date:** October 20, 2024
**Total Exercises:** 34 (U1: 14 + U2: 20)
**Build Size:** 1.8 MB (uncompressed) | ~144 KB (gzipped)

---

## 📋 Pre-Deployment Checklist

- [ ] Build is complete: `dist/` folder exists with all files
- [ ] `.htaccess` file is in `dist/` folder for SPA routing
- [ ] `dist-root-index.html` exists for root redirect
- [ ] All asset files verified (images, CSS, JS)
- [ ] Flashcard images confirmed with `/slim/` paths
- [ ] U1 and U2 quizzes registered in QuizPage.tsx
- [ ] All skill pages updated with full content
- [ ] HomePage features Unit 2 section
- [ ] BrowserRouter basename set to `/slim` in main.tsx
- [ ] Vite base config set to `/slim/` in vite.config.ts

✅ **All items complete and ready for deployment!**

---

## 📦 What to Upload

### **Files to Upload: `dist/` Folder Contents**

**Total files:** 29 files
**Total directories:** 2 (assets/images)

```
dist/
├── .htaccess                          (NEW! SPA routing + caching)
├── index.html                         (Main app entry point)
├── vite.svg                           (Favicon)
└── assets/
    ├── tailwind-C0bCDRnq.css        (Tailwind CSS - 45 KB)
    ├── index-BgDXrvuF.css           (App CSS - 52 KB)
    ├── index-D5giXR_y.js            (Main bundle - 407 KB)
    ├── images/
    │   ├── bed.png
    │   ├── book.png
    │   ├── chair.png
    │   ├── desk.png
    │   ├── door.png
    │   ├── fb_cover-01.png          (HomePage hero banner)
    │   ├── lamp.png
    │   ├── lnkd_profile_picture-01.jpg (SmartHub logo)
    │   ├── table.jpg
    │   ├── table.png
    │   ├── window.png
    │   └── react.svg
    ├── gr_01-01-BkWQdSOr.js         (Grammar U1 L1)
    ├── gr_01-02-C1TkQs1R.js         (Grammar U1 L2)
    ├── gr_01-03-CTmnxOGl.js         (Grammar U1 L3)
    ├── gr_01-04-bsaeTUHY.js         (Grammar U1 L4)
    ├── li_01-01-D1mfe-_8.js         (Listening U1 L1)
    ├── re_01-01-ChlyyrFn.js         (Reading U1 L1)
    ├── re_01-02-DKx4f2pI.js         (Reading U1 L2)
    ├── sp_01-01-YpzA8Ruo.js         (Speaking U1 L1)
    ├── vo_01-01-BVlde9kD.js         (Vocabulary U1 L1)
    ├── vo_01-02-D_Kt3b_B.js         (Vocabulary U1 L2)
    ├── vo_01-03-J5RJ6Gki.js         (Vocabulary U1 L3)
    └── vo_01-04-Bi3pMkl-.js         (Vocabulary U1 L4)
```

**Note:** U2 quizzes (20 files) are lazy-loaded and bundled in the main bundle.

---

## 🔧 FTP Upload Steps

### **Step 1: Prepare Your FTP Client**
1. Open FileZilla or your preferred FTP client
2. Enter OVH hosting credentials:
   - **Host:** ftp://your-domain.com (or FTP host provided by OVH)
   - **Username:** Your OVH FTP username
   - **Password:** Your OVH FTP password
   - **Port:** 21 (or 22 for SFTP if available)
3. Click "Connect"

### **Step 2: Navigate to Hosting Directory**
1. Once connected, find the `public_html` folder (or equivalent)
2. Navigate to the `slim/` subfolder
   - If it doesn't exist, create a new folder named `slim`

### **Step 3: Upload Version 2 Build**
1. **Delete old files (IMPORTANT):**
   - Delete old `assets/` folder if it exists
   - Delete old `index.html` (but NOT at root, only in `/slim/`)
   - Keep `.htaccess` if it exists (you're uploading a new one anyway)

2. **Upload new dist files:**
   - Select ALL contents of local `dist/` folder
   - Upload to `/slim/` folder on server
   - Ensure folder structure matches (assets/ becomes /slim/assets/, not /slim/dist/assets/)

3. **Verify upload:**
   - Confirm `.htaccess` is uploaded to `/slim/` (hidden file - enable "View hidden files" if needed)
   - Confirm `index.html` is in `/slim/` (not `/slim/dist/`)
   - Confirm `assets/` folder is in `/slim/` with all subfolders

### **Step 4: Upload Root Landing Page (Optional but Recommended)**
1. Navigate to web root (`public_html/`)
2. Upload `dist-root-index.html`
3. Rename it to `index.html` (may need to delete old one first)

This ensures visitors to `yoursite.com/` see a branded landing page.

---

## ✅ Post-Deployment Testing

### **Test 1: Root URL**
```
URL: https://yoursite.com/
Expected: SmartHub Tunis landing page
Check: Shows description + "Click to visit app" button
```

### **Test 2: Main App**
```
URL: https://yoursite.com/slim/
Expected: SmartHub homepage with hero banner and skill cards
Check:
  - Logo appears in header ✓
  - Cover banner displays ✓
  - 5 skill cards visible ✓
  - Unit 2 featured section shows ✓
```

### **Test 3: Navigation - Vocabulary**
```
URL: https://yoursite.com/slim/vocabulary
Expected: 8 vocabulary items (4 U1 + 4 U2)
Check:
  - Topic filter works ✓
  - Can see Shopping, Directions topics (U2) ✓
  - All links functional ✓
```

### **Test 4: Navigation - Grammar**
```
URL: https://yoursite.com/slim/grammar
Expected: 8 grammar items (4 U1 + 4 U2)
Check:
  - U1 items: Verb To Be, Present Simple, Yes/No Questions ✓
  - U2 items: Imperatives, Asking Questions, Prepositions, Modal Verbs ✓
```

### **Test 5: Navigation - Reading**
```
URL: https://yoursite.com/slim/reading
Expected: 8 reading items (4 U1 + 4 U2)
Check:
  - U1 items present ✓
  - U2 items: Shopping Information, Directions, Dialogue, Policy ✓
```

### **Test 6: Navigation - Speaking**
```
URL: https://yoursite.com/slim/speaking
Expected: 5 speaking items (1 U1 + 4 U2)
Check:
  - U1: Introducing Yourself ✓
  - U2: Directions, Shopping Phrases, Dialogue, Role Play ✓
```

### **Test 7: Navigation - Listening**
```
URL: https://yoursite.com/slim/listening
Expected: 5 listening items (1 U1 + 4 U2)
Check:
  - U1: Short Conversations ✓
  - U2: Directions, Shopping, Landmarks, Prices ✓
```

### **Test 8: Quiz Loading - U1**
```
URL: https://yoursite.com/slim/quiz/vo_01-01
Expected: Vocabulary flashcard quiz loads
Check:
  - Images display correctly ✓
  - TTS button works ✓
  - Navigation (Next/Previous) works ✓
  - Page title shows "Introductions Flashcards" ✓
```

### **Test 9: Quiz Loading - U2**
```
URL: https://yoursite.com/slim/quiz/vo_02-01
Expected: Shopping vocabulary quiz loads
Check:
  - Content loads without error ✓
  - Flashcard displays ✓
  - TTS works (if browser supports) ✓
```

### **Test 10: SPA Routing (Critical)**
```
Procedure:
  1. Go to: https://yoursite.com/slim/vocabulary
  2. Click on a quiz link
  3. Refresh page while on quiz
Expected:
  - Should load quiz content (NOT show 404)
  - .htaccess enables SPA routing ✓
```

### **Test 11: Featured Links**
```
On HomePage, click:
  - "Shopping Vocabulary" button → /quiz/vo_02-01 ✓
  - "Imperatives Quiz" button → /quiz/gr_02-01 ✓
```

### **Test 12: Responsive Design**
```
Test on:
  - Desktop (1920x1080) ✓
  - Tablet (768x1024) ✓
  - Mobile (375x667) ✓
```

---

## 📊 Version 2 Content Summary

### **Unit 1: Introductions** (14 exercises)
- **Vocabulary (4):** Introductions, Everyday Objects, Classroom Objects, Flashcards
- **Grammar (4):** Verb To Be, Present Simple, Yes/No Questions, Flashcards
- **Reading (4):** All About You, Anna's Daily Life, Notices, Family
- **Speaking (1):** Introducing Yourself
- **Listening (1):** Short Conversations

### **Unit 2: Shopping & Directions** (20 exercises)
- **Vocabulary (4):** Shopping, Directions & Landmarks, Currency & Payment, Conversation Vocab
- **Grammar (4):** Imperatives, Asking Questions, Prepositions, Modal Verbs
- **Reading (4):** Shopping Info, Directions, Dialogue, Return Policy
- **Speaking (4):** Asking for Directions, Shopping Phrases, Dialogue Practice, Role Play
- **Listening (4):** Understanding Directions, Shopping Conversations, Landmarks, Prices & Numbers

---

## 🎯 Key Features Included

✅ **Flashcards with TTS** - Text-to-Speech for pronunciation
✅ **Multiple Choice Quizzes** - Interactive grammar exercises
✅ **Reading Comprehension** - Passages with follow-up questions
✅ **Speaking Practice** - Dialogue and role-play scenarios
✅ **Listening Exercises** - Audio comprehension activities
✅ **Responsive Design** - Mobile, tablet, desktop support
✅ **Page Transitions** - Smooth animations via Framer Motion
✅ **Image Assets** - 8 flashcard images (bed, book, chair, desk, door, lamp, table, window)
✅ **Branded Interface** - SmartHub Tunis logo and cover banner

---

## 🔍 Important Paths & Routes

### **Skill Pages:**
- `/slim/vocabulary` - Vocabulary practice
- `/slim/grammar` - Grammar exercises
- `/slim/reading` - Reading comprehension
- `/slim/speaking` - Speaking practice
- `/slim/listening` - Listening exercises

### **Quiz Routes:**
- `/slim/quiz/vo_01-01` through `/slim/quiz/vo_01-04` - U1 Vocabulary
- `/slim/quiz/gr_01-01` through `/slim/quiz/gr_01-04` - U1 Grammar
- `/slim/quiz/re_01-01` through `/slim/quiz/re_01-02` - U1 Reading
- `/slim/quiz/sp_01-01` - U1 Speaking
- `/slim/quiz/li_01-01` - U1 Listening
- `/slim/quiz/vo_02-01` through `/slim/quiz/vo_02-04` - U2 Vocabulary
- `/slim/quiz/gr_02-01` through `/slim/quiz/gr_02-04` - U2 Grammar
- `/slim/quiz/re_02-01` through `/slim/quiz/re_02-04` - U2 Reading
- `/slim/quiz/sp_02-01` through `/slim/quiz/sp_02-04` - U2 Speaking
- `/slim/quiz/li_02-01` through `/slim/quiz/li_02-04` - U2 Listening

### **Other Routes:**
- `/slim/` - HomePage
- `/slim/curriculum` - Curriculum carousel
- `/slim/plan` - Business calculator

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **404 on page refresh** | Ensure `.htaccess` is in `/slim/` folder |
| **Images not loading** | Check that `/slim/assets/images/` exists with all PNG/JPG files |
| **Root redirect doesn't work** | Verify `index.html` is in web root (not in `/slim/`) |
| **App loads but styling is off** | Clear browser cache; verify CSS files are in `/slim/assets/` |
| **Quiz doesn't load** | Check browser console for errors; ensure QuizPage routing is correct |
| **TTS not working** | Normal - requires Chrome/Edge; Safari and Firefox have limited support |
| **Flashcard images not showing** | Verify image paths include `/slim/` prefix in source code |

---

## 📝 Quick Checklist

- [ ] Connected to OVH FTP server
- [ ] Navigated to `/slim/` folder (created if needed)
- [ ] Deleted old assets folder
- [ ] Uploaded all dist/ contents to `/slim/`
- [ ] Verified `.htaccess` is in `/slim/`
- [ ] Tested root URL (`yoursite.com/`)
- [ ] Tested app URL (`yoursite.com/slim/`)
- [ ] Tested Vocabulary page with U2 items
- [ ] Tested Grammar page with U2 items
- [ ] Tested Quiz loading (U1 and U2)
- [ ] Tested page refresh (no 404)
- [ ] Tested responsive design (mobile)
- [ ] Tested flashcard images loading
- [ ] Tested TTS functionality (if browser supports)

---

## 🎉 You're Ready to Deploy!

**Version 2 includes:**
- ✅ All Unit 1 content with fixed flashcard images
- ✅ Complete Unit 2 content (20 new exercises)
- ✅ Featured Unit 2 section on HomePage
- ✅ All skill pages updated with full content
- ✅ Proper SPA routing with .htaccess
- ✅ Caching and compression headers
- ✅ Security headers included
- ✅ Root redirect landing page

**Estimated upload time:** 5-10 minutes (depending on connection speed)

---

**Need help?** Refer to CLAUDE.md for architecture details or DEPLOYMENT_READY.md for additional guidance.

Good luck! 🚀
