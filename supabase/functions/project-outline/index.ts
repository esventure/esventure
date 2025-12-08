import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords for auto-detection of support type
const STRUCTURE_KEYWORDS = ['process', 'workflow', 'messy', 'unclear', 'tools', 'setup', 'notion', 'structure', 'organise', 'organize', 'optimise', 'optimize', 'chaos', 'complex', 'overview', 'documentation', 'system'];
const DELIVERY_KEYWORDS = ['stuck', 'delay', 'slipping', 'timeline', 'nobody knows', 'ownership', 'coordination', 'blocked', 'project', 'deliverables', 'implementation', 'momentum', 'rescue', 'deadline'];
const PROTOTYPE_KEYWORDS = ['prototype', 'design', 'idea', 'concept', 'mockup', 'ux', 'ui', 'screens', 'user flow', 'mvp', 'pitch', 'validate', 'wireframe'];

function detectSupportType(text: string): 'structure' | 'delivery' | 'prototype' {
  const lowerText = text.toLowerCase();
  
  let structureScore = 0;
  let deliveryScore = 0;
  let prototypeScore = 0;
  
  STRUCTURE_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) structureScore++;
  });
  DELIVERY_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) deliveryScore++;
  });
  PROTOTYPE_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) prototypeScore++;
  });
  
  // Pick dominant type
  if (prototypeScore >= structureScore && prototypeScore >= deliveryScore && prototypeScore > 0) {
    return 'prototype';
  } else if (deliveryScore >= structureScore && deliveryScore > 0) {
    return 'delivery';
  } else if (structureScore > 0) {
    return 'structure';
  }
  
  // Default to structure if no clear match
  return 'structure';
}

function determineProjectSize(inputs: {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
}): { size: 'small' | 'medium' | 'large'; baseHoursMin: number; baseHoursMax: number; weeks: string } {
  const fullText = `${inputs.situation} ${inputs.handoff}`.toLowerCase();
  
  let complexityScore = 0;
  
  // Budget factor
  if (inputs.budget === '€6.000+') {
    complexityScore += 3;
  } else if (inputs.budget === '€3.000–€6.000') {
    complexityScore += 2;
  } else if (inputs.budget === '€1.000–€3.000') {
    complexityScore += 1;
  } else if (inputs.budget === '< €1.000') {
    complexityScore -= 1;
  }
  
  // Large complexity indicators
  const largeIndicators = ['multiple teams', 'stakeholders', 'integration', 'integrations', 'api', 'apis', 'testing', 'uat', 'e2e', 'migration', 'complex', 'unclear scope', 'certification'];
  largeIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 2;
  });
  
  // Medium complexity indicators
  const mediumIndicators = ['multiple', 'team', 'alignment', 'messy but solvable', 'several'];
  mediumIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 1;
  });
  
  // Simple indicators (reduce complexity)
  const simpleIndicators = ['simple', 'quick', 'small', 'single', 'just one', 'founder', 'solo'];
  simpleIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore -= 1;
  });
  
  // Urgency can indicate complexity
  if (inputs.urgency === "It's urgent 🔥") {
    complexityScore += 1;
  }
  
  if (complexityScore <= 0) {
    return { size: 'small', baseHoursMin: 8, baseHoursMax: 12, weeks: '1–2 weeks' };
  } else if (complexityScore <= 3) {
    return { size: 'medium', baseHoursMin: 12, baseHoursMax: 20, weeks: '2–4 weeks' };
  } else {
    return { size: 'large', baseHoursMin: 20, baseHoursMax: 35, weeks: '4–6 weeks' };
  }
}

function calculateModifiers(inputs: {
  urgency: string;
  situation: string;
  handoff: string;
}): number {
  let modifier = 0;
  const fullText = `${inputs.situation} ${inputs.handoff}`.toLowerCase();
  
  // Urgency modifier
  switch (inputs.urgency) {
    case 'Just exploring':
      modifier -= 10;
      break;
    case 'Soon':
      // baseline, no change
      break;
    case 'Need momentum':
      modifier += 10;
      break;
    case "It's urgent 🔥":
      modifier += 20;
      break;
  }
  
  // Complexity keywords add %
  if (fullText.includes('testing') || fullText.includes('uat') || fullText.includes('e2e')) {
    modifier += 20;
  }
  if (fullText.includes('integration') || fullText.includes('api')) {
    modifier += 15;
  }
  if (fullText.includes('migration')) {
    modifier += 20;
  }
  if (fullText.includes("don't know") || fullText.includes("unclear") || fullText.includes("we don't know what we need")) {
    modifier += 10;
  }
  if (fullText.includes('multiple team') || fullText.includes('multiple stakeholder')) {
    modifier += 15;
  }
  
  // Cap at 40%
  return Math.min(modifier, 40);
}

