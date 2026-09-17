# Es Venture website rework

I’ll rework the one-pager around the new direction: a small creative digital studio for entrepreneurs, with the work shown earlier and more generously. The site should feel like a carefully edited window into different people and ideas, not a louder agency site.

## What changes

1. **New homepage story**
   - Hero becomes clearer immediately: “Creative digital studio for entrepreneurs”.
   - Use the recommended headline: “From idea to something unmistakably yours.”
   - Keep Esther visible in the first screen.
   - Add one controlled tilted “frame” preview that cycles through Dennis, Ingrid, and HAP details.
   - Remove the large free-floating asterisk motif.

2. **Work moves up**
   - Move Selected Work directly under the hero.
   - Replace the current abstract/agency feel with a “framing and revealing” system.
   - Feature three main stories: Dennis Gerrits, Studio Ingrid de Reuver, and HAP.
   - Keep any missing real imagery as structured visual placeholders for now, so real project screenshots can drop in cleanly later.

3. **Services become plain-language routes**
   - Replace abstract service language with three offers:
     - I need a brand
     - I need a website
     - I want to test an idea
   - Each route gets: client situation, what we do, what you can receive, and a real example.
   - Connect each service visually to the matching case instead of using generic icons.

4. **Add the quiet USP section**
   - Add a restrained section titled: “First, I look for what needs to come through.”
   - This explains Esther’s real strength without using mystical or overblown claims.

5. **Studio and credibility**
   - Keep “Small by design. Serious about the work.”
   - Rewrite the body to focus on direct collaboration, design decisions, trusted specialists, and one clear point of contact.
   - Change the client-logo area to “Experience also includes work with” instead of positioning it as the main proof.

6. **Final contact flow**
   - Repeat the three choices near the end in a shorter form.
   - Final invitation becomes: “Have something in mind?”
   - Primary action: “Tell me what you want to make.”
   - Secondary action: “Book a 20-minute conversation.”

7. **Footer and cleanup**
   - Remove the Plaiwrks footer link.
   - Consolidate the duplicate copyright line.
   - Keep LinkedIn, email, booking, and privacy links.
   - Reduce generic decorative motion and keep transitions subtle.

## Visual direction

- Use warm paper as the main base with inky purple typography.
- Keep vivid Es Venture purple and yellow, but use full-screen colour more selectively.
- Let each project bring controlled colour into the page.
- Replace repeated symbols with one tilted frame/aperture device per viewport.
- Avoid generic gradients, starbursts, targets, arrows, funnels, floating 3D objects, and glitter effects.

## What I won’t do in this pass

- I won’t invent detailed project credits, client quotes, or verified outcomes.
- I won’t claim roles that are not confirmed.
- I won’t add fake portfolio photography.
- I won’t rebuild the planner logic unless you ask for that separately.

## Technical notes

- Update the homepage structure in `Index.tsx` and keep the existing language switch working.
- Update both English and Dutch copy files.
- Create a reusable case/service framing component if needed.
- Update navigation anchors to match the new section order.
- Update metadata and structured data to match the new “creative digital studio for entrepreneurs” positioning.
- Keep styling token-based through the existing design system.
- Check the preview on desktop and mobile after the pass.
