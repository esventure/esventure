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

    // Approach templates
    const approachTemplates = {
      structure: `I'd start with a fast deep-dive to understand how things work today and where the confusion or friction sits.
From there, I map the workflow, simplify it, and turn it into something practical and easy to follow.
If tools or light setup help (Notion, Airtable, simple automations), I'll add those — but only where they genuinely improve things.
You'll walk away with calm, clarity, and a workflow the team can actually use.`,
      
      delivery: `I'll begin with a short diagnostic to see what's blocking progress and what decisions or ownership are missing.
Then I stabilise the scope, map the priorities, and take the next steps off your plate.
Expect structure, transparency, and visible progress each week.
My goal is to bring momentum back quickly without overcomplicating anything.`,
      
      prototype: `We'll unpack the idea and clarify what you need it to achieve.
Then I'll translate it into a simple, intuitive flow and a clean clickable prototype.
It's perfect for testing, sharing with stakeholders, or pitching — giving you something real, fast.`
    };

    // Walk away with templates
    const walkAwayTemplates = {
      structure: [
        'Clear workflow',
        'Simplified process',
        'Practical next steps',
        'Optional tool setup (if relevant)'
      ],
      delivery: [
        'Ownership of next steps',
        'Realistic priorities',
        'Steady weekly progress',
        'Clear communication'
      ],
      prototype: [
        'Clickable prototype',
        'User flow',
        'Validatable concept',
        'Testing-ready outputs'
      ]
    };

    const systemPrompt = `You are Esther, a warm, pragmatic freelance consultant. A visitor described their project — generate a clear, human project plan.

TONE: Warm, clear, confident, low-ego, professional but very human. No corporate buzzwords. No AI-sounding sentences. Write like someone genuinely rolling up their sleeves.

DETECTED SUPPORT TYPE: ${supportType}
PROJECT SIZE: ${projectSize.size}
CALCULATED TIMELINE: ${projectSize.weeks}
CALCULATED HOURS: ${adjustedHoursMin}–${adjustedHoursMax} hours
CALCULATED COST: ${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}

STRUCTURE (use these exact headers and follow precisely):

## Short summary
Write 2–3 natural, human sentences rephrasing their situation and what they need. Show you understood.

## Here's how I'd approach this
${approachTemplates[supportType]}
(Adapt this slightly to their specific situation while keeping the core approach.)

## What you'll walk away with
Show these bullets:
${walkAwayTemplates[supportType].map(item => `- ${item}`).join('\n')}

## Timeline
**${projectSize.weeks}**
Depends on alignment speed and complexity.

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**
Final number depends on exact scope.

## Ballpark cost
**${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}**
Most projects like this usually land in this range, depending on final scope and complexity.

FORMATTING RULES:
- Use the exact headers shown above with ##
- Keep everything concise and scannable
- Be direct and concrete, but kind
- Don't add extra sections
- Don't mention hourly rates
- Write naturally, not robotically`;

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
