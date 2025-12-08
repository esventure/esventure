import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords for auto-detection
const PROTOTYPE_KEYWORDS = ['prototype', 'design', 'ux', 'ui', 'flows', 'screens', 'idea', 'concept', 'pitch', 'mvp', 'mockup', 'wireframe'];
const STRUCTURE_KEYWORDS = ['workflow', 'process', 'messy', 'tool setup', 'notion', 'system', 'optimise', 'optimize', 'unclear', 'documentation', 'organize', 'organise'];
const DELIVERY_KEYWORDS = ['delays', 'stuck', 'timelines slipping', 'coordination', 'project', 'ownership', 'deadline', 'momentum', 'blocked', 'rescue'];

function detectWorkType(text: string): string {
  const lowerText = text.toLowerCase();
  
  let prototypeScore = 0;
  let structureScore = 0;
  let deliveryScore = 0;
  
  PROTOTYPE_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) prototypeScore++;
  });
  STRUCTURE_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) structureScore++;
  });
  DELIVERY_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw)) deliveryScore++;
  });
  
  if (prototypeScore >= structureScore && prototypeScore >= deliveryScore) {
    return 'prototype';
  } else if (structureScore >= deliveryScore) {
    return 'structure';
  } else {
    return 'delivery';
  }
}

function mapSupportType(supportType: string, fullText: string): string {
  switch (supportType) {
    case 'messy-process':
      return 'structure';
    case 'structure-clarity':
      return 'structure-momentum';
    case 'idea-to-real':
      return 'prototype';
    case 'regain-momentum':
      return 'delivery';
    case 'unsure':
    default:
      return detectWorkType(fullText);
  }
}

