# Diagnosis – npm run dev failure (Feb 25, 2026)

## Environment snapshot
- Shell: PowerShell on Windows; cwd `C:\Users\asus\fra1a2`
- Node: v22.13.0 (`node -v`)
- Tooling: Vite 6.2.0, esbuild 0.25.11, React 18 (per package.json)
- Git status reports permission warning reading `C:\Users\asus\.config\git\ignore` (hinting at ACL issues)

## What fails
Running `npm run dev` ends with Vite aborting before serving:
```
Test-Path : Accès refusé ... npm.ps1:21
failed to load config from C:\Users\asus\fra1a2\vite.config.ts
Error: spawn EPERM
    at ensureServiceIsRunning (node_modules/esbuild/lib/main.js:1978)
```
The EPERM occurs while Vite asks esbuild to start its service to bundle the config.

## Reproduction drills
- Minimal child-process spawn fails when stdio defaults to pipes:
  - `node -e "require('child_process').spawn('cmd',['/c','echo','hi']);"` → `Error: spawn EPERM`
  - `node -e "require('esbuild').build({entryPoints:['src/main.tsx'], bundle:true, write:false})"` → `Error: spawn EPERM`
- The same executables work when pipes are not created:
  - `node -e "const {spawn}=require('child_process'); spawn('cmd',['/c','echo','hi'], {stdio:'inherit'});"` ✅
  - `node node_modules/esbuild/bin/esbuild --version` ✅ (esbuild CLI uses inherited stdio)
- Accessing `C:\Users\asus\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js` throws `Access denied`, and `Get-Acl` on that path fails.

## Findings
- Node is blocked from creating the default pipe-based stdio handles for child processes (returns EPERM). Vite/esbuild rely on these pipes, so esbuild cannot start and `npm run dev` stops before loading project code.
- Multiple permission errors under the user profile (`AppData\Roaming\npm`, `.config\git\ignore`) point to ACL or security software restrictions rather than application code bugs. The project files (e.g., `vite.config.ts`) are not the root cause.

## Recommended fixes / next steps
1) Repair user-folder permissions (elevated PowerShell)
   - `icacls "C:\Users\asus\AppData\Roaming\npm" /grant asus:F /T /C`
   - `icacls "C:\Users\asus\.config" /grant asus:F /T /C`
   - If the npm global folder stays broken, reinstall Node.js/NPM to recreate it cleanly.
2) Check security/AV policies
   - Controlled Folder Access or endpoint protection may block anonymous pipe creation. Temporarily disable or whitelist `node.exe` and `node_modules\@esbuild\win32-x64\esbuild.exe`.
3) Re-test after permission fix
   - `node -e "require('child_process').spawn('cmd',['/c','echo','ok']);"` (should succeed without specifying `stdio`)
 - `node -e "require('esbuild').build({entryPoints:['src/main.tsx'], bundle:true, write:false})"`
  - `npm run dev`
4) If local policy cannot be changed, run the project in an environment that allows pipes (e.g., a different user profile, WSL, or a VM).

## Actions taken (Feb 25, 2026)
- Attempted to grant Full Control on `C:\Users\asus\AppData\Roaming\npm` using `icacls ... /grant asus:F /T /C` from elevated PowerShell: still returned "Accès refusé" on the directory.
- Attempted to take ownership of `C:\Users\asus\AppData\Roaming\npm` via `takeown /F ... /R /D O`: blocked with "Accès refusé".
- Granted Full Control on `C:\Users\asus\.config` using `icacls ... /grant asus:F /T /C` (794 files processed, no failures).
- Re-tested minimal spawn (`node -e "require('child_process').spawn('cmd',['/c','echo','ok']);"`): still fails with `Error: spawn EPERM`.
- Re-tested esbuild programmatic build: `Error: spawn EPERM` persists when starting esbuild service.
- Re-ran `npm run dev`: same access denied to `npm-cli.js` followed by esbuild `spawn EPERM`; no change in behavior.
- Tried granting Full Control on `C:\Users\asus\AppData\Roaming\npm\node_modules` via `icacls ... /grant asus:F /T /C`: access denied (0 files processed).
- Tried overriding `NPM_PREFIX_NPM_CLI_JS` to point to `C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js` before `npm run dev`: script still hits the locked AppData path and ends with `spawn EPERM`.
- Created local prefix folder `.npm-global`, ran `npm run dev` with `NPM_CONFIG_PREFIX` pointing there: AppData access error gone, but esbuild still fails with `spawn EPERM`.
- Implemented global French TTS guard (Feb 25, 2026):
  - Added `src/lib/tts.ts` to set `SpeechSynthesisUtterance.lang = 'fr-FR'` and auto-pick a French voice, wrapping `speechSynthesis.speak` so all existing TTS uses French pronunciation.
  - Initialized the guard in `src/main.tsx`.
  - Expected output: all UI text-to-speech now pronounces the translated French content with a French voice/accent without per-component changes.
