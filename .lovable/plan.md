## Plan: Symptom-diagnostic redesign of "When to Call Me"

Rebuild `src/components/WhenToCallMe.tsx` to match the selected direction (Symptom diagnostic grid) — keeping all current copy intact in both EN and NL.

### Visual changes
- Wider container (`max-w-5xl`).
- **Symptoms grid**: single bordered, rounded card with `grid grid-cols-3 gap-px` so each cell shares hairline dividers — feels like a diagnostic sheet.
  - Each cell: small uppercase purple label "Symptom 01 / Symptoom 01", bold Poppins trigger text, short yellow underline bar that extends on hover.
  - Subtle hover bg shift on each cell.
- **Summary line** below the grid, with the closing phrase underlined in purple.
- **"Why call me?" panel**: separated into a soft purple-tinted rounded panel (`bg-primary/5`, `border-primary/10`) with a thin divider next to the heading.
  - 2-col grid of cards (card bg, soft border, soft shadow).
  - Each card: round icon badge (alternating primary purple / secondary yellow) + bold differentiator text. Icons from lucide: `Zap`, `Scissors`, `CheckCircle2`, `HandHelping`.

### i18n
Add one new key in both locale files:
- `whenToCallMe.symptomLabel`: `"Symptom"` (EN) / `"Symptoom"` (NL).
Cell label rendered as `{symptomLabel} {01..06}`.

### Files
- `src/components/WhenToCallMe.tsx` — full rewrite of markup as above (framer-motion reveals preserved, semantic tokens only — `bg-card`, `bg-primary`, `text-primary`, `bg-secondary`, `border-border`, `text-muted-foreground`).
- `src/i18n/locales/en.json` — add `symptomLabel`.
- `src/i18n/locales/nl.json` — add `symptomLabel`.

No backend, routing, or other section changes.