## Goal

Reposition the homepage to make it crystal clear within 3 seconds that Esther is a **creative digital project manager / digital fixer / sparring partner** who bridges IT and business, rescues stuck projects, and builds prototypes & websites — while preserving the existing branding (purple/yellow, Poppins/Nunito Sans, collapsible stack layout).

## Proposed new page structure

```text
1. Hero  — sharper positioning + clear CTA
2. When to Call Me  — (kept, lightly retuned to match new pillars)
3. How I Help  — expanded from 3 → 4 services (adds Web Development, sharpens PM)
4. Sparring Partner callout  — NEW lower-barrier entry point
5. The Es Venture Effect  — pillars reframed (Clarity / Bridge / Delivery)
6. About Me  — NEW: confident "fixer" narrative, replaces generalist framing
7. Project Planner  — retitled + adds follow-up CTA after AI plan
8. Contact CTA  — (kept)
9. Footer  — (kept)
```

## Section-by-section changes

### 1. Hero (`Index.tsx`)
- **Headline:** "Your digital fixer & creative sparring partner." with "Let's get it done." as accent in secondary yellow.
- **Subline:** "I'm a creative digital project manager who connects the dots between IT and your business — rescuing stuck projects, untangling messy processes, and shipping prototypes and websites that actually work."
- **Bullets** (new mini-list under subline):
  - Stuck project? I take it over and drive it to the finish line.
  - IT and business disconnected? I translate and align.
  - Got an idea? I build the prototype and the website.
- **CTA:** "Tell me what's broken" (primary, scrolls to planner) + secondary "Book a call".
- Collapsible title becomes: "👋 Your digital fixer & sparring partner".

### 3. How I Help — add a 4th service card
Switch grid to `md:grid-cols-2 lg:grid-cols-4`. Update copy:
- **The Engine — Let's Fix It** (Project Management): rewritten to emphasize taking over stuck projects + bridging IT/business.
- **The Roadmap — Your Clear Path Forward** (kept, light edit).
- **The Spark — Quick Fixes & Fast Starts** (kept).
- **The Build — Let's Ship It** *(NEW)*: web development & prototypes — landing pages, working products, design-to-live.

### 4. Sparring Partner callout (NEW section/component)
Full-width band on `bg-secondary` (yellow) with dark text for contrast.
- Heading: "Need a sparring partner?"
- Body: "Sometimes the brief doesn't exist yet — you just need someone experienced to think it through with. Book a sparring session to challenge assumptions, structure your ideas, and define a clear direction before the real work begins."
- CTA button: "Book a sparring session" → calendar link.
- New collapsible entry: "🧠 Need a sparring partner?".

### 5. The Es Venture Effect — reframed pillars
Replace single quote-only block with **3 pillar cards** above the testimonial + client logos:
1. **Absolute Clarity** — you'll always know exactly where the project stands.
2. **Bridging IT & Business** — I translate between developers and decision-makers.
3. **Driving to Delivery** — projects don't drift; they ship.

Keep the testimonial and the auto-scrolling client logo strip beneath.

### 6. About Me (NEW section)
Two-column layout: portrait (`estherPhone` or `estherYellow`) + narrative.
- Heading: "Hello, I'm Esther."
- Body: confident fixer narrative from the report (bridges IT and the rest of the org, rough ideas → working prototypes & live sites, action over reports).
- Inline CTA: "Let's talk" → mailto.
- Collapsible: "👤 About me".

### 7. Project Planner
- Section heading inside `ProjectPlanner.tsx`: "Describe your situation, and I'll show you how we can fix it."
- After the AI generates a plan, render a prominent CTA: **"This looks like a solid plan — let's discuss it"** linking to `mailto:` (or calendar). Requires a small change in `ProjectPlanner.tsx` to show the CTA when a result is present.

## Files to change

- `src/pages/Index.tsx` — hero copy + CTA, add 4th service, add Sparring Partner section, add About Me section, reframe Effect section with pillar cards, reorder collapsible stack.
- `src/components/ServiceIcons.tsx` — add a new `BuildIcon` (e.g. browser-window / code-bracket glyph) for "The Build".
- `src/components/ProjectPlanner.tsx` — update heading + add post-result CTA button.
- *(Optional, if extracted for tidiness)* `src/components/SparringPartner.tsx` and `src/components/AboutMe.tsx` as small new presentational components.

## Out of scope
- No backend, schema, or analytics changes (existing `analytics.ctaClick` calls reused for new buttons).
- Keep current visual language, tokens, fonts, animations. No new colors.
- Translations / i18n unchanged (English copy).