function calculateCostRange(size: string, modifier: number): { min: number; max: number } {
  const baseRanges: Record<string, { min: number; max: number }> = {
    small: { min: 900, max: 1500 },
    medium: { min: 1500, max: 2800 },
    large: { min: 2800, max: 4500 },
  };
  
  const range = baseRanges[size] || baseRanges.medium;
  const multiplier = 1 + (modifier / 100);
  
  return {
    min: Math.round(range.min * multiplier / 100) * 100,
    max: Math.round(range.max * multiplier / 100) * 100,
  };
}

function formatCurrency(amount: number): string {
  return `€${amount.toLocaleString('de-DE')}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { situation, handoff, urgency, budget } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const fullText = `${situation} ${handoff}`;
    const supportType = detectSupportType(fullText);
    const projectSize = determineProjectSize({ situation, handoff, urgency, budget });
    const modifier = calculateModifiers({ urgency, situation, handoff });
    const costRange = calculateCostRange(projectSize.size, modifier);
    
    // Adjust hours based on modifier
    const adjustedHoursMin = Math.round(projectSize.baseHoursMin * (1 + modifier / 100));
    const adjustedHoursMax = Math.round(projectSize.baseHoursMax * (1 + modifier / 100));

    // Approach templates - now as numbered steps, conversational tone
    const approachTemplates = {
      structure: `1. First, I'd jump in and get a clear picture of how things work today — where the friction is, what's unclear, what's slowing people down.
2. Then I'll map out a cleaner workflow and simplify things so it actually makes sense.
3. If tools would help (like Notion or Airtable), I'll set those up — but only if they genuinely make life easier.
4. You'll end up with clarity, calm, and a way of working your team can actually stick to.`,
      
      delivery: `1. I'd start by digging into what's actually blocking things — where decisions are stuck, what's unclear, who's waiting on what.
2. Then I'll tighten up the scope and get priorities straight.
3. From there, I'll take the reins on the next steps so you can stop firefighting.
4. The goal? Get things moving again without making it more complicated than it needs to be.`,
      
      prototype: `1. We'd kick off by getting really clear on what this idea needs to do — what problem it solves, who it's for.
2. I'll sketch out a simple flow that makes sense and feels intuitive.
3. Then I'll build a clean, clickable prototype you can actually show people.
4. Perfect for testing with users, getting stakeholder buy-in, or pitching it with confidence.`
    };

    // Walk away with templates
    const walkAwayTemplates = {
      structure: [
        'A workflow that actually makes sense',
        'Less confusion, more clarity',
        'Practical next steps you can act on',
        'Tool setup if it helps (Notion, Airtable, etc.)'
      ],
      delivery: [
        'Someone taking ownership of the mess',
        'Clear priorities everyone understands',
        'Visible progress week by week',
        'No more wondering what is happening'
      ],
      prototype: [
        'A clickable prototype you can show',
        'Clear user flow and screens',
        'Something real to test or pitch',
        'Confidence in the direction'
      ]
    };

    const systemPrompt = `You are Esther, a warm, down-to-earth freelance consultant writing a project plan for someone who just described their situation. 

VOICE & TONE:
- Write like you're having a friendly chat over coffee, not presenting a formal proposal
- Use "I'd" instead of "I would", "you'll" instead of "you will" 
- Be warm but direct — no fluff, no corporate speak, no AI-sounding phrases
- NEVER use double hyphens (--). Use proper punctuation, commas, or a single dash if needed
- Sound like a real person who genuinely wants to help, not a consultant trying to impress
- It's okay to be casual ("kick off", "dig in", "get things moving")
- Show you actually understood their situation — reflect it back naturally

DETECTED SUPPORT TYPE: ${supportType}
PROJECT SIZE: ${projectSize.size}
CALCULATED TIMELINE: ${projectSize.weeks}
CALCULATED HOURS: ${adjustedHoursMin}–${adjustedHoursMax} hours
CALCULATED COST: ${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}

STRUCTURE (use these exact headers):

## Got it
Write 2–3 conversational sentences showing you understood their situation. Start with something like "So..." or "Sounds like..." — make it feel like a natural response, not a summary.

## Here's how I'd tackle this
Output as a numbered list (1. 2. 3. 4.) — adapt these steps to their specific situation:
${approachTemplates[supportType]}

## What you'd walk away with
${walkAwayTemplates[supportType].map(item => `- ${item}`).join('\n')}

## Timeline
**${projectSize.weeks}**
Depends on how quickly we can align and how complex things get.

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**
Give or take — depends on the final scope.

## Ballpark cost
**${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}**
This is just a rough sense of what similar projects usually need — not a quote.

FORMATTING RULES:
- Use the exact headers above with ##
- The approach MUST be a numbered list (1. 2. 3. 4.)
- Keep it scannable and easy to read
- Sound like a real human, not a proposal generator
- Don't add extra sections or mention hourly rates
- NEVER use double hyphens (--) anywhere in your output`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Urgency: ${urgency || "not specified"}
- Budget comfort zone: ${budget || "not specified"}

Generate the project plan using the structure above. Be human, not robotic.`;

    console.log('Calling Lovable AI for project plan...');
    console.log('Detected support type:', supportType);
    console.log('Project size:', projectSize.size);
    console.log('Modifier:', modifier);

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
