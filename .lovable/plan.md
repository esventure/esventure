# Creative digital boutique upgrade

A visual maturity pass across the whole homepage. Purple, yellow, the logo, Esther's photos, all copy, the navigation structure, the planner form, and the section order stay exactly as they are. This is restyling, not restructuring.

## 1. Typography contrast

- Display font becomes **Syne** (ExtraBold/Black) for H1 and H2. Body, labels, navigation, and captions move to **Plus Jakarta Sans** - clean, geometric, precise.
- Section labels ("Scenario 01", "01 The Driver", "Worked with") get the body font: small, uppercase, wide letter-spacing.
- Yellow is limited to one word per headline. Where a section currently has yellow on several elements at once, it is reduced to the single headline word plus hover states.

## 2. Colour rhythm

Three alternating zones instead of a continuous purple wash:

```text
Purple hero  ->  Dark "When to call me" / "How I help"  ->  White About + Sparring
->  Purple CTA  ->  Dark footer
```

- New charcoal token (#1A1A1A) and warm off-white token (#F9F7F4) added to the design system so sections can switch zones cleanly in both languages and print.
- Yellow appears only as: one headline word, hover states, and the primary button on dark backgrounds.

## 3. Editorial layout

**Hero**
- Esther's photo bleeds to the right edge of the screen - no box, no border, no shadow frame - and overlaps the text column slightly at the bottom on desktop.
- Headline scaled up 20-30% so it feels almost uncomfortably large on desktop, with generous vertical padding.

**How I Help**
- The four tilted cards are replaced by an asymmetric numbered editorial list: huge 01-04 in the display font, service name on the same line, description below in small body type.
- Each row highlights on hover (background shift plus underline animation).

**When to Call Me**
- The uniform 2x3 grid becomes a staggered, art-directed layout: alternating left/right alignment on desktop, horizontal snap-scroll on mobile.

**All sections**
- Section padding increased by roughly 50%.
- Thin 1px rules at 20% opacity between major sections instead of extra colour blocks.

## 4. Photography treatment

- Hero: container removed, full bleed as above.
- About: subtle purple overlay at 15-20% on the black-and-white photo.
- Note for later: new photography should be shot on a dark or deep-coloured background, since the current yellow backdrop competes with the purple.

## 5. Craft details

1. **Custom cursor** - default cursor hidden on desktop pointer devices, replaced by an 8px yellow dot that follows the mouse and expands to 24px over links and buttons. Disabled on touch devices and when the visitor has reduced-motion enabled, and the native cursor is kept inside form fields so the planner stays comfortable to type in.
2. **Marquee strip** - slow horizontal ticker between How I Help and the sparring section: Strategy / Delivery / Web / Brand / Process / AI / Brief to Shipped, repeating. Charcoal background, small uppercase body font, yellow text. Pauses for reduced-motion users.
3. **Scroll-triggered headlines** - every H1 and H2 fades up (20px, 0.5s ease) on entering view.
4. **Counting numbers** - section numerals count 00 to their value over 0.8s when they enter the viewport.
5. **Navigation transition** - transparent over the purple hero, solidifying to charcoal once scrolled past it.
6. **Service hover outcome lines** - each service row reveals a one-line outcome on hover. No lines were supplied, so I will write four short drafts in both languages, clearly generic and easy for Esther to replace (e.g. "From brief to live in six weeks"). Say the word and I will leave the hover line out instead.

## 6. Footer

- Charcoal background.
- Tagline "Whatever it is - if it's digital, I've got it." added as the first element at H2 size in the display font, full width, above the contact details.
- All existing links and contact details kept.
- Small "© Es Venture 2025 - Amsterdam" line at the very bottom in the body font.

## Technical notes

- Fonts swapped in `index.html` (Google Fonts) and mapped in `tailwind.config.ts`; `font-poppins` usages migrate to a `font-display` utility so the display face can be changed in one place later.
- New `--charcoal` / `--surface-warm` HSL tokens in `src/index.css`, plus reusable section-zone and hairline-rule classes. No hardcoded hex in components.
- Files touched: `src/index.css`, `tailwind.config.ts`, `index.html`, `src/pages/Index.tsx`, `src/components/Navigation.tsx`, `src/components/WhenToCallMe.tsx`, `src/components/services/ServicesWorkbench.tsx` (rewritten as the editorial list), plus new `CustomCursor.tsx`, `Marquee.tsx`, `CountUpNumber.tsx`, and `SectionRule.tsx`.
- `ProjectPlanner.tsx` logic is untouched; only its section wrapper picks up the new zone colour and padding.
- Marquee terms and the new footer/hover strings are added to `en.json` and `nl.json` so the language toggle stays in sync. Hyphens only, no em dashes.
- Both breakpoints checked in the preview after the pass, including the mobile scroll behaviour of the staggered scenarios.
