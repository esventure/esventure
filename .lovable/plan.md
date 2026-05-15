## The problem

The current "When to Call Me" section shows 6 scenario cards on the left + a sticky response panel on the right. Eyes don't know where to land: emojis, bold keywords, descriptions, AND a duplicate panel all compete at once. It's visually noisy and the split layout doubles the cognitive load.

## Three directions to choose from

### Option A — Quiet accordion list

A single centered column. Each scenario is one clean row: emoji + keyword. Click to expand → the symptom and Esther's response slide open inline. Only one open at a time.

- One thing to look at, top to bottom
- No duplicate sticky panel
- Feels editorial, calm, confident
- Closest to the rest of the one-pager rhythm

### Option B — Symptom → Fix pairs

Drop the interaction entirely. Show all 6 as a 2-column grid of compact cards. Each card has the emoji + keyword on top, the symptom in muted text, then a thin divider, then Esther's response in foreground text below.

- Everything visible, no clicking
- Reads like a menu of "if this, then that"
- Denser but flat hierarchy = easier to scan
- Best if Esther wants visitors to absorb everything without interaction

### Option C — Single rotating spotlight

One large card center stage showing one scenario at a time (emoji, keyword, symptom, response). Small dot navigation + auto-rotate every 6s, pause on hover. Six dots underneath.

- Maximum focus — only one thing on screen
- Feels premium / story-like
- Risk: visitors may not realize there are 6 (mitigated by dots + subtle "1 / 6" counter)

## Recommendation

**Option A (accordion)** — best balance of calm + discoverable. Matches the existing "sticky stacking" rhythm of the page and removes the duplicate panel that's causing most of the noise.

## Files to touch

- `src/components/WhenToCallMe.tsx` — rewrite the layout; keep the `scenarios` data and "Why Call Me?" block untouched
- No changes to copy, colors, tokens, or other sections

Which direction should I build?
