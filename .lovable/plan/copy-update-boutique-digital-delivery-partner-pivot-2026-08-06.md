# Copy update: "boutique digital delivery partner" pivot

Text-only update from the uploaded document. No changes to visual design, colours, typography, layout, spacing, the planner form, client logos, the Sparring section, or the footer.

## What changes

**Hero**
- Headline: "Your boutique digital delivery partner." with "digital" kept in yellow (uses the existing three-part title keys).
- Sub-headline: the new "From bold new ideas to complex digital ecosystems..." line.
- The 3 checkmark bullets become The Delivery / The Connective Tissue / The Craft, each with a bold lead-in label.
- Primary button: "Tell me what you're building". Secondary "Call me" stays.

**When to Call Me**
- Intro: "Whether you are building something entirely new or scaling something that already exists, these are the moments I step in."
- The 6 items become named scenarios with a title plus a supporting sentence: The Blank Canvas, The Missing Link, The Agency Alternative, The Stuck Project, The Ecosystem, The Founder Trap.
- The "Symptom 01" label becomes "Scenario 01".
- Closing line: "If you need someone organised, accountable, and hungry to make things happen - that's where I come in."
- "Why Call Me?" panel and its four points stay as they are.

**How I Help**
- Intro: "Four ways we can work together - pick the one that fits your ambition."
- Service 01: The Driver / "Let's Get It Shipped" / new body about taking ownership of delivery.
- Services 02, 03, 04 unchanged.

**The Es Venture Effect**
- Tagline: "I am your digital partner - for whatever comes next." The three pillars stay.

**About**
- Paragraph 1 replaced with the new "digital project manager and delivery partner" line.
- Paragraph 2: the "connective tissue across disciplines" sentence replaces the current bridging sentence; the rest of the paragraph stays.
- Paragraph 3: final sentence becomes "...you will always get a partner who takes ownership of the work."

**Dutch version**
Every changed string gets a matching Dutch translation in the same direct, energetic voice, so the language toggle stays in sync.

**SEO text**
Page title, meta description, Open Graph text and the AI-crawler summary file still describe the old "if it's digital, I've got it" positioning. These get updated to the boutique delivery partner framing so search and social previews match the page.

## Technical notes

- Copy lives in `src/i18n/locales/en.json` and `nl.json`; both are updated.
- `whenToCallMe.triggers` changes from an array of strings to an array of `{ title, description }`. `src/components/WhenToCallMe.tsx` renders the title as the existing heading and the description as a supporting line below it, keeping the current grid, label, and yellow hover bar styling untouched.
- Hero bullets become `{ label, text }` so the lead-in reads bold; `src/pages/Index.tsx` list rendering is adjusted accordingly, same checkmark and spacing.
- Metadata updates touch the `Head` block in `src/pages/Index.tsx`, `index.html`, and `public/llms.txt`.
- Hyphens only, no em dashes, per existing project rule.
