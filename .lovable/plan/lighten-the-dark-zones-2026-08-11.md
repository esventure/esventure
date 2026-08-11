# Lighten the dark zones

Replace the heavy near-black charcoal sections with a warmer, more energetic rhythm: purple hero, warm white scenarios, one deep-purple anchor for services, and a vibrant purple footer.

## 1. Colour zone changes

- **Hero**: keep the existing purple (#BF5AF2) full-bleed treatment.
- **When to Call Me**: flip from charcoal to warm off-white (#F9F7F4). Keep the staggered editorial layout and scenario styling, but switch to dark text on light. Yellow hover accents stay, or become purple accents where they read better.
- **How I Help**: this becomes the single dark/purple anchor section. Background changes from charcoal to a deep plum/purple (e.g. #1a0f2e) that feels rich and sparkly rather than flat black. Text becomes white/light for strong contrast.
- **Marquee**: change from charcoal to purple (#BF5AF2) with yellow text, turning it into a sparkly horizontal accent strip.
- **About, Effect/logos, Planner**: keep on warm white (#F9F7F4) light backgrounds.
- **Footer**: transform into a vibrant purple accent block (#BF5AF2) with yellow/white text and links, closing the page on a high-energy note.

## 2. Contrast and readability

- Audit all text on the deep-purple anchor to ensure strong contrast. The current grey-on-charcoal is too low.
- Ensure service numerals, headings, and body text on the anchor read clearly in white/light tones.
- Keep the hairline dividers visible but subtle on the new backgrounds.

## 3. Navigation

- Update the scroll-based navigation transition so the header adapts correctly across the new zone sequence:
  - Transparent/light text over the purple hero.
  - Dark text and logo over warm white sections.
  - Light text over the deep-purple anchor.
  - Light text over the purple footer.
- Keep the mobile menu behaviour consistent with the new colours.

## 4. Texture and sparkle

- Add a subtle purple gradient or fine noise overlay to the deep-purple anchor section so it feels alive rather than flat.
- Keep the yellow dot custom cursor as-is.
- Keep the scroll-triggered fade-up and count-up animations.

## 5. Files to touch

- `src/index.css`: add a deep-purple anchor token and adjust warm-white/zone utilities if needed.
- `tailwind.config.ts`: extend colours with the new deep-purple anchor token.
- `src/components/WhenToCallMe.tsx`: switch background to warm white, update text and hover colours.
- `src/components/services/ServicesWorkbench.tsx`: switch background to deep-purple anchor, improve text contrast, add subtle texture.
- `src/components/Marquee.tsx`: switch background to purple, text to yellow.
- `src/components/Navigation.tsx`: update scroll-based colour logic for the new zones.
- `src/pages/Index.tsx`: ensure footer, CTA, and section wrappers use the new purple accent and warm-white zones.

## 6. Verification

- Preview the page at desktop and mobile.
- Check contrast on all sections.
- Confirm navigation colour switching works cleanly across each zone.
