

## When to Call Me — Rethink

The current version is a 3x2 grid of small accordion cards. It works but feels cramped and the responses get lost. The content deserves more space and impact — it's the core pitch.

### New Design: Two-Column "Emergency Room" Layout

A bold, structured layout inspired by medical triage / emergency room aesthetics.

**Structure:**
1. **Header** — "When to Call Me" title + the "Emergency Room" subtitle
2. **Scenario List** — Left column shows the 6 scenarios as clickable rows (emoji + keyword + short quote). Clean, scannable.
3. **Response Panel** — Right column (sticky on desktop) shows the selected scenario's full response with Esther's voice. On mobile, it expands inline below the selected row.
4. **"Why Call Me?" Block** — Below the scenarios, a compact 2x2 grid of the 4 differentiators (Doesn't just advise, Cuts through noise, Delivers results, Force multiplier)

### Detailed Changes in `WhenToCallMe.tsx`

**Updated scenarios data** — Use the fuller response text from the brief (e.g., "Cut the crap and finish it. I'll dive in, identify the real blockers, and drive it to completion. No more excuses.")

**Layout:**
- Desktop: `grid-cols-[1fr_1fr]` — left is the scenario list, right is the response panel
- Mobile: single column, response expands inline under selected scenario
- Scenario rows: horizontal layout with emoji, keyword bold, quote as subtitle. Click to select.
- Response panel: large text, keyword as heading, response as body. Smooth `AnimatePresence` transition.

**"Why Call Me?" section** — 4 compact items below in a 2x2 grid:
- "Doesn't just advise, does."
- "Cuts through the noise."
- "Delivers results, not reports."
- "Your personal force multiplier."

### Files
- `src/components/WhenToCallMe.tsx` — full rewrite

No changes to `Index.tsx` or other files.

