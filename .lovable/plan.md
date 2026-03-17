

## When to Call Me — Updated Scenarios

### What changes

Update the `scenarios` array in `WhenToCallMe.tsx` from 4 to 6 items, using the new "Emergency Room" content. Also update the section subtitle and adjust the grid to accommodate 6 cards (3x2 on desktop).

### New scenarios data

| # | Emoji | Label (card) | Keyword | Response |
|---|-------|-------------|---------|----------|
| 1 | 🩹 | "That one project that's been dragging on forever, collecting dust, and giving you anxiety." | The Unfinished Business | "Cut the crap and finish it. I'll dive in, identify the real blockers, and drive it to completion." |
| 2 | 🏔️ | "You're buried under a mountain of tasks and you can't even see your desk anymore." | The Overwhelm Avalanche | "I'll sort the chaos, prioritize the critical, and take the heaviest loads off your plate." |
| 3 | 🔧 | "Something critical is stuck. A process is broken and everything's grinding to a halt." | The Bottleneck Breakdown | "I'll find the choke point, diagnose the problem, and get things flowing again. Fast." |
| 4 | ⚰️ | "Brilliant ideas just sitting there, dying a slow death because no one has the bandwidth." | The Idea Graveyard | "I'll pick the winners, build the roadmap, and drive that idea from concept to reality." |
| 5 | 👻 | "There's a crucial role or task that no one's owning, and it's impacting everything." | The "Who Even Does That?" Gap | "I'll step in, take charge, and ensure that critical piece is handled with precision." |
| 6 | 🧹 | "You're transitioning, scaling, or need someone to make sense of chaos before it blows up." | The Messy Handover | "I'll organize the disarray, document the undocumented, and set up systems so you can hit the ground running." |

### Changes in `WhenToCallMe.tsx`

1. **Subtitle** → "When your project is bleeding time, money, or sanity — you don't need a pep talk. You need a fixer."
2. **Scenarios array** → Replace with 6 new scenarios above
3. **Grid** → Change from `md:grid-cols-2` to `md:grid-cols-3` for a clean 3x2 layout on desktop
4. **Card text** → Slightly smaller font to fit the longer quotes comfortably

No other files affected. The accordion-style approach from the previously approved plan will be applied: clicking a card expands the response inline (no separate chat area), keeping it visually distinct from the Project Planner.

