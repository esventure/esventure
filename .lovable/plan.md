

# Es Venture Full Website Revamp

A comprehensive revamp touching structure, content, service model, and the AI project planner — while keeping the design system (colors, fonts, animations, layout patterns) intact.

## What's changing and why

The current site positions Esther as a service provider with three specific skills (project management, UX prototyping, process design). The new brand positions her as a **personal partner and fixer** who solves any problem — three new service categories that are broader and more client-outcome-focused.

---

## 1. Hero Section
**Current**: "I help teams move forward, let's go." + skill-based arrows (prototypes, workflows, steps)
**New**:
- Headline: **"I'm the partner who makes your business move."** + "let's go." accent
- Subtext: "I cut through the noise, jump in fast, and turn chaos into action."
- Arrows reframed around outcomes: Stalled projects → finished deliverables / Complex problems → simple steps / Big ideas → real results

## 2. Es Venture Effect Bubbles
**Current**: Simple Communication / People-Friendly Leadership / Pushing Forward
**New** (aligns with key messaging pillars):
- **Momentum & Clarity** (🚀) — "I cut through the noise and turn your biggest headaches into clear, actionable steps."
- **Your Trusted Partner** (🤝) — "I jump into your world and get things done with a personal touch. Quick win or ongoing adventure — I'm all in."
- **High-Leverage Execution** (⚡) — "From big-picture strategy to nitty-gritty details, nothing falls through the cracks when I'm on the case."
- Subtitle updated: keep "Your project's personal caffeine shot."

## 3. Services Section — Full Restructure
**Current 3 cards**: Let's fix it (PM) / Let's prototype (UX) / Let's streamline (Process)
**New 3 cards** with new names, badges, descriptions, icons, and "What you get" boxes:

| | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| **Badge** | Hands-On Support | Strategic Clarity | Rapid Solutions |
| **Title** | Let's Make It Happen | Your Clear Path Forward | Quick Fixes & Fast Starts |
| **Description** | I step in and take charge. Whether it's leading a big project, unblocking something that's stuck, or being that extra pair of hands to get urgent tasks over the finish line. | Got a big vision but no clear map? I translate high-level ideas into concrete, actionable plans. No more ideas gathering dust — we'll make them happen. | When things hit the fan, I'm your person. I quickly diagnose urgent issues and deliver tangible solutions — from critical user flows to clickable prototypes. |
| **What you get** | Hands-on support and leadership so you can focus on what you do best. | Complex problems turned into simple steps, strategy that's not just planned but executed. | Fast solutions and working prototypes that get you unstuck, so you can breathe easier. |

**ServiceIcons.tsx**: Rename icon exports to match new services (MakeItHappenIcon, ClearPathIcon, QuickFixIcon). Reuse existing SVG shapes with new semantic names.

## 4. About Me Section
**Current**: Generic "product enthusiast, UX thinker, fan of structure" copy
**New**:
- P1: "Hey, I'm Esther! Part product nerd, part UX thinker, full-time structure enthusiast, and your go-to partner for getting things done."
- P2: "I jump into any challenge, learn it fast, and make things happen. No fluff, no 70-page documents — just practical solutions that make life easier."
- P3: "Whether it's a messy process, an undefined project, or a critical gap — doesn't matter. I'm here to fix it, streamline it, or build it. Whatever it takes."
- P4 (bold): "Think of me as your project's personal caffeine shot. Let's go."

## 5. Contact/CTA Section
**Current**: "Ready for an Es Venture?"
**New**: "Ready to move forward?" + "Let's go." accent + "What's the one thing you wish you could get off your plate? Let's talk."

## 6. Floating CTA Button
**Current**: "Got a project in mind?"
**New**: "What's on your plate?" (shorter, more inviting, matches new CTA language)

## 7. Navigation
Update "Let's Talk" button text — keep as-is or change to "Let's Go". Nav links stay the same (Services, Projects, About).

## 8. ProjectPlanner.tsx — Placeholders Revamp
**SITUATION_PLACEHOLDERS** (10 new ones matching the brief's CTA questions):
- "There's a project stuck and no one owns it."
- "Our process is causing headaches and slowing everyone down."
- "I have a big idea but no clue where to start."
- "We keep talking but nothing actually moves forward."
- "There's a critical gap and no one to fill it."
- etc.

**HANDOFF_PLACEHOLDERS** (10 new ones matching new services):
- "Step in and take charge of this project."
- "Turn my vision into an actionable plan."
- "Diagnose this issue fast and give me a working fix."
- "Unblock my team so we can start shipping."
- "Build me a prototype I can test and pitch."
- etc.

Form labels stay as-is (they work well with the new tone).

## 9. Edge Function — Service Name Update
**`supabase/functions/project-outline/index.ts`**: Major update to align with new service model.

- **Keyword arrays**: Rename/reorganize to match new 3 services:
  - `STRUCTURE_KEYWORDS` → `CLEAR_PATH_KEYWORDS` (Strategic Clarity)
  - `MOMENTUM_KEYWORDS` → `MAKE_IT_HAPPEN_KEYWORDS` (Hands-On Support)
  - `PROTOTYPE_KEYWORDS` → `QUICK_FIX_KEYWORDS` (Rapid Solutions — now broader than just prototypes, includes quick diagnoses and fast fixes)
- **`detectSupportType()`**: Update return values to `'make-it-happen' | 'clear-path' | 'quick-fix'`
- **System prompt**: Update Esther's voice to match the new energetic, personal, "fixer" tone from the brief. Reference new service names in the prompt so AI-generated plans align.
- **Approach guidance functions**: Update step descriptions to reference new service framing.

## 10. Recent Projects Carousel
Keep project data as-is but update category badges to match new service names:
- "Project management" → "Let's Make It Happen"
- "UX/UI Design" → "Quick Fixes & Fast Starts"
- "Process design" → "Your Clear Path Forward"

---

## Files Modified

| File | Scope |
|------|-------|
| `src/pages/Index.tsx` | Hero copy, bubble content, service cards (names/badges/descriptions/icons), about text, contact CTA, floating button text, project category badges |
| `src/components/ServiceIcons.tsx` | Rename exports to match new services, keep SVG shapes |
| `src/components/ProjectPlanner.tsx` | All 10 situation placeholders, all 10 handoff placeholders |
| `supabase/functions/project-outline/index.ts` | Keyword arrays, support type detection, system prompt, approach guidance, walk-away guidance |

## What stays the same
- All colors, fonts, layout grid, animations, design tokens
- Logo slider, carousel mechanics, footer
- Navigation structure and scroll behavior
- Contact form in ProjectPlanner (submit-contact edge function)
- Database schema, RLS, all backend infrastructure
- All images and assets

