## Rework "How I Help" — 4 new services

Replace the current 4 service cards (Engine / Roadmap / Spark / Build) with the 4 themes you love. Same card layout, same "Let's..." voice, same `See it in action` CTA — only the content + icons change.

### New service cards

**1. The Fixer — Let's Get It Moving**
- Label: `THE FIXER`
- Title: `Let's Get It Moving`
- Copy: "That stuck project, that half-finished initiative, that thing nobody owns. I step in, take charge, and drive it forward until it actually ships."

**2. The Sparring Room — Let's Think It Through**
- Label: `THE SPARRING ROOM`
- Title: `Let's Think It Through`
- Copy: "When you've got an idea but no shape yet. We sketch, challenge, prototype and pressure-test it together until it's clear enough to build."

**3. The Map — Let's Make It Flow**
- Label: `THE MAP`
- Title: `Let's Make It Flow`
- Copy: "Messy processes, double work, things falling between teams. I map what's actually happening, find the friction, and redesign it so your day-to-day just runs."

**4. The Mirror — Let's Make It Yours**
- Label: `THE MIRROR`
- Title: `Let's Make It Yours`
- Copy: "Your brand or personal story deserves a visual that fits. I help shape how you (or your company) shows up — from positioning to a website that actually feels like you."

### Original icon concepts

All icons stay in the existing house style: 32x32 viewBox, single-color (`currentColor`), abstract geometric, slightly rounded, ~3px stroke. Original = not the obvious wrench/lightbulb/flowchart/eye combo.

**1. The Fixer — "Block being pushed"**
A square block with a small arrow-wedge pushing it from behind, plus a tiny motion line. Visualises *unstuck → moving*, not "repair". Distinctive, not a wrench.

```text
   ┌───┐
 ▶ │   │  →
   └───┘
```

**2. The Sparring Room — "Two interlocking arcs forming a spark"**
Two open arcs facing each other (like two minds meeting), with a small filled diamond in the gap where they meet. Reads as dialogue + idea, without using a speech bubble or lightbulb.

```text
  )    (
    ◆
  )    (
```

**3. The Map — "Tangled line resolving into a straight one"**
A single continuous stroke that starts as a knot/loop on the left and untangles into a clean horizontal line ending in a dot. Visualises *chaos → flow* in one gesture. Much more original than a flowchart.

```text
  ╭─╮
  │ ╰─────●
  ╰─╯
```

**4. The Mirror — "Asymmetric frame with a star inside"**
A rounded square frame (slightly tilted, one corner open) with the Es Venture sparkle/star sitting inside it. Echoes the EV logo mark, signals identity + framing without using an eye, face or camera.

```text
  ┌──┐
  │ ✦│
  └──┘
```

### Files to change

- `src/components/ServiceIcons.tsx` — replace the 4 existing icon components (`MakeItHappenIcon`, `ClearPathIcon`, `QuickFixIcon`, `BuildIcon`) with 4 new ones: `FixerIcon`, `SparringIcon`, `MapIcon`, `MirrorIcon`. Same prop signature, same stroke style.
- `src/pages/Index.tsx` — update the `services` array (lines ~69-98): new icon imports + new label/title/description for each of the 4 cards. No layout changes.

### Out of scope

- The "Need a sparring partner?" yellow band stays. With the new "Sparring Room" service card, we may want to revisit whether that section is still needed — but I'll only touch it if you confirm.
- No copy changes elsewhere on the page.
