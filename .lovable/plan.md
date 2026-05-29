## Plan: Bilingual site (EN/NL) with language toggle

### Approach
Use `react-i18next` (lightweight, standard) with two translation JSON files. A small toggle in the navigation (EN | NL) switches language instantly. Selected language is persisted in `localStorage` and reflected in the `<html lang>` attribute for SEO.

### Steps

1. **Install i18n**
   - Add `react-i18next` and `i18next` (+ `i18next-browser-languagedetector` to auto-pick browser language on first visit).

2. **Set up i18n config**
   - `src/i18n/index.ts` — initialize i18next with EN as fallback, detect from localStorage → browser.
   - `src/i18n/locales/en.json` and `src/i18n/locales/nl.json` — all UI strings, organized by section (nav, hero, services, whenToCallMe, effect, planner, footer, cookie, privacy, common).
   - Import once in `src/main.tsx`.

3. **Translate every visible component**
   - `Navigation`, `Hero`, `Services`, `WhenToCallMe`, `EsVentureEffect` / worked-with bar, `ProjectPlanner` (form labels, placeholders, step indicator, disclaimer, result section labels), `Footer`, `CookieConsent`, `NotFound`, `PrivacyPolicy`, `StyleGuide` headers where user-facing.
   - Replace hardcoded strings with `t('section.key')`.

4. **Language toggle UI**
   - Small `LanguageToggle` component (EN | NL pill) in `Navigation.tsx` desktop + mobile menu.
   - On click: `i18n.changeLanguage(...)`, save to localStorage, update `document.documentElement.lang`.

5. **AI output language (Project Planner)**
   - Pass current language to the `project-outline` edge function in the request body.
   - In `supabase/functions/project-outline/index.ts`, append an instruction to the system prompt: respond in Dutch when `language === 'nl'`, keep all structure/voice rules identical.
   - Email notification subject/body stays in English (internal).

6. **SEO / meta**
   - Update `index.html` `<html lang>` default stays `en`; runtime updates via toggle.
   - Keep Open Graph copy in English (primary audience). NL toggle is for site visitors.

### Out of scope
- Separate `/nl` URL routing (single-page toggle only).
- Translating internal admin emails sent to Esther.
- Translating Privacy Policy legal text — will be translated to NL but kept structurally identical.

### Result
A single EN/NL toggle in the nav. Every visible string, including the AI-generated project outline, responds in the chosen language. Preference persists across sessions.