- Completed French translation of the "Compréhension orale" area:
  - Converted the Listening Comprehension test UI, PDF labels, and its 20 question items (text, audio prompts, options) in src/store/Test.tsx to French.
  - Localized the Present Progressive listening quiz in src/store/u2/Listening/li_02-05.tsx (prompts, feedback, buttons, TTS language). Expected outcome: all listening comprehension flows display and read French content consistently.
- Removed broken Unit 2 dialogue speaking lesson:
  - Deleted `src/store/u2/Speaking/sp_02-03.tsx`.
  - Dropped its routing/links from `src/pages/QuizPage.tsx` and `src/pages/SpeakingPage.tsx` to avoid dead entries until a French version is rebuilt.
- French speaking updates (Unit 2):
  - Translated `sp_02-01.tsx`, `sp_02-02.tsx`, `sp_02-04.tsx`, `sp_02-05.tsx` to French and set TTS to `fr-FR`; adjusted UI labels, prompts, and practice tips accordingly.

## Actions taken (Feb 26, 2026)
- Completed French translation of remaining Listening (Compréhension orale) pages:
  - Unit 2 Listening lessons `li_02-01.tsx` through `li_02-04.tsx`: translated questions, options, audio prompts, UI labels, and progress/score text; set TTS lang to `fr-FR`.
  - Unit 3 Listening lessons `li_03-01.tsx` through `li_03-04.tsx`: translated transcripts, questions, explanations, UI labels, and results copy; set TTS lang to `fr-FR`.
- Localized common UI labels in those pages (play audio, instructions, previous/next, score, results, show/hide transcript) to French.
- Cleaned UI strings in those listening pages to remove garbled emoji/arrow/checkmark characters for consistent ASCII display.
- Reviewed root documentation file `DEPLOYMENT.md`: identified mojibake in box-drawing and checkmark/cross glyphs (encoding artifacts).
- Localized `src/store/Review/ListeningActivityGame.tsx`: replaced remaining English UI (Next Level) with French, removed garbled emoji/arrow text, and normalized tips copy to ASCII-only French.
- Cleaned `DEPLOYMENT.md`: replaced mojibake box-drawing/checkmark glyphs with ASCII equivalents and rebuilt the dist folder tree to a readable ASCII layout.
- Normalized remaining listening UI strings:
  - Replaced residual "Correct !" feedback with "Bonne reponse !" in Unit 2/3 listening lessons.
  - Rebuilt `li_02-05.tsx` (present progressif listening) with fully ASCII French strings and corrected feedback/results copy.
  - Localized `src/store/samples/TextInputQuizWithHints.tsx` to French, switched TTS to `fr-FR`, and removed emoji/arrow glyphs in UI labels/buttons.
- Converted `src/store/Test.tsx` to ASCII-only French by stripping accents and smart punctuation for consistency.
- Ran a static scan on listening-related files: no remaining non-ASCII characters detected; only benign English keyword hits (e.g., "Score" labels and lucide icon names) remain.
- Updated `src/store/Test.tsx` to use French punctuation for "Score :".
- New issue reported: `/quiz/li_03-03` fails with Vite 500 on dynamic import. File `src/store/u3/Listening/li_03-03.tsx` appears syntactically valid and ASCII-only; recommended clearing Vite cache and checking dev server logs for the exact transform error.
- Cleared Vite cache by removing `node_modules/.vite` to address the `/quiz/li_03-03` dynamic import 500.
- Attempted `npm run dev -- --force` after cache clear: still fails with Access denied on `C:\Users\asus\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js` and esbuild `spawn EPERM`, so the dev server does not start.
- User reports the permission issues are now fixed (pending re-test).
- Removed `/slim` base usage to stop root redirecting to `/slim`:
  - Set Vite `base` to `/` in `vite.config.ts`.
  - Updated `.htaccess` RewriteBase to `/` in `public/.htaccess` and `dist/.htaccess`.
  - Replaced `/slim/assets/` with `/assets/` in source asset references.
  - Updated landing pages (`public/index.html`, `dist-root-index.html`) to point to `/` and `/assets/`.

## Remaining
- Optional: run a final pass if you want to keep accents (otherwise all listening-related files are now ASCII-only).
- Awaiting dev server error output for the li_03-03 dynamic import failure (to pinpoint the exact transform error).
- Translation work remaining; deferred to a later session per user.
