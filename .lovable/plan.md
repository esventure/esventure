## New iconography style

A quick scan of the codebase: the only custom hand-drawn icons live in `src/components/ServiceIcons.tsx` (the 4 service cards). `WhenToCallMe` and `ProjectPlanner` use generic lucide icons (arrows, checks, loaders) that should stay as they are — replacing those would hurt usability. So "everything custom" effectively means the 4 service icons.

## New style

Inspired by the reference: solid filled silhouettes with thin white interior cut-outs that add detail without losing the bold mass.

- **Fill**: brand purple (#BF5AF2)
- **Inner detail lines**: white, hairline (~1.5px), used sparingly to suggest form
- **Background chip**: soft yellow circle (existing pastel-yellow treatment) — kept as-is so the style change reads clearly against the cards
- **Canvas**: 32×32 viewBox, slightly rounded corners on shape edges, no outlines, no strokes on the silhouette itself

## The 4 new icons (concepts)

Staying abstract and conceptual (not literal objects), translated into the silhouette language:

1. **Fixer — Get It Moving**: A solid chunky arrow-block (rounded rectangle pushed into a wedge tip) with two thin white motion slits cut through the back half. Reads as mass in motion.
2. **Sparring — Think It Through**: Two solid facing half-discs with a small 4-point star cut out (white) in the gap between them. Dialogue + spark, all in filled form.
3. **Map — Make It Flow**: A solid organic blob on the left tapering into a thick flowing ribbon that ends in a filled dot. A single hairline white line traces the path through the middle. Chaos resolving into flow.
4. **Mirror — Make It Yours**: A solid rounded-square frame (filled, slightly tilted) with a white sparkle/star cut out of the center. Identity reflected back.

## Files to change

- `src/components/ServiceIcons.tsx` — rewrite all 4 icons as filled `<path>` shapes with `fill="currentColor"` and small white inner cut-outs (using `fill="white"` or even-odd fill rules)
- `src/pages/Index.tsx` — no logic changes; only verify the icon background chip stays soft yellow and `text-primary` is applied
- `src/pages/StyleGuide.tsx` — the icons render automatically via the same imports; no edit needed unless background chips need adjusting

## Out of scope

- Lucide functional icons in Planner / WTCM / nav
- Card layout, copy, "Let's…" voice, yellow outcome boxes
- Any other section
