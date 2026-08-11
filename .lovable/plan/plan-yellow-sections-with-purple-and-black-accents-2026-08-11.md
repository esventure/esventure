# Plan: Yellow sections with purple and black accents

## Goal
Shift the `When to Call Me` and `How I Help` sections from dark/intense backgrounds to a bright yellow background, using purple and black as highlights and accents. Keep the existing typography, layout, and motion intact.

## What will change

### 1. Color tokens (src/index.css + tailwind.config.ts)
- Add a semantic yellow section token: `--section-yellow` mapped to the existing secondary yellow value (HSL 62 70% 82%) so it reads as a background color rather than a button color.
- Add a matching foreground token for black text on yellow: `--section-yellow-foreground` near black (HSL 0 0% 10%).
- Expose it in Tailwind as `section-yellow`.

### 2. When to Call Me (src/components/WhenToCallMe.tsx)
- Change section background from `bg-surface-warm` to `bg-section-yellow`.
- Change all text/border colors from `surface-warm-foreground` to `section-yellow-foreground`.
- Keep accent elements in purple (`primary`) and add black accents where appropriate:
  - Scenario labels and eyebrow text in black/70%.
  - Scenario numbers in black/25% that transition to `primary` on hover.
  - Underline bars in `primary` (purple) on hover.
  - Divider lines in black/20%.
  - Benefit icons in `primary` (purple).

### 3. How I Help (src/components/services/ServicesWorkbench.tsx)
- Change section background from `bg-anchor` to `bg-section-yellow`.
- Change all text/border colors from `anchor-foreground` to `section-yellow-foreground`.
- Update the sparkle texture to purple-tinted glows (subtle radial blurs in `primary/20`) instead of the current deep-purple sheen.
- Update service number watermark from black/30% to purple/30%, with the title underline hover in `primary` (purple) and the outcome label in black/80%.
- Keep the CTA button as a black-outlined button on yellow (or secondary yellow if it provides better contrast) with purple hover fill.

### 4. Navigation (src/components/Navigation.tsx)
- Add a new nav zone `"yellow"` with a transparent/warm-blur background and dark text/logo.
- Map `when-to-call` and `how-i-help` to the new `"yellow"` zone.
- Ensure the existing `light`, `dark`, and `purple` zones remain unchanged.

### 5. Marquee (src/components/Marquee.tsx)
- Verify the marquee between the two yellow sections still works visually. If it currently uses a purple background, it will act as a strong separator between the yellow sections and can stay as is. If it shares a yellow background, it will be adjusted to use the same `section-yellow` token.

## Out of scope
- No copy changes.
- No layout grid changes beyond color swaps.
- No new animations or components.
- No changes to the Hero, About, Sparring, Effect, Planner, or Contact sections.

## Verification
- Build the project to confirm no class-name errors.
- Visually check the two sections in the preview for contrast and that the nav correctly switches to the yellow-zone style.
