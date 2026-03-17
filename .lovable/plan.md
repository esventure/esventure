

## "When to Call Me" — Interactive Chat-Style Redesign

### Concept
Transform the static grid into a two-step interactive experience: 4 clickable "chaos cards" at the top, and a chat-bubble response area below that animates in when a card is clicked. Only one response visible at a time. A subtle typing indicator before the response appears adds personality.

### New Component: `WhenToCallMe.tsx`
Extract this section into its own component for cleanliness.

**State:** `selectedIndex: number | null`, `isTyping: boolean`

**Step 1 — Chaos Cards (2x2 grid on desktop, stacked on mobile)**
- Each card: emoji + quote text
- Rounded-3xl, soft shadow, white bg, generous padding
- Hover: lift (`y: -4`), purple glow via `shadow-primary/20`
- Active/selected state: purple left border accent + slightly different bg
- Click: sets `selectedIndex`, triggers typing animation

**Step 2 — Chat Bubbles (below the cards)**
- Animated container using `AnimatePresence` from framer-motion
- **User bubble** (right-aligned, light grey bg, rounded): shows the selected quote
- **Typing indicator** (left-aligned): 3 bouncing dots, visible for ~800ms
- **Response bubble** (left-aligned, white bg with subtle purple left border): 
  - Bold keyword (Momentum ⚡ / Clarity 🧠 / Ownership 🚀 / A Fix 🧩)
  - Response text below
- Fade+slide-up entrance animation for each bubble sequentially

### Visual Style
- Clean white space, max-w-4xl centered
- Cards: `rounded-3xl border border-border/50 bg-white shadow-sm` with hover transitions
- Chat area: iMessage-inspired minimal bubbles, no tails, just rounded corners
- Purple accent used sparingly: selected card border, response bubble left accent, typing dots

### Animation Flow
1. User clicks card → card gets selected state
2. User bubble slides in from right (200ms)
3. Typing dots appear (800ms delay)
4. Response bubble slides in from left (200ms)
5. Clicking another card: previous chat fades out, new one animates in

### Data
Reuse existing `scenarios` array, adding emojis and updated response text per the brief.

### Integration
Replace the current "When to Call Me" section in `Index.tsx` with `<WhenToCallMe />`.

