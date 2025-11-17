# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Essential Commands:**
- `npm run dev` - Start dev server (http://localhost:5173/)
- `npm run build` - Production build with full TypeScript checking
- `npm run lint -- --fix` - Auto-fix code quality issues
- `npm test` - Run tests in watch mode
- `npx vitest --run` - Run tests once

**Key Import Pattern:**
- Always use `@/` alias for imports: `import Button from '@/components/ui/button'`
- Alias maps to `src/` in `tsconfig.json` and `vite.config.ts`

## Table of Contents

- [Project Overview](#project-overview) - Status and feature summary
- [Recent Work Summary](#recent-work-summary) - Latest updates and changes
- [Critical Architecture Details](#critical-architecture-details) - Must-know routing, quiz registration, code splitting
- [Critical Gotchas](#critical-gotchas--important-notes) - Common mistakes and solutions
- [Development Commands](#development-commands) - Core and testing commands
- [Adding New Content](#adding-new-content) - Quick workflow for new quizzes
- [Creating New Units](#creating-new-units-from-course-schedule) - Full process for new units
- [Architecture Overview](#architecture-overview) - Routing, component structure, TTS patterns
- [Production Build & Deployment](#production-build--deployment) - Build process and FTP deployment
- [Troubleshooting](#troubleshooting-common-issues) - Solutions to common problems

## Project Overview

**SmartHub Tunis** - An English language learning application (A1-A2 level) built with React, TypeScript, and Vite. Provides interactive educational content through quizzes and flashcards with text-to-speech capabilities, organized by language skill types.

**Current Status:** v3.0 - Units 1, 2, & 3 complete with 57 total interactive exercises, ready for production
- **Unit 1**: 12 quizzes (4 Vocabulary, 4 Grammar, 2 Reading, 1 Speaking, 1 Listening)
- **Unit 2**: 25 quizzes (5 Vocabulary, 5 Grammar, 5 Reading, 5 Speaking, 5 Listening)
- **Unit 3**: 20 quizzes (4 Vocabulary, 4 Grammar, 4 Reading, 4 Speaking, 4 Listening) - partial
- **Branding:** SmartHub Tunis - "Connecting Intelligent People"
- **Deployment:** Configured for `/slim/` subfolder deployment

## Recent Work Summary

**Latest Updates (November 2025):**
- Unit 2: All 5 lessons per skill fully implemented (25 total quizzes)
- Unit 3: Partial implementation with 4 lessons per skill (20 total quizzes) for 5 skills
- All 57 quizzes properly registered in `quizMap` with lazy loading
- `vite.config.ts` configured with manual chunk splitting including Unit 3 chunks
- HeyGen avatar in MyCompanion component centered and sized prominently (600px initial, 1098px expanded)
- TTS implementation complete across all quiz types with proper deduplication via `useRef`
- Production deployment ready with comprehensive FTP guides available

## Critical Architecture Details

### 1. Routing & Deployment
- **React Router v7** with `basename="/slim"` (configured in `src/main.tsx`)
- **Quiz routing:** Dynamic `/quiz/{quizId}` routes mapped in `src/pages/QuizPage.tsx`
- **Quiz IDs format:** `{skillCode}_{unit}-{lesson}`
  - Example: `vo_01-01` (Vocabulary Unit 1 Lesson 1)
  - Skill codes: `vo` (Vocab), `gr` (Grammar), `re` (Reading), `sp` (Speaking), `li` (Listening)
- **Deploy to `/slim/`** folder - base path must match vite.config.ts and main.tsx exactly

### 2. Quiz Map Registration
**File:** `src/pages/QuizPage.tsx` (contains `quizMap` object)

When adding quizzes:
```typescript
// Pattern to follow:
'vo_02-01': lazy(() => import('../store/u2/Vocabulary/vo_02-01')),
```
- Quiz file must exist at path specified in import
- ID must match exactly with quiz filename
- QuizPage reads URL param and lazy-loads component

### 3. Code Splitting & Bundle Structure
**File:** `vite.config.ts` (lines 13-32 define `manualChunks`)

- Each skill (vocabulary, grammar, etc.) in U1/U2 gets its own chunk: `u1-vocabulary`, `u1-grammar`, etc.
- When adding new units, create corresponding chunk entries in `manualChunks`
- Build fails if file paths in chunks don't exist - update or remove them

### 4. TypeScript & Compilation
- **100% TypeScript:** All files are `.tsx` - no `.js` files allowed
- **`noEmit: true`** in `tsconfig.json` - prevents TypeScript auto-compilation
- Visual Studio may auto-compile to `.js` - safely delete if they appear; `.gitignore` excludes them
- **Strict mode enabled** - all type errors must be fixed before `npm run build` succeeds

### 5. Text-to-Speech (TTS)
**Core Pattern** (see `src/store/u1/Vocabulary/vo_01-01.tsx`):
```typescript
const isSpeakingRef = useRef(false);  // Prevent duplicate calls
const speak = (text: string) => {
  if (!isTtsEnabled || isSpeakingRef.current) return;
  isSpeakingRef.current = true;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
  utterance.onend = () => { isSpeakingRef.current = false; };
};
```
- Voice loading via `speechSynthesis.onvoiceschanged` event
- Works best in Chrome/Edge (Safari/Firefox limited support)
- For reading quizzes: split by sentences `text.split(/(?<=[.!?])\s+/)` and sequence playback

### 6. Layout & Navigation
- **Main Layout:** `src/components/layout/layout.tsx` - wraps all pages
- **Header/Footer/Sidebar:** Consistent across all routes
- **Skill Pages:** Act as hubs listing quiz exercises
  - Files: `VocabularyPage.tsx`, `GrammarPage.tsx`, `ReadingPage.tsx`, `SpeakingPage.tsx`, `ListeningPage.tsx`
  - Each has content array with quiz references
- **Page Transitions:** Framer Motion AnimatePresence in `App.tsx`

## Adding New Content

### Adding a Quiz (Quick Workflow)
1. **Choose template** from `src/store/samples/` (flashcards, multiple choice, reading, etc.)
2. **Create file:** `src/store/u{unit}/{SkillType}/{skillCode}_{unit}-{lesson}.tsx`
3. **Register in QuizPage.tsx:** Add entry to `quizMap` object
4. **Add to skill page:** Add content item to `VocabularyPage.tsx`, `GrammarPage.tsx`, etc.
5. **Test:** `npm run dev` → navigate to `/quiz/{quizId}`
6. **Lint:** `npm run lint -- --fix`

### Creating a New Unit (Complete Workflow)
Reference: `Students/{StudentName}/{StudentName}_Course_Schedule.md`

1. **Extract lesson data** - Learning objectives, vocabulary, grammar rules
2. **Create directory structure:**
   ```bash
   mkdir -p src/store/u{unit}/{Vocabulary,Grammar,Reading,Speaking,Listening}
   ```
3. **Create 20 quiz files** (4 per skill = 5 skills)
   - Use templates as starting points
   - Content must be **English ONLY** - no Arabic, no translations
   - Definitions should be A1-level simple English
4. **Register all in QuizPage.tsx** - Add 20 entries to `quizMap`
5. **Update skill pages** - Add 4 items per skill (file: `src/pages/`)
6. **Update HomePage** - Add unit to featured section
7. **Update vite.config.ts** - Add new chunk entries if using code splitting
8. **Test all routes** - Verify /quiz/{quizId} works for all
9. **Run full build:** `npm run build` (must pass TypeScript check)

## Project Structure Overview

```
src/
├── App.tsx                          # Route definitions
├── main.tsx                         # Entry point (CRITICAL: basename="/slim")
├── components/
│   ├── layout/                      # Header, Footer, Sidebar, Layout wrapper
│   └── ui/                          # Radix UI + custom shadcn/ui-style components
├── pages/                           # Route pages (13 total)
│   ├── HomePage.tsx                 # Landing page with featured quizzes
│   ├── QuizPage.tsx                 # Dynamic quiz router (uses quizMap)
│   ├── {Skill}Page.tsx              # Vocabulary, Grammar, Reading, Speaking, Listening
│   ├── MyCompanion.tsx              # AI avatar conversational practice
│   ├── EvaluationPage.tsx           # Course evaluation form
│   ├── EFLCurriculumCarousel.tsx    # Curriculum overview carousel
│   └── Confirm*Page.tsx             # Confirmation pages
├── store/                           # Quiz content (97 files)
│   ├── u1/                          # Unit 1 (12 quizzes)
│   │   ├── Vocabulary/              # vo_01-01 through vo_01-04
│   │   ├── Grammar/                 # gr_01-01 through gr_01-04
│   │   ├── Reading/                 # re_01-01 through re_01-02
│   │   ├── Speaking/                # sp_01-01
│   │   └── Listening/               # li_01-01
│   ├── u2/                          # Unit 2 (25 quizzes) - COMPLETE
│   │   ├── Vocabulary/              # vo_02-01 through vo_02-05
│   │   ├── Grammar/                 # gr_02-01 through gr_02-05
│   │   ├── Reading/                 # re_02-01 through re_02-05
│   │   ├── Speaking/                # sp_02-01 through sp_02-05
│   │   └── Listening/               # li_02-01 through li_02-05
│   ├── u3/                          # Unit 3 (20 quizzes) - PARTIAL
│   │   ├── Vocabulary/              # vo_03-01 through vo_03-04
│   │   ├── Grammar/                 # gr_03-01 through gr_03-04
│   │   ├── Reading/                 # re_03-01 through re_03-04
│   │   ├── Speaking/                # sp_03-01 through sp_03-04
│   │   └── Listening/               # li_03-01 through li_03-04
│   ├── samples/                     # Template quizzes (6+ templates)
│   └── plan.tsx                     # Business calculator feature
├── lib/
│   └── utils.ts                     # Utility functions
└── resources/
    └── Read_TTS_Highlight_Quiz_Docs.md  # Detailed TTS implementation guide
```

**Total Files in src/:** ~105
- Quiz files: 57 (12 U1 + 25 U2 + 20 U3)
- Pages: 13
- Components: 8+
- Other: ~27

## Testing

**Test Setup:** `vitest.config.ts` with jsdom environment

Commands:
- `npm test` - Watch mode (re-runs on file changes)
- `npx vitest --run` - Run once and exit
- `npx vitest --run src/path/file.test.tsx` - Single file
- `npx vitest --ui` - Interactive UI

Test files typically go next to components: `ComponentName.test.tsx`

## Build & Production

### Pre-Deployment Steps
```bash
npm run lint              # Check code quality
npm test -- --run        # Ensure tests pass
npm run build             # Full TypeScript check + production build
```

### Build Output
- Location: `dist/` folder
- Contains: HTML, CSS, JS (chunked), assets, .htaccess
- Size: ~2.0 MB uncompressed, ~150 KB gzipped
- Files: 59 total (index.html + 43 JS files + 2 CSS + assets)

### Deployment
1. Run `npm run build`
2. Upload all contents of `dist/` to server at `/slim/` path
3. Ensure `.htaccess` is included (for SPA routing)
4. Optional: Upload `dist-root-index.html` as `/index.html` at web root

**FTP Details:** See `FTP_DEPLOYMENT_PRODUCTION_GUIDE.md`

## State Management & Patterns

**Zustand:** Minimal usage for global state
**Local State:** Preferred for component-specific quiz logic
**Refs:** Used for TTS deduplication (`isSpeakingRef`)

Key patterns:
- Quiz state (current question, score, answered) → local state
- User preferences (TTS enabled) → could use Zustand or localStorage
- Component animations → Framer Motion

## Styling & Theme

- **Framework:** Tailwind CSS 3
- **Components:** Custom UI components in `src/components/ui/` (shadcn/ui style)
- **Animations:** Framer Motion (page transitions, avatar interactions)
- **Icons:** Lucide React + React Icons
- **Color scheme:** Tailwind defaults + custom brand colors (orange/blue)

No global CSS - all styling through Tailwind classes.

## Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript config + path aliases (`@/*` → `src/*`), `noEmit: true` |
| `vite.config.ts` | Vite build config + React plugin + code splitting chunks + base path `/slim/` |
| `vitest.config.ts` | Test config (jsdom environment) |
| `tailwind.config.js` | Tailwind customization |
| `eslint.config.js` | ESLint rules (React Hooks, React Refresh) |
| `components.json` | shadcn/ui config (component aliases) |
| `.htaccess` | Apache routing for SPA (included in build) |

## Content Guidelines

⚠️ **ABSOLUTE RULE: ENGLISH ONLY - No other languages**

- ✅ Use simple, A1-level English definitions
- ✅ Provide clear contextual examples
- ✅ Use TTS for pronunciation support
- ❌ Never use Arabic, translations, or code-switching
- ❌ Never include mixed-language explanations

**Example - Correct:**
```typescript
{ sideA: "Shirt", sideB: "A piece of clothing worn on the upper body" }
```

**Example - Wrong:**
```typescript
{ sideA: "Shirt", sideB: "قميص" }  // ❌ NEVER - Do this
```

## Features & Pages

1. **Vocabulary/Grammar/Reading/Speaking/Listening** - Skill hubs with quiz lists
2. **Quiz Page** - Dynamic router for 57 interactive exercises (Units 1, 2, & 3)
3. **My English Companion** - HeyGen avatar for conversational AI practice
4. **Curriculum** - EFL curriculum carousel overview
5. **Evaluation** - Course evaluation survey form
6. **Plan** - Business calculator utility
7. **Home** - Landing page with featured quizzes

## Common Development Tasks

**I want to fix a TypeScript error:**
```bash
npm run build  # Shows all errors
# Fix the error in src/
npm run build  # Verify it's fixed
```

**I want to check code quality before committing:**
```bash
npm run lint -- --fix  # Auto-fix issues
npm test -- --run      # Verify tests pass
npm run build          # Full check with TypeScript
```

**I want to add a new quiz to Unit 2 Vocabulary:**
1. Copy a template from `src/store/samples/InteractiveFlashcardsWithTTS.tsx`
2. Create: `src/store/u2/Vocabulary/vo_02-05.tsx`
3. Add to `quizMap` in `QuizPage.tsx`
4. Add to content array in `VocabularyPage.tsx`
5. Test: `npm run dev` → click quiz in /vocabulary page
6. `npm run lint -- --fix` and commit

**I want to preview the production build locally:**
```bash
npm run build    # Build for production
npm run preview  # Serve dist folder locally
# Then visit http://localhost:4173/slim/ (note the /slim/ path)
```

## Quick Debugging Guide

### Browser Console Checks
- **TTS Voice Loading**: Open DevTools (F12), check console for "Available voices" log
- **Route Errors**: Check console for 404 or routing errors - look for quiz ID mismatches
- **Component Rendering**: Verify component mounts with React DevTools (browser extension)
- **Network Issues**: Check Network tab for failed imports or missing assets

### Common Debug Commands
```bash
# Check for all TypeScript issues without building
npm run build 2>&1 | head -50  # Show first 50 errors

# Run tests with verbose output for debugging
npx vitest --run --reporter=verbose

# Check specific file for linting issues only
npx eslint src/pages/QuizPage.tsx

# Clear node_modules and reinstall (nuclear option)
rm -rf node_modules package-lock.json && npm install
```

### HeyGen Avatar Debugging
- Check browser console for script loading errors (avatar script from HeyGen CDN)
- Verify microphone permissions are granted in browser
- Test in Chrome/Edge first - best avatar support
- Check that avatar container renders before script injection

## Critical Gotchas & Important Notes

### Must-Know Rules (CRITICAL)
1. **basename="/slim"** must match in TWO places:
   - `src/main.tsx`: `<BrowserRouter basename="/slim">`
   - `vite.config.ts`: `base: '/slim/'`
   - If they don't match, routing will fail silently or show 404s

2. **Quiz registration requires TWO steps:**
   - Add to `quizMap` in `src/pages/QuizPage.tsx`
   - Add to content array in corresponding skill page (VocabularyPage, GrammarPage, etc.)
   - Missing either step means quiz won't appear or won't be discoverable

3. **Asset paths - Don't manually add `/slim/`:**
   - Code: `<img src="/assets/images/file.png" />`
   - Vite automatically prefixes with `/slim/` in production build
   - Adding it manually causes `/slim/slim/` paths in production

### Common Issues & Solutions
- **.js files appearing in src/:** Safe to delete. Caused by IDE auto-compilation. Ensure `noEmit: true` in tsconfig.json
- **TTS not working:** Test in Chrome/Edge first. Check browser console for voice loading. Verify `isTtsEnabled` state is true
- **Route 404 errors:** Check if quiz ID in URL matches `quizMap` entry exactly (case-sensitive)
- **Build TypeScript errors:** Run `npm run build` to see all errors. Fix them before deployment
- **Flashcard images not showing:** Verify image is in `public/assets/images/` and path uses `/assets/images/filename.ext` (no `/slim/`)

### Language Rule
- **ABSOLUTE: English only** - No Arabic, translations, or code-switching anywhere in quiz content

## Development Commands

### Core Commands
- `npm run dev` - Start development server (typically runs on http://localhost:5173)
- `npm run build` - Type check and build for production (runs `tsc -b && vite build`)
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve the dist folder using serve package
- `npm run lint` - Run ESLint to check code quality
- `npm run lint -- --fix` - Automatically fix linting issues

### Testing Commands
- `npm test` or `npx vitest` - Run all tests in watch mode
- `npx vitest --run` - Run all tests once and exit
- `npx vitest --run src/path/to/file.test.tsx` - Run tests for a specific file
- `npx vitest --ui` - Open interactive test UI
- `npx vitest --run --reporter=verbose` - Run tests with detailed output (useful for debugging)

### Build Commands
- `npx vite build` - Build for production without TypeScript checking (skips strict type validation)

**Note on Build Commands:** The project uses `npm run build` for CI/CD (includes type checking) and `npx vite build` for quick local builds when you want to skip strict TypeScript checking. Both output to the `dist/` folder.

**Development Notes:**
- **TypeScript strict mode enabled** - all source files must be `.tsx` (no `.js` files)
  - `tsconfig.json` has `noEmit: true` to prevent TypeScript from auto-compiling to .js files
  - `.gitignore` excludes `src/**/*.js` and `.vs/` folder (prevents VS Studio auto-compilation artifacts)
  - Use `npm run lint -- --fix` to maintain code quality
- **React Refresh compatibility** - React components must be exported at the top level for React Refresh to work correctly
  - Avoid exporting default from wrapped functions
  - Default exports are reserved for page components only
- **Visual Studio Note** - If .js files appear in src/ folder despite `noEmit: true`, check VS Code settings and disable TypeScript auto-compilation

## Architecture Overview

### Routing System

**Layout Structure** (`src/App.tsx` + `src/components/layout/layout.tsx`)
- React Router v7 with centralized route definitions
- **CRITICAL:** BrowserRouter configured with `basename="/slim"` in `src/main.tsx` for subfolder deployment
- All pages wrapped in `Layout` component providing header, sidebar, footer, and Framer Motion page transitions
- Skill pages (Vocabulary, Grammar, etc.) act as navigation hubs to individual exercises
- SmartHub branding in header (logo), footer, and mobile sidebar

**Dynamic Quiz Routing** (`src/pages/QuizPage.tsx`)
- Central quiz router using lazy-loaded components via `quizMap` object
- Maps URL patterns to quiz components: `/quiz/{quizId}` → lazy import
- Quiz IDs follow strict naming: `{skillCode}_{unitNumber}-{lessonNumber}`
  - Examples: `vo_01-01` (Vocabulary Unit 1 Lesson 1), `gr_01-02` (Grammar Unit 1 Lesson 2)
  - Skill codes: `vo` (Vocabulary), `gr` (Grammar), `re` (Reading), `sp` (Speaking), `li` (Listening)
- When adding new quizzes: add entry to `quizMap` in `QuizPage.tsx`

### Quiz Content Organization

**Directory Structure**
```
src/store/
├── samples/          # Template exercises showing different interaction patterns
│   ├── InteractiveFlashcardsWithTTS.tsx    # Basic flashcard with TTS
│   ├── ReadingComprehensionQuizWithTTS.tsx # Reading with sentence highlighting
│   ├── MCQAndTypingQuiz.tsx                # Mixed question types
│   ├── Simple_Grammar_Rules.tsx            # Grammar presentation format
│   ├── TextInputQuizWithHints.tsx          # Type-in with hints
│   └── ...                                 # Additional sample templates
├── u1/              # Unit 1 content (organized by skill)
│   ├── Vocabulary/  # vo_01-01.tsx, vo_01-02.tsx, ...
│   ├── Grammar/     # gr_01-01.tsx, gr_01-02.tsx, ...
│   ├── Reading/     # re_01-01.tsx, re_01-02.tsx, ...
│   ├── Speaking/    # sp_01-01.tsx
│   └── Listening/   # li_01-01.tsx
├── u2/              # Unit 2 content (organized by skill) - Shopping & Directions
│   ├── Vocabulary/  # vo_02-01.tsx through vo_02-04.tsx
│   ├── Grammar/     # gr_02-01.tsx through gr_02-04.tsx
│   ├── Reading/     # re_02-01.tsx through re_02-04.tsx
│   ├── Speaking/    # sp_02-01.tsx through sp_02-04.tsx
│   └── Listening/   # li_02-01.tsx through li_02-04.tsx
└── plan.tsx         # Business calculator feature
```

**Unit 2 Activities (25 Total) - COMPLETE**
Created based on `Students/Slim_Gharbi/Slim_Gharbi_Course_Schedule.md` Lesson 4: Shopping & Directions

- **Vocabulary (5)**: Shopping, Directions & Landmarks, Currency & Payment, Shopping-related specialized vocabulary, Advanced shopping concepts
- **Grammar (5)**: Imperatives for Directions, Asking Questions, Prepositions of Place, Modal Verbs, Advanced grammar structures
- **Reading (5)**: Shopping Information, Directions, Shopping Dialogue, Return & Exchange Policy, Advanced reading comprehension
- **Speaking (5)**: Asking for Directions, Shopping Phrases, Dialogue Practice, Role Play Scenarios, Extended speaking activities
- **Listening (5)**: Understanding Directions, Shopping Conversations, Landmarks & Locations, Prices & Numbers, Advanced listening comprehension

**Unit 3 Activities (20 Total) - PARTIAL**
Partial implementation with 4 lessons per skill. Ready for expansion to 25 total with 5th lesson additions.

- **Vocabulary (4)**: Core vocabulary set with room for expansion
- **Grammar (4)**: Grammar topics with room for advanced topics
- **Reading (4)**: Reading passages with room for additional comprehension exercises
- **Speaking (4)**: Speaking activities with room for advanced practice
- **Listening (4)**: Listening exercises with room for additional audio comprehension

**Quiz Types**
1. Flashcard Quizzes - Card flip with conditional TTS based on card index
2. Multiple Choice - Question/answer selection with scoring
3. Type-in Quizzes - Text input validation
4. Reading Comprehension - Text passages with sentence highlighting + TTS + follow-up questions

### Text-to-Speech Implementation

**Core Pattern** (see `src/store/u1/Vocabulary/vo_01-01.tsx`)
```typescript
const isSpeakingRef = useRef(false);  // Prevent duplicate calls
const speak = (text: string) => {
  if (!isTtsEnabled || isSpeakingRef.current) return;
  isSpeakingRef.current = true;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  const voice = voices.find(v => v.lang === "en-US") || voices[0];
  utterance.voice = voice;
  utterance.onend = () => { isSpeakingRef.current = false; };
  window.speechSynthesis.speak(utterance);
};
```

**Key Features**
- Voice loading via `speechSynthesis.onvoiceschanged` event
- Conditional TTS based on card index or flip state
- Toggle functionality with state management
- Sentence-level highlighting synchronized with speech playback

**Reading Quiz TTS Pattern**
- Text split by sentences: `text.split(/(?<=[.!?])\s+/)`
- Sequential speech with highlighting via `currentSentenceIndex` state
- Play/Pause/Stop controls with utterance chaining

### Component Architecture

**UI Stack**
- Radix UI primitives for accessible components
- Custom components in `src/components/ui/` (shadcn/ui style)
- Tailwind CSS for styling (utility-first)
- Framer Motion for page transitions and animations

**State Management**
- Zustand for global state (minimal usage)
- Local component state for quiz logic
- Refs for TTS deduplication

### My English Companion Feature (`src/pages/MyCompanion.tsx`)

**Overview:** AI-powered conversational English coach using HeyGen avatar

**Page Layout:**
- Hero section with "My English Companion" heading and subtitle
- Instructions section with 5 guided steps
- **Avatar Section** - HeyGen streaming avatar (PRIMARY FOCAL POINT - centered on page)
- Features showcase (Real Conversations, AI Coaching, Track Progress)
- Tips for better practice
- Call-to-action section

**HeyGen Avatar Integration:**
- Embedded script injected via `useEffect` hook with guard condition `!scriptElement` to prevent script duplication
- Avatar dynamically injects as interactive element
- **Avatar Sizing (Oct 2024 Enhancement):**
  - Avatar button (initial state): 600px diameter (circular, centered)
  - Desktop expanded conversation: 1098px × 1098px (200% increase from 366px baseline)
  - Mobile expanded conversation: 798px × 798px (200% increase from 266px baseline)
  - Responsive scaling maintains 16:9 aspect ratio in expanded state
- Microphone required and requested on activation
- Conversation UI scales based on screen size

**Positioning & Styling:**
- Avatar centered horizontally on page via `flex justify-center`
- White background section for high contrast against page
- Avatar section positioned prominently between Instructions and Features
- Minimum height of 250px for avatar container
- Responsive padding and spacing on mobile devices
- Large button state draws user attention before expansion

**User Flow:**
1. Navigate to `/companion`
2. Read instructions and tips about conversation practice
3. See large centered avatar button
4. Click avatar button to expand conversation view
5. Grant microphone permission when prompted
6. Start with greeting: "Hello. I am a non-native learner of English. My level is A1..."
7. Avatar responds and guides conversation for ~10 minutes
8. Copy conversation script to share with teacher on WhatsApp

**Topics Covered:**
- Personal introductions (who you are)
- Shopping & transactions
- Everyday activities & routines
- Basic A1-level conversational English

**Microphone & Privacy:**
- Uses browser's Web Audio API
- Requests permission on first interaction
- Works best in Chrome/Edge
- Supports Safari and Firefox with user gesture permission

## Path Configuration

**Import Alias** - `@/*` maps to `src/*`
- Configured in `tsconfig.json` and `vite.config.ts`
- Use: `import Button from '@/components/ui/button'`
- Avoid: `../../../@/components/ui/button` (incorrect relative paths)

**Asset Paths in Production**
- All assets automatically prefixed with `/slim/` during build
- Example: `/slim/assets/images/lnkd_profile_picture-01.jpg`
- No need to manually add `/slim/` prefix in component code
- Vite handles path resolution based on `base` config

## Adding New Quizzes

**Step-by-step Process:**

1. **Choose a template** from `src/store/samples/` based on desired interaction pattern
2. **Create quiz component** in `src/store/u{unit}/{SkillType}/{skillCode}_{unit}-{lesson}.tsx`
   - Example: `src/store/u1/Vocabulary/vo_01-05.tsx`
3. **Register quiz** by adding lazy import to `quizMap` in `src/pages/QuizPage.tsx`:
   ```typescript
   'vo_01-05': lazy(() => import('../store/u1/Vocabulary/vo_01-05'))
   ```
4. **Implement TTS** (if needed):
   - For basic TTS: follow pattern in `src/store/u1/Vocabulary/vo_01-01.tsx`
   - For reading with highlighting: see comprehensive guide in `src/resources/Read_TTS_Highlight_Quiz_Docs.md`
5. **Test** by navigating to `/quiz/{quizId}` (e.g., `/quiz/vo_01-05`)

## Creating New Units from Course Schedule

**Reference Document:** `Students/{StudentName}/{StudentName}_Course_Schedule.md`

**Step-by-Step Process for Complete Unit Creation:**

### 1. **Extract Lesson Information**
   - Review the course schedule for the target lesson
   - Identify: Learning objectives, learning items, topics covered
   - Example: Lesson 4 focuses on "Shopping & Directions" with vocabulary, grammar, dialogue, and practical skills

### 2. **Create Directory Structure**
   ```bash
   mkdir -p src/store/u{unit}/{Skill} for each skill
   # Example: src/store/u2/Vocabulary, u2/Grammar, u2/Reading, u2/Speaking, u2/Listening
   ```

### 3. **Create 20 Quiz Files (4 per skill)**
   - **Naming Convention**: `{skillCode}_{unit}-{lessonNumber}.tsx`
   - **File Locations**: `src/store/u{unit}/{SkillType}/{filename}.tsx`
   - **Pattern**: Create 4 activities per skill demonstrating different interaction types:
     1. **Vocabulary**: Flashcard quizzes with definitions
     2. **Grammar**: Multiple choice with explanations
     3. **Reading**: Passages with comprehension questions
     4. **Speaking**: Phrase practice and dialogue role-plays
     5. **Listening**: Audio comprehension and QA

### 4. **Content Guidelines - ENGLISH ONLY**
   ⚠️ **ABSOLUTE RULE: Never use any language other than English**
   - All explanations, synonyms, and definitions must be in **simple, basic English**
   - Definitions should be beginner-friendly (A1 level)
   - Each definition explains the concept clearly without translation
   - Example: Instead of Arabic synonym, use: "A piece of clothing worn on the upper body"

### 5. **Register All Quizzes in QuizPage.tsx**
   ```typescript
   // In src/pages/QuizPage.tsx, add to quizMap:
   'vo_02-01': lazy(() => import('../store/u2/Vocabulary/vo_02-01')),
   'gr_02-01': lazy(() => import('../store/u2/Grammar/gr_02-01')),
   // ... repeat for all quizzes, organized by skill and unit
   ```
   **CRITICAL:** Quiz IDs must match exact filename and folder structure

### 6. **Update Skill Pages** (`src/pages/`)
   Add entries to each skill page's content array:
   - **VocabularyPage.tsx**: Add all new quizzes
   - **GrammarPage.tsx**: Add all new quizzes
   - **ReadingPage.tsx**: Add all new quizzes
   - **SpeakingPage.tsx**: Add all new quizzes
   - **ListeningPage.tsx**: Add all new quizzes

   **CRITICAL:** Missing quiz from skill page means it won't be discoverable from hub page

   Structure for each item:
   ```typescript
   {
     id: 'skillCode_unit-lesson',
     title: 'Activity Title',
     content: 'Short description',
     level: 'A1',
     topic: 'Topic category',
     quizId: 'skillCode_unit-lesson'
   }
   ```

### 7. **Update HomePage** (`src/pages/HomePage.tsx`)
   - Update featured practice section with new unit details
   - Change featured quiz links to new unit quizzes
   - Update `featuredLessonPoints` array with new unit topics

   **NOTE:** Featured quizzes are optional - only update if you want new unit content on home page

### 8. **Update vite.config.ts for Code Splitting** (if creating Unit 3+)
   Add new chunk entries in `vite.config.ts` build.rollupOptions.output.manualChunks:
   ```typescript
   'u3-vocabulary': ['src/store/u3/Vocabulary/vo_03-01.tsx', ...],
   'u3-grammar': ['src/store/u3/Grammar/gr_03-01.tsx', ...],
   // ... repeat for all skills
   ```
   **CRITICAL:** Build will fail if manualChunks file paths don't exist - add only actual files or comment them out

### 9. **Test All Routes**
   ```bash
   npm run dev
   # Visit: http://localhost:5173/vocabulary (shows all vocab items)
   # Click on new unit items
   # Verify routing to /quiz/{quizId} works
   # Test TTS functionality
   ```

### 10. **Verify Integration**
   - ✅ Quizzes accessible from skill pages
   - ✅ Direct URL access works: `/quiz/vo_02-01`
   - ✅ HomePage features new unit (optional)
   - ✅ All links properly routed
   - ✅ No Arabic or other language text
   - ✅ TTS working in all quizzes

## Code Quality and Testing

**ESLint Configuration** (`eslint.config.js`)
- Enforces React Hooks rules via `eslint-plugin-react-hooks`
- Warns on missing React Refresh exports with `react-refresh/only-export-components`
- TypeScript ESLint recommended rules enabled
- Ignores `dist` folder during linting
- All source files must be `.tsx` (100% TypeScript)

**Testing Setup** (`vitest.config.ts`)
- Test environment: jsdom (browser-like environment)
- Global test utilities enabled
- Setup file: `src/test/setup.ts`
- Run with: `npm test` (watch mode) or `npx vitest --run` (single run)

## Technology Stack

- React 18 + TypeScript + Vite 6
- React Router v7 (with `basename="/slim"` for subfolder deployment)
- Tailwind CSS 3 + Framer Motion
- Radix UI + custom shadcn/ui-style components
- Zustand (state management - minimal usage)
- Vitest (testing - configured with jsdom)
- Icons: Lucide React, React Icons
- Carousel: react-responsive-carousel (used in EFLCurriculumCarousel)

## Key Configuration Files

- **`tsconfig.json`** - TypeScript configuration
  - Path alias: `@/*` → `src/*` (used for all imports)
  - **`noEmit: true`** - Prevents TypeScript from outputting .js files (only used for type checking)
  - Strict mode enabled for type safety
  - `skipLibCheck: true` to speed up compilation

- **`vite.config.ts`** - Vite build configuration
  - React plugin for JSX support and React Refresh
  - Base path: `/slim/` for subfolder deployment
  - **`manualChunks` configuration** for optimal code splitting (U1/U2 skill chunks + individual quizzes)
  - Build output target: `dist/` folder
  - Asset handling with cache-busting hashes

- `vitest.config.ts` - Test environment setup with jsdom
- `eslint.config.js` - Linting rules for React Hooks and TypeScript
- `tailwind.config.ts` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins for Tailwind
- **`.gitignore`** - Includes `src/**/*.js` and `.vs/` to prevent auto-compiled artifacts

### Code Splitting with manualChunks

**Location:** `vite.config.ts` lines 16-37

**How it works:**
- Each skill's quizzes are bundled into separate chunks: `u1-vocabulary`, `u1-grammar`, etc.
- This reduces initial bundle size - only needed quiz chunks are loaded
- **When adding new quizzes:** Add their file paths to the appropriate chunk in `manualChunks`
- Example: Adding `vo_04-01.tsx` requires adding it to a `u4-vocabulary` chunk entry

**Current chunks:**
- **U1**: `u1-vocabulary` (4), `u1-grammar` (4), `u1-reading` (2), `u1-speaking` (1), `u1-listening` (1)
- **U2**: `u2-vocabulary` (5), `u2-grammar` (5), `u2-reading` (5), `u2-speaking` (5), `u2-listening` (5)
- **U3**: `u3-vocabulary` (4), `u3-grammar` (4), `u3-reading` (4), `u3-speaking` (4), `u3-listening` (4)

**When to update manualChunks:**
- When creating Unit 4+, add new chunk definitions for all 5 skills
- When completing Unit 3 lessons (adding lessons 5 to existing), update file paths: `[...existing, 'src/store/u{unit}/{Skill}/{code}_{unit}-05.tsx']`
- **CRITICAL:** Build will fail if file paths in chunks don't exist - add actual file paths or remove them
- File paths must exactly match the quiz file location

## Branding Assets

**Logo:** `public/assets/images/lnkd_profile_picture-01.jpg`
- Used in header, footer, mobile sidebar, root landing page
- Circular logo with orange border

**Cover Banner:** `public/assets/images/fb_cover-01.png`
- Used in home page hero section
- "SMARTHUB - Connecting Intelligent People" design

**Color Scheme:**
- Primary: Blue tones (from Tailwind config)
- Accent: Orange/Red tones (brand colors)
- Used consistently across header, footer, buttons

## Production Build & Deployment

### Pre-Deployment Checklist

Before building for production, verify:

1. **Code Quality**
   ```bash
   npm run lint              # Check for linting issues
   npm test -- --run         # Verify all tests pass
   npm run build             # Perform full type check and build
   ```

2. **Source Files**
   - All files are `.tsx` (no `.js` files - checked via `.gitignore` and `tsconfig.json` with `noEmit: true`)
   - No TypeScript errors in build output
   - All quiz files registered in `src/pages/QuizPage.tsx` quizMap
   - All skill pages updated with latest content entries

3. **Assets & Resources**
   - All flashcard images in `public/assets/images/`
   - All audio files optimized and in `public/assets/audio/`
   - Logo and branding images present and accessible

### Build for Production

**Option 1: Full build with TypeScript checking** (RECOMMENDED FOR PRODUCTION)
```bash
npm run build
```
- Runs both TypeScript type checking and Vite build
- Fails if ANY TypeScript errors exist (prevents broken deployments)
- Most reliable method before production deployment
- Output: `dist/` folder with all optimized files

**Option 2: Skip TypeScript checking** (quick local iteration only)
```bash
npx vite build
```
- Builds without strict type validation
- Faster than full build but may miss type issues
- Use only for local testing, never for production
- Output: `dist/` folder

### Build Output Structure

After successful `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html              # Main SPA entry point
├── vite.svg                # Favicon
├── .htaccess               # Apache routing rules for SPA
├── assets/
│   ├── index-[hash].css    # Main stylesheet (Tailwind + App CSS)
│   ├── main-[hash].js      # Main bundle with router and layout
│   ├── chunks/
│   │   ├── u1-vocabulary-[hash].js
│   │   ├── u1-grammar-[hash].js
│   │   ├── u1-reading-[hash].js
│   │   ├── u1-speaking-[hash].js
│   │   ├── u1-listening-[hash].js
│   │   ├── u2-vocabulary-[hash].js
│   │   ├── u2-grammar-[hash].js
│   │   ├── u2-reading-[hash].js
│   │   ├── u2-speaking-[hash].js
│   │   ├── u2-listening-[hash].js
│   │   └── [other lazy-loaded chunks]
│   └── [individual quiz files: vo_01-01-[hash].js, etc.]
└── [other assets: images, fonts, etc.]
```

**Build Statistics (v3.0 - Nov 2025):**
- Total files: 70+
- Total size: 2.5 MB (uncompressed)
- Gzipped size: ~170-180 KB
- JavaScript chunks: 57+ files (main + 15 skill chunks + 57 quiz chunks)
- CSS files: 2 (combined and minified)
- Build time: ~35-40 seconds on standard machine

## Deployment

### FTP Upload Process
1. Build creates optimized files in `dist` folder
2. Upload **contents** of `dist` folder to `/slim/` directory on server:
   - `index.html` (main entry point)
   - `assets/` folder (CSS, JS, images, audio, video)
   - `.htaccess` (Apache routing rules - auto-included)
   - `vite.svg` (favicon)
3. **Optional:** Upload `dist-root-index.html` as `/index.html` at web root (provides branded landing page)
4. See `DEPLOYMENT.md` for detailed FTP instructions and troubleshooting

### Important Deployment Notes
- **Base path configuration**: Critical to set `/slim/` in two places - if they don't match, routing will fail:
  - `vite.config.ts`: `base: '/slim/'`
  - `src/main.tsx`: `<BrowserRouter basename="/slim">`
- **Deploy to `/slim/` folder**: Upload all `dist/` contents to server's `/slim/` directory (not root!)
- **Root landing page**: `dist-root-index.html` provides branded welcome page (upload separately as `/index.html`)
- SPA routing handled by `.htaccess` file (auto-included in build, must be in `/slim/` folder)
- Asset files include cache-busting hashes for better caching
- Total bundle size: ~144 KB (gzipped main bundle + lazy-loaded quiz chunks)

## Quiz Registration Reference

**Location of quiz map:** `src/pages/QuizPage.tsx` (starting at line 4)

**Registration syntax:**
```typescript
const quizMap = {
  'skillCode_unit-lesson': lazy(() => import('../store/u{unit}/{Skill}/{skillCode}_{unit}-{lesson}')),
};
```

**Quiz ID Format:** `{skillCode}_{unitNumber}-{lessonNumber}`
- Example: `vo_02-03` = Vocabulary Unit 2 Lesson 3
- Skill codes: `vo`, `gr`, `re`, `sp`, `li`
- Must match filename exactly

## Common Development Workflows

**Adding a New Quiz (Quick Reference)**
```
1. Choose template from src/store/samples/
2. Create file: src/store/u{unit}/{Skill}/{skillCode}_{unit}-{lesson}.tsx
3. Add entry to quizMap in src/pages/QuizPage.tsx
4. Add content item to corresponding skill page (src/pages/{SkillName}Page.tsx)
5. Test at http://localhost:5173/quiz/{quizId}
6. npm run lint -- --fix to ensure quality
```

**Checking Code Quality Before Commit**
```bash
npm run lint              # Check for linting issues
npm run build             # Full type check + build (REQUIRED before deploy)
npm test                  # Run tests (watch mode)
npx vitest --run          # Run tests once (single run)
```

**Local Build Preview**
```bash
npm run build             # Production build with type checking
npm run preview           # Preview production build locally (on /slim/)
# OR for quick test without type check:
npx vite build && npm run serve
```

## Important Notes

- **100% TypeScript**: All JavaScript files removed - project uses only `.tsx` files
- **Writing Skill Removed**: Project focuses on Vocabulary, Grammar, Reading, Speaking, and Listening
- **TTS Browser Support**: Web Speech API works best in Chrome/Edge (Safari has limited support, Firefox requires user gesture)
- **Resources**: `src/resources/Read_TTS_Highlight_Quiz_Docs.md` contains comprehensive TTS implementation guide
- **Additional Features**:
  - Business calculator in `src/store/plan.tsx`
  - Curriculum carousel at `/curriculum`
  - **My English Companion** at `/companion` - AI-powered avatar for conversational practice
- **Deployment Files**:
  - `DEPLOYMENT.md` - Complete FTP upload guide
  - `DEPLOYMENT_READY.md` - Quick deployment checklist with troubleshooting
  - `FTP_DEPLOYMENT_OVH_GUIDE.md` - Comprehensive OVH deployment guide (v3)
  - `DEPLOYMENT_CHECKLIST.md` - Quick reference checklist
  - `dist-root-index.html` - Optional root landing page

## Troubleshooting Common Issues

**.js Files Appearing in src/ Folder**
- Root cause: Visual Studio or IDE auto-compilation settings
- Solution 1: Ensure `noEmit: true` is set in `tsconfig.json`
- Solution 2: Check IDE settings - disable TypeScript auto-compilation
- Solution 3: `.gitignore` contains `src/**/*.js` to prevent tracking compiled files
- If files persist: Use `git clean -fd` to remove untracked files
- These .js files are safe to delete - they won't affect the build

**Build Fails with TypeScript Errors**
- Use `npm run build` to catch all type errors before deployment
- Fix errors in the source files - they must resolve for production
- If you need quick iteration, use `npx vite build` to skip type checking temporarily
- Always run full `npm run build` before committing or deploying

**Routing Not Working (404 or Blank Page)**
- Verify `basename="/slim"` is set in `src/main.tsx`
- Verify `base: '/slim/'` is set in `vite.config.ts`
- Both must match or routing will fail
- When testing locally with `npm run dev`, routes use `/quiz/` not `/slim/quiz/`

**TTS Not Working**
- Test in Chrome or Edge (best support)
- Check if microphone/audio permissions are blocked
- Ensure `isTtsEnabled` state is true in the component
- Verify voices are loaded: browser console should show voices available
- Test with simple speech first: `window.speechSynthesis.speak(utterance)`

**Quiz Not Loading**
- Verify quiz ID in URL matches entry in `quizMap` in `src/pages/QuizPage.tsx`
- Verify quiz file exists at correct path: `src/store/u{unit}/{Skill}/{quizId}.tsx`
- Check browser console for import errors
- Ensure lazy import syntax is correct: `lazy(() => import('...'))`

**Flashcard Images Not Showing**
- Images must be in `public/assets/images/`
- Image paths in code should use relative paths: `/assets/images/image-name.jpg`
- Vite automatically prefixes with base path (`/slim/`) in production
- In development with `npm run dev`, use same paths (no `/slim/` prefix needed)

**Asset Files Not Found (404 in Production)**
- Build adds hash to filenames: `assets/index-abc123.css`
- Ensure `npm run build` completes successfully before deploying
- Check that all files in `dist/` folder are uploaded to `/slim/` directory
- Verify `.htaccess` file is included in upload (handles SPA routing)

## Expanding Unit 3 (Optional - From 4 to 5 Lessons Per Skill)

**Quick Summary**: Unit 3 currently has 4 quizzes per skill (20 total). Expanding to 5 quizzes per skill (25 total) follows the same pattern:

**Steps to Add 5th Lesson to Each Skill:**
1. Create files: `vo_03-05.tsx`, `gr_03-05.tsx`, `re_03-05.tsx`, `sp_03-05.tsx`, `li_03-05.tsx`
2. Copy content from `_03-04.tsx` files and modify the lesson content
3. Add entries to `quizMap` in `src/pages/QuizPage.tsx` (5 new entries)
4. Add entries to each skill page (`VocabularyPage.tsx`, `GrammarPage.tsx`, etc.)
5. Update `vite.config.ts` manualChunks to include new files:
   ```typescript
   'u3-vocabulary': [...existing, 'src/store/u3/Vocabulary/vo_03-05.tsx'],
   'u3-grammar': [...existing, 'src/store/u3/Grammar/gr_03-05.tsx'],
   // ... repeat for all skills
   ```
6. Test with `npm run dev` and verify all 5 quizzes accessible
7. Run `npm run build` before deploying

**Estimated Time**: 30-45 minutes for experienced developer

## Language & Content Guidelines

⚠️ **ABSOLUTE RULE: English Only - No Other Languages Allowed**

### Never Use:
- ❌ Arabic translations or synonyms
- ❌ Any language other than English
- ❌ Transliteration or code-switching
- ❌ Mixed-language explanations

### Always Use:
- ✅ Simple, basic English explanations
- ✅ Beginner-friendly vocabulary (A1 level)
- ✅ Clear, direct descriptions
- ✅ Contextual examples in English only
- ✅ TTS for pronunciation support (English only)

### Example - Correct Approach:
```typescript
// ✅ CORRECT
{ sideA: "Shirt", sideB: "A piece of clothing worn on the upper body" }

// ❌ WRONG
{ sideA: "Shirt", sideB: "قميص" }
```

## Deployment Versions

### Version 3.0 - Units 1, 2, & 3 (Current Production - LATEST)
**Status:** ✅ **FULLY COMPLETE & IN PRODUCTION**

**Current Build Configuration:**
- **vite.config.ts** optimized with `manualChunks` for all 3 units
- 57 quizzes bundled as separate, lazy-loaded chunks
- U1: 12 quiz files + 5 skill chunks
- U2: 25 quiz files + 5 skill chunks (5 lessons per skill - COMPLETE)
- U3: 20 quiz files + 5 skill chunks (4 lessons per skill - PARTIAL)

**Contents:**
- **Unit 1 (12 exercises):**
  - Vocabulary (4), Grammar (4), Reading (2), Speaking (1), Listening (1)
  - Theme: Introductions & Personal Information

- **Unit 2 (25 exercises) - COMPLETE:**
  - Vocabulary (5), Grammar (5), Reading (5), Speaking (5), Listening (5)
  - Theme: Shopping & Directions (practical, real-world vocabulary)

- **Unit 3 (20 exercises) - PARTIAL:**
  - Vocabulary (4), Grammar (4), Reading (4), Speaking (4), Listening (4)
  - **Expansion Ready:** Template supports easy addition of 5th lesson per skill

**Total: 57 interactive exercises (expandable to 75+ with U3 completion)**

**Build Statistics:**
- **Total Build Size:** ~2.5 MB (uncompressed)
- **Gzipped:** ~170-180 KB (optimized for transfer)
- **Total Files:** 70+ (index.html + 57 JS files + chunks + CSS + assets + .htaccess)
- **JavaScript Files:** 50+ (57 quizzes + chunks + main bundle)
- **CSS Files:** 2 (Tailwind + App CSS)
- **Images:** 13+ flashcard images + 2 branding images
- **Build Time:** ~35-40 seconds

**Production Features:**
- ✅ All 57 quizzes with correct `/slim/` asset paths
- ✅ Complete Unit 2 content with 5 lessons per skill
- ✅ Partial Unit 3 content with 4 lessons per skill (ready for expansion)
- ✅ TTS working across all interactive activities with proper deduplication
- ✅ Proper code splitting with individual skill chunks for fast loading
- ✅ HeyGen avatar centered and prominently sized for MyCompanion feature
- ✅ All skill pages updated with complete content listings
- ✅ Routing: All 57 quizzes registered in QuizPage.tsx with lazy loading
- ✅ .htaccess configured for SPA routing and proper caching
- ✅ Production deployment files ready for OVH FTP upload

**Deployment Status:**
- **Version 3.0 (U1 + U2 + U3):** ✅ Currently deployed and in production
- All flashcard image paths correctly use `/slim/` prefix in production
- TTS fully functional in all modern browsers (Chrome, Edge, Safari, Firefox)
- Unit 3 easily expandable to 5 lessons per skill without architectural changes

### Previous Versions (Archive)

**Version 2.0 - Units 1 & 2 (October 2024)**
- Status: ✅ Previously deployed - now superseded by v3.0
- Contents: 32 quizzes (U1: 12, U2: 20)
- All features preserved in current version

**Version 1.0 - Unit 1 Only (September 2024)**
- Status: ✅ Initial deployment - now superseded by later versions
- Contents: 12 quizzes (U1 only)
- All features preserved in current version
