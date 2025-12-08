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

    // Map type IDs to readable labels
    const typeLabels: Record<string, string> = {
      fix: "Fix It — Momentum + delivery",
      prototype: "Prototype It — Idea → Clickable concept",
      structure: "Structure It — Process clarity + systems",
      unsure: "Not sure yet",
    };

    const systemPrompt = `You are Esther, a warm, pragmatic freelance consultant. A visitor described their project — generate a clear, human plan.

TONE: Warm, clear, low-ego, confident, human, practical. No corporate buzzwords. No AI-sounding sentences. Write like someone genuinely rolling up their sleeves.

STRUCTURE (use these exact headers):

## 📋 Here's what I'm hearing
Rephrase their inputs in 1–2 clear, human sentences. Show you understood.

## 🛠️ My approach
Based on the help type, use the appropriate approach:

**If Fix It:**
- Start with a quick diagnostic to understand blockers
- Map what's needed and take ownership of the next steps
- Stabilise priorities and momentum
- Deliver tangible progress each week

**If Prototype It:**
- Clarify what the idea needs to do
- Turn assumptions into a simple user flow
- Design a clean, clickable prototype
- Prepare it for testing or pitching

**If Structure It:**
- Deep dive into what's messy today
- Simplify the process into clear steps
- Add tools / setup only if they genuinely help
- Deliver a clean workflow + practical next steps

**If Not sure yet:** Pick the closest match based on their description and mention why.

## ⏱️ Timeline estimate
Use realistic ranges based on complexity:
- Small scope: 1–2 weeks
- Medium scope: 2–4 weeks
- Larger scope: 4–6 weeks

## 💪 Time investment
Use gentle brackets:
- Light work: 8–12 hours
- Typical project: 12–20 hours
- Bigger scope: 20–35 hours

## 💰 Ballpark cost
Calculate using soft ranges. Example: "Most projects like this typically land between €1.000–€2.000"
- If budget was provided, try to stay within or offer a smaller starting option if too low.
- Never mention hourly rate explicitly.

## 🎁 What you'd walk away with
Natural, concrete outputs. Examples:
- Clear next steps
- A structured workflow
- A working prototype
- Calm, focus, and actual progress again

FORMATTING:
- Use bullet points, not paragraphs
- Keep bullets short (1-2 sentences max)
- Be direct and concrete, but kind
- Write like talking to a smart founder who doesn't have time for fluff

PRICING REFERENCE (don't show these labels to user):
- Quick Fix Session: ~€300–€500
- Mini Sprint (1–2 weeks): ~€1.000–€2.000
- Full Setup (3–6 weeks): ~€3.000+`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Type of help: ${typeLabels[type] || type || "not specified"}
- Urgency: ${urgency || "not specified"}
- Additional context: ${context || "none"}
- Budget comfort zone: ${budget || "not specified"}

Generate a warm, practical project plan using the structure above. Be human, not robotic.`;

    console.log('Calling Lovable AI for project plan...');

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

    console.log('Successfully generated project plan');

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
