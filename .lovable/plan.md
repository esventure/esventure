# Redesign Plan: How I Help Section

## Goal
Make the **How I Help** (services) section more visually pleasing and distinctive. The current alternating editorial split layout is tidy but still feels repetitive and text-heavy. We want an out-of-the-box, creative layout that supports the four service offerings while keeping the brand voice bold and direct.

## Current State
- Section lives in `src/pages/Index.tsx` inside the `CollapsibleSection id="how-i-help"` block.
- It renders four services: The Driver, The Sparring Room, The Map, The Mirror.
- Each service currently shows: chapter number, label, title, description, and a small CTA.
- The current treatment uses a left/right alternating editorial split with large watermark numerals and top-border dividers.

## Constraints
- Keep the four services and their existing descriptions (no copy changes beyond the current state).
- Preserve the brand colors: primary purple (#BF5AF2) and secondary yellow (#EEF0A3).
- Keep Poppins headings and Nunito Sans body.
- Stay within the existing one-page layout and sticky-section system.
- Maintain the current scroll-to-planner CTA behavior.

## Three Creative Directions

### Direction 1: The Partner's Toolkit (bento-style grid)
Arrange the four services as a **mixed-size bento grid** on a soft tinted background.
- The Driver is the largest tile (top-left), signalling it as the flagship offer.
- The remaining three tiles sit beside and below it in a 2x2 arrangement.
- Each tile gets a large, outlined Lucide icon at the top, a tinted background, and a subtle border.
- Hover reveals a secondary yellow accent line or shifts the icon slightly.
- This breaks the repetition of the alternating split and gives the section a modern, tool-like feel.

### Direction 2: The Journey Path (horizontal narrative)
Present the four services as **four stops along a continuous path**.
- A subtle horizontal line or dotted path connects the services across the viewport.
- Each stop is a circular or pill-shaped marker containing the large line icon, with the title and short description below it.
- The path gently implies a progression: from unblocking (Driver), to shaping (Sparring Room), to streamlining (Map), to presenting (Mirror).
- On mobile, the path folds into a vertical timeline.
- This gives the section a storytelling, infographic quality without extra copy.

### Direction 3: The Modular Workbench (card-based masonry)
Show the four services as **four tilted or stacked cards on a workbench surface**.
- Each service is a card with a prominent line icon, title, and one-line description.
- Cards sit on a slightly darker or tinted background, with a soft shadow and a subtle rotation or offset to feel tactile.
- Accent color blocks (yellow or purple) peek out from behind each card on hover.
- The CTA is a single floating button at the bottom of the section rather than repeated per card.
- This feels more crafted and playful while still looking professional.

## Recommended Approach
I recommend **Direction 2: The Journey Path** because it answers the user's request for storytelling and infographic style while keeping the section clean and airy (visual density 4). It also aligns naturally with the existing service flow and avoids heavy text repetition.

## Implementation Steps
1. Refactor the service rendering in `src/pages/Index.tsx` to support the chosen direction.
2. Introduce or reuse existing Lucide icons for the four services (prominent line-icon treatment requested).
3. Add motion: staggered entrance animation for each service card, and subtle hover state transitions.
4. Ensure responsive behavior works on mobile and desktop.
5. Verify no layout shifts in the sticky collapsible section or on page reload.

## Files to Touch
- `src/pages/Index.tsx` — main service section layout.
- `src/index.css` (optional) — new animation tokens if needed.
- `src/i18n/locales/en.json` and `nl.json` (only if new labels are introduced).

Which direction should I build?