function determineProjectSize(inputs: {
  situation: string;
  handoff: string;
  context: string;
  budget: string;
  urgency: string;
  teamSize: string;
}): { size: string; baseHoursMin: number; baseHoursMax: number; weeks: string } {
  const fullText = `${inputs.situation} ${inputs.handoff} ${inputs.context}`.toLowerCase();
  
  // Scoring factors
  let complexityScore = 0;
  
  // Team size factor
  if (inputs.teamSize === 'growing' || inputs.teamSize === 'large') {
    complexityScore += 2;
  } else if (inputs.teamSize === 'small') {
    complexityScore += 1;
  }
  
  // Budget factor
  if (inputs.budget === '€6.000+') {
    complexityScore += 2;
  } else if (inputs.budget === '€3.000–€6.000') {
    complexityScore += 1;
  } else if (inputs.budget === '< €1.000') {
    complexityScore -= 1;
  }
  
  // Text complexity indicators
  const complexityIndicators = ['multiple', 'teams', 'integration', 'api', 'testing', 'uat', 'e2e', 'migration', 'stakeholders', 'complex', 'unclear'];
  complexityIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore++;
  });
  
  // Simple indicators
  const simpleIndicators = ['simple', 'quick', 'small', 'one', 'single', 'just'];
  simpleIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore--;
  });
  
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
  teamSize: string;
  situation: string;
  handoff: string;
  context: string;
}): number {
  let modifier = 0;
  const fullText = `${inputs.situation} ${inputs.handoff} ${inputs.context}`.toLowerCase();
  
  // Urgency modifier
  switch (inputs.urgency) {
    case 'Just exploring':
      modifier -= 10;
      break;
    case 'Starting soon':
      break;
    case 'Need momentum':
      modifier += 10;
      break;
    case "It's getting urgent 🔥":
      modifier += 20;
      break;
  }
  
  // Team size modifier
  if (inputs.teamSize === 'growing') {
    modifier += 10;
  } else if (inputs.teamSize === 'large') {
    modifier += 25;
  }
  
  // Complexity keywords
  if (fullText.includes('testing') || fullText.includes('uat') || fullText.includes('e2e')) {
    modifier += 20;
  }
  if (fullText.includes('integration') || fullText.includes('api')) {
    modifier += 15;
  }
  if (fullText.includes('migration')) {
    modifier += 20;
  }
  if (fullText.includes('stakeholder') || fullText.includes('multiple team')) {
    modifier += 15;
  }
  if (fullText.includes('unclear') || fullText.includes('unknown')) {
    modifier += 10;
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
    const { situation, handoff, supportType, urgency, context, budget, teamSize } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const fullText = `${situation} ${handoff} ${context}`;
    const workType = mapSupportType(supportType, fullText);
    const projectSize = determineProjectSize({ situation, handoff, context, budget, urgency, teamSize });
    const modifier = calculateModifiers({ urgency, teamSize, situation, handoff, context });
    const costRange = calculateCostRange(projectSize.size, modifier);
    
    // Adjust hours based on modifier
    const adjustedHoursMin = Math.round(projectSize.baseHoursMin * (1 + modifier / 100));
    const adjustedHoursMax = Math.round(projectSize.baseHoursMax * (1 + modifier / 100));

    // Map support type labels
    const supportTypeLabels: Record<string, string> = {
      'messy-process': 'Make sense of a messy process',
      'structure-clarity': 'Bring structure and clarity to a project',
      'idea-to-real': 'Turn an idea into something real',
      'regain-momentum': 'Help a team regain momentum',
      'unsure': 'Not sure yet',
    };

    const systemPrompt = `You are Esther, a warm, pragmatic freelance consultant. A visitor described their project — generate a clear, human project plan.

TONE: Warm, clear, low-ego, confident, human, practical. No corporate buzzwords. No AI-sounding sentences. Write like someone genuinely rolling up their sleeves.

WORK TYPE DETECTED: ${workType}
PROJECT SIZE: ${projectSize.size}
CALCULATED TIMELINE: ${projectSize.weeks}
CALCULATED HOURS: ${adjustedHoursMin}–${adjustedHoursMax} hours
CALCULATED COST: ${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}

STRUCTURE (use these exact headers and follow the structure precisely):

## Quick summary
Rephrase their input in 1–2 natural, human sentences. Show you understood what they're dealing with.

## Here's how I'd approach this
${workType === 'structure' || workType === 'structure-momentum' ? `Write this approach (adapt slightly based on their specific situation):
I'd begin with a fast deep-dive to understand how things work today and where the confusion or friction sits.
Then I map the workflow, simplify it, and turn it into something clear and practical — not theoretical.
If tools are needed (Notion, Airtable, automations), I'll set up only what genuinely helps.
You'll get clarity, focus, and a structure the team can actually use.` : ''}
${workType === 'prototype' ? `Write this approach (adapt slightly based on their specific situation):
We'll unpack the idea and define what it really needs to do.
From there I'll design a simple, intuitive flow and build a clean clickable prototype.
It's perfect for user testing, internal alignment, or pitching — giving you something real, fast.` : ''}
${workType === 'delivery' ? `Write this approach (adapt slightly based on their specific situation):
I'll start with a quick diagnostic to understand what's blocking progress.
Then I stabilise the scope, map priorities, and take ownership of the next steps.
Expect clear communication, structure, and visible progress each week.
My goal: get your project moving again without overcomplication.` : ''}

## What you'll walk away with
${workType === 'structure' || workType === 'structure-momentum' ? `Show 3-4 bullets like:
- A clear and usable workflow
- Simplified process
- Practical next steps
- Optional tool setup (if relevant)` : ''}
${workType === 'prototype' ? `Show 3-4 bullets like:
- Clickable prototype
- User flow + screens
- Testing-ready mockup
- Clear assumptions documented` : ''}
${workType === 'delivery' ? `Show 3-4 bullets like:
- Structured plan
- Ownership of progress
- Clear priorities
- Weekly momentum` : ''}

## Estimated timeline
**${projectSize.weeks}**
Depends on how quickly we align and how complex the input is.

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**
Final number depends on exact scope.

## Ballpark cost
**${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}**
Not a quote — just a sense of what similar projects needed.

FORMATTING:
- Use the exact headers shown above with ##
- Keep everything concise and scannable
- Be direct and concrete, but kind
- Don't add extra sections
- Don't mention hourly rates`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Type of support: ${supportTypeLabels[supportType] || supportType || "not specified"}
- Urgency: ${urgency || "not specified"}
- Additional context: ${context || "none"}
- Budget comfort zone: ${budget || "not specified"}
- Team size: ${teamSize || "not specified"}

Generate the project plan using the structure above. Be human, not robotic.`;

    console.log('Calling Lovable AI for project plan...');
    console.log('Work type:', workType);
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
