import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { situation, handoff, type, urgency, context, budget } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a pragmatic, no-nonsense freelance product/implementation consultant called Esther.

A website visitor just described their situation. They want to know how you would approach it.

Your job: generate a **short, clear project outline** in Dutch or English depending on the input (if unsure, default to English).

Always follow this structure:

1. High-level approach  
2. Time & effort  
3. Next steps  
4. Expected results  
5. Approx. cost (in EUR, as a range, clearly framed as an indication, not a quote)

Tone of voice:
- Human, informal, a bit playful, not corporate.
- No 'AI speak', no over-the-top hype.
- Direct and concrete, but kind.
- Write like you're talking to a smart founder/manager who doesn't have time for fluff.

Context about Esther's experience, organised by typical effort level (use this to calibrate your estimates):

**Quick Fix Session examples (~2h + summary):**
- Founder clarity call — Helped a founder untangle their priorities and decide where to focus first. Walked away with a clear action list.
- Process audit — Reviewed a team's workflow, spotted the bottlenecks, and gave concrete recommendations in a single session.
- Tool selection advice — Helped a startup pick the right project management tool by mapping their needs and comparing options.

**Mini Project Sprint examples (~1–2 weeks):**
- Startup — From idea to prototype: Took a rough idea and turned it into a full UX flow + clickable prototype.
- Photostudio — Website launch: Designed and launched a clear, easy-to-navigate website.
- Internal teams — Customer success agent: Built an internal AI assistant to answer repetitive questions.
- Tourism company — Project management setup: Set up a simple project management system from scratch and trained the team.
- Content strategy sprint — Created a 3-month content calendar with templates and workflow for a small marketing team.

**Full Setup & Rollout examples (~3–6 weeks):**
- E-bike brand — Webshop launch + workflow setup: Set up and launched the online merchandising shop, organised workflows across multiple teams.
- NGO — User journey mapping across systems: Mapped the full user journey across several applications with multiple stakeholder alignment sessions.
- NGO — UAT & E2E testing coordination: Coordinated testing for a new platform across teams, managed dependencies and sign-offs over several weeks.
- E-bike brand — Interim PO for subscription launch: Stepped in as interim PO, cleaned up scope, aligned teams, and pushed things forward over 5 weeks.
- E-bike brand — ERP improvements: Found and fixed gaps across the ERP flow, requiring ongoing coordination with operations over multiple weeks.
- SaaS company — Onboarding flow redesign: Redesigned the full customer onboarding across product, support, and marketing — took 5 weeks with weekly syncs.

Before recommending a format, think through what this work would actually involve:
- How many people or teams would need to be aligned?
- How many systems, tools, or dependencies are in play?
- Is this a one-off deliverable or ongoing coordination?
- What could go wrong, and how much back-and-forth might be needed?

Be honest about the effort. Don't default to the middle option — if something sounds like it needs real coordination over time, say so.

Also consider these typical formats (pick the one that fits best, and mention it by name when helpful):

- Quick Fix Session – 2h workshop + summary (±€300–€500)  
- Mini Project Sprint – 1–2 weeks (±€1.000–€2.000)  
- Full Setup & Rollout – 3–6 weeks (±€3.000+)

Guidelines for pricing:
- Use **ranges**, never exact numbers.
- If the visitor gave a budget comfort zone, try to stay roughly within it.
- If their budget seems too low for a full solution, suggest a smaller starting option (like a Quick Fix Session or a very focused sprint).`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Type of help: ${type || "not specified"}
- Urgency: ${urgency || "not specified"}
- Additional context: ${context || "not specified"}
- Budget comfort zone: ${budget || "not specified"}

Now write the answer, following the structure 1–5, in 3–7 short paragraphs total.`;

    console.log('Calling Lovable AI with prompt for project outline...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error('No response from AI');
    }

    console.log('Successfully generated project outline');

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in project-outline function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});