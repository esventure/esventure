## Stepping back

You're right — I've been redesigning the *container* without questioning the *content*. The real problem isn't layout. It's that the six items are clever metaphors ("The Unfinished Business", "The Idea Graveyard", "The 'Who Even Does That?' Gap") that the visitor has to *decode* before they recognize themselves. That's why every layout feels noisy: every tile demands a second of interpretation.

## What we're actually trying to say

The job of this section is one thing: **make the visitor say "oh shit, that's me"** within 2 seconds. Then they trust that you understand their situation, which makes them want to talk to you.

So the content needs to be:
- **Specific situations**, not metaphors
- **Phrased the way Esther's customer would describe their own week** — not the way a copywriter would brand it
- Recognizable in a glance, no decoding

## Direction: rewrite the 6 scenarios as concrete, first-person situations

Drop the cute names. Each item becomes a single line that sounds like something the visitor literally said in a meeting last week.

Draft (open to edits):

1. "We've been 'almost done' with this for six months."
2. "I'm the founder, the ops person, the support team, and now also the bookkeeper."
3. "Our tools don't talk to each other and three people are doing the same thing twice."
4. "We have a Notion full of great ideas and zero of them have shipped."
5. "Nobody owns this and it's quietly breaking everything."
6. "Someone left, and now nobody knows how half of it works."

Each line is the symptom in plain language. No emoji needed — the words do the work. Esther's response (the "fix") can stay tucked away on click, OR we surface a short fix line right under it.

## Two layout options for this rewritten content

**Option 1 — A single quiet list (recommended)**
Just six lines, each in quotation marks, stacked. Below each one in smaller foreground text: Esther's one-line answer ("→ I move in, find the actual blocker, and ship it."). No tiles, no accordion, no interaction. Reads like a conversation. Maximum scannability, zero noise.

**Option 2 — Two-column "you say / I do" table**
Left column: the visitor's quote. Right column: Esther's one-line response. Reads like a menu. Slightly more structured, slightly more work to scan.

I'd push for Option 1 — it matches Esther's direct, no-bullshit voice better than a table.

## What I'd change

- `src/components/WhenToCallMe.tsx` — rewrite the `scenarios` array (new copy, drop emojis, drop cute keywords) and rebuild the layout as a quiet list
- Update `mem://features/when-to-call-me-section` to reflect the new approach

## What I need from you before I build

1. Do you agree with the diagnosis (clever names → cognitive load)?
2. Are the 6 draft quotes above close to what you want, or do you want to rewrite them in your own voice first?
3. Layout: quiet list (Option 1) or two-column you-say/I-do (Option 2)?
