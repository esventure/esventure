

# Complete Website Redesign — One-Pager with Project Planner

Rewrite `src/pages/Index.tsx` to match the "User Manual for Esther" one-pager structure, keeping the existing color palette, fonts, and design system. The Project Planner section is retained.

## New Page Flow

```text
1. Hero (full-width purple, Esther photo, tagline + single CTA)
2. "When to Call Me" (4-row scenario table)
3. "How I Help" (3 cards: The Engine, The Roadmap, The Spark)
4. "The Es Venture Effect" (testimonial quote + client logos)
5. Project Planner (existing component, kept as-is)
6. Contact CTA (warm photo bg, email + book a call)
7. Footer (logo, privacy, Plaiwrks nod)
```

## Section Details

### 1. Hero
- Full-width `bg-primary`, Esther photo right, copy left
- Headline: "Your project's personal caffeine shot."
- Body: "Feeling stuck? Overwhelmed?..." intro paragraph from the brief
- Single CTA: "Let's Get This Done →" scrolls to project planner

### 2. "When to Call Me"
- Replaces the Es Venture Effect bubbles
- 4 responsive rows, each with "If you're saying..." (italic quote) and "You need..." (bold label + explanation)
- Rows: stalled project → Momentum / million things → Clarity / great idea → Ownership / messy process → A Fix

### 3. "How I Help: Your Personal Toolkit"
- Subtitle: "Think of me as your secret weapon."
- 3 cards with labels: "The Engine" / "The Roadmap" / "The Spark"
- Each has service name, description from brief, and "See it in action →" link scrolling to planner
- Reuse existing ServiceIcons

### 4. "The Es Venture Effect"
- Large testimonial quote (placeholder attribution)
- Client logo bar below (existing grayscale → color infinite scroll)

### 5. Project Planner
- `<ProjectPlanner />` component rendered as-is — no changes

### 6. Contact CTA
- Keep existing design (Esther phone photo background + gradient)
- Headline: "Ready to make something happen?"
- Email + Book a call buttons

### 7. Footer
- Add "For AI-native projects, check out Plaiwrks" link
- Keep logo, copyright, privacy link

## Removed Sections
- Es Venture Effect bubbles (replaced by "When to Call Me")
- Recent Projects carousel (replaced by testimonial + logos)
- About Me section (hero intro covers the personal story)
- Floating CTA button (page is shorter, planner is always nearby)

## Navigation Update
- Remove "Projects" link (no projects section)
- Keep: Services, About (scrolls to planner area or testimonial), Let's Go

## Files Modified

| File | Scope |
|------|-------|
| `src/pages/Index.tsx` | Complete rewrite with new one-pager structure |
| `src/components/Navigation.tsx` | Remove "Projects" nav link, update section targets |

## Unchanged
- `src/components/ProjectPlanner.tsx` — rendered as-is
- `src/components/ServiceIcons.tsx` — reused
- All edge functions, database, CSS, tailwind config
- All images and assets

