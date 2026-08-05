# How I Help: Three Swipeable Design Directions

## Goal
Build all three redesign directions for the **How I Help** section as real, working variants you can swipe through side by side, then pick a winner. The live homepage section stays untouched until you choose.

## What you'll get
A preview page at `/how-i-help-directions` with:
- Three full-width variants stacked in a horizontal carousel, one per screen.
- Swipe on touch, drag with the mouse, arrow keys, and clickable dots plus prev/next buttons.
- A small label per slide ("Direction 1 - Partner's Toolkit", etc.) with a one-line description of the idea.
- Language toggle respected, so both EN and NL copy render correctly.

## The three directions

### Direction 1 - Partner's Toolkit (bento)
Four services as a mixed-size bento grid on a soft tinted surface. The Driver takes the large hero tile; the other three fill a 2x2 cluster. Each tile leads with a prominent outlined icon, a hairline border, and a yellow accent line that draws in on hover.

### Direction 2 - Journey Path (infographic)
The four services become four stops along a connecting path. Circular icon markers sit on a dotted line that animates in as you scroll, with title and short description under each stop. Reads as a progression: unblock, shape, streamline, present. Folds into a vertical timeline on mobile.

### Direction 3 - Modular Workbench (tactile cards)
Four cards laid out like tools on a bench: soft shadows, slight offsets, prominent line icons, and purple or yellow color blocks peeking from behind each card on hover. A single shared CTA sits at the bottom instead of one per service.

All three keep the existing four services and their copy, Poppins headings, Nunito Sans body, purple and yellow accents, and airy spacing (density 4).

## Technical notes
- New components: `src/components/services/ServicesBento.tsx`, `ServicesJourney.tsx`, `ServicesWorkbench.tsx` - each self-contained and drop-in ready for `Index.tsx`.
- New page `src/pages/HowIHelpDirections.tsx` plus a route in `src/App.tsx`, marked `noindex` via Helmet so it stays out of search results.
- Carousel built with the existing `framer-motion` drag support (no new dependency), with keyboard and dot navigation.
- Icons: prominent Lucide line icons (for example `Rocket`, `MessagesSquare`, `Workflow`, `Sparkles`), sized large with a light stroke.
- All colors via existing semantic tokens; no hardcoded hex values.
- Reuse `t("services.*")` keys, so no copy or locale changes are needed.

## After you pick
I'll drop the chosen component into the `how-i-help` section of `src/pages/Index.tsx`, remove the preview route and the two unused variants.
