import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords for auto-detection - STRUCTURE has highest priority
const STRUCTURE_KEYWORDS = [
  'workflow', 'process', 'clarity', 'overview', 'tooling', 'templates',
  'structure', 'organise', 'organize', 'clean up', 'make sense', 'optimise',
  'optimize', 'inconsistent', 'everyone doing their own thing', 'notion',
  'airtable', 'system setup', 'mapping', 'messy', 'chaos', 'documentation'
];

// MOMENTUM WORK: Project needs ownership, coordination, unblocking, clarification, renewed movement
// Momentum is a support TYPE, not urgency level. Urgency modifies hours/tone, not classification.
const MOMENTUM_KEYWORDS = [
  'stuck', 'stalled', 'delays', 'delay', 'slipping', 'timeline', 'need ownership',
  'coordination', 'launch', 'execution', 'blocked', 'delivery', 'drifting',
  'too many people', 'too many stakeholders', 'no clear owner', 'nobody knows',
  'deadline', 'momentum', 'rescue', 'chaotic', 'confusion', 'unclear next steps',
  'decisions not being made', 'lost direction', 'priorities unclear',
  'responsibilities unclear', 'coordination missing', 'communication chaos'
];

const PROTOTYPE_KEYWORDS = [
  'idea', 'concept', 'prototype', 'ux', 'ui', 'mockup', 'user flow',
  'screens', 'pitch', 'validate', 'mvp', 'wireframe', 'design'
];

function detectSupportType(text: string): 'structure' | 'momentum' | 'prototype' {
  const lowerText = text.toLowerCase();
  
  // STRUCTURE has highest priority - if ANY structure keyword appears, classify as structure
  const hasStructureKeyword = STRUCTURE_KEYWORDS.some(kw => lowerText.includes(kw));
  if (hasStructureKeyword) {
    return 'structure';
  }
  
  // Check for momentum keywords (only if no structure keywords)
  const hasMomentumKeyword = MOMENTUM_KEYWORDS.some(kw => lowerText.includes(kw));
  if (hasMomentumKeyword) {
    return 'momentum';
  }
  
  // Check for prototype keywords (only if no structure or momentum keywords)
  const hasPrototypeKeyword = PROTOTYPE_KEYWORDS.some(kw => lowerText.includes(kw));
  if (hasPrototypeKeyword) {
    return 'prototype';
  }
  
  // Default to structure (most common and safest)
  return 'structure';
}

function determineProjectSize(inputs: {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
  supportType: 'structure' | 'momentum' | 'prototype';
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
  const largeIndicators = ['multiple teams', 'multi-team', 'stakeholders', 'integration', 'integrations', 'api', 'apis', 'testing', 'uat', 'e2e', 'migration', 'complex', 'unclear scope'];
  largeIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 2;
  });
  
  // Medium complexity indicators
  const mediumIndicators = ['multiple', 'team', 'alignment', 'several', 'deliverables'];
  mediumIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 1;
  });
  
  // Simple indicators (reduce complexity)
  const simpleIndicators = ['simple', 'quick', 'small', 'single', 'just one', 'founder', 'solo', 'one deliverable'];
  simpleIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore -= 1;
  });
  
  // URGENCY-BASED SIZING ADJUSTMENTS
  // Just exploring: no pressure, sizing based purely on complexity
  if (inputs.urgency === 'Just exploring') {
    complexityScore -= 1; // Slightly reduce perceived complexity
  }
  
  // Needs attention: project is stuck/drifting - avoid Small unless micro-task
  // Upscale to Large if complexity keywords appear
  if (inputs.urgency === 'Needs attention') {
    // Avoid Small for "Needs attention" - default to Medium minimum
    if (complexityScore <= 0) {
      complexityScore = 1; // Push towards Medium
    }
    // Upscale to Large if complexity indicators present
    if (complexityScore >= 3) {
      complexityScore += 1;
    }
  }
  
  // It's urgent 🔥: often Medium → Large, especially with complexity
  if (inputs.urgency === "It's urgent 🔥") {
    // Push towards larger sizes
    complexityScore += 1;
    // If deadlines, multiple teams, or stalled project mentioned, lean Large
    const urgentLargeIndicators = ['deadline', 'multiple', 'team', 'stalled', 'stuck', 'blocked', 'scope unclear'];
    const hasUrgentComplexity = urgentLargeIndicators.some(indicator => fullText.includes(indicator));
    if (hasUrgentComplexity) {
      complexityScore += 1;
    }
  }
  
  // STRUCTURE WORK: Default to Medium unless explicitly tiny
  // Structure work should rarely be Small - workflows, processes, templates inherently need time
  if (inputs.supportType === 'structure') {
    // Only allow Small for structure if VERY explicit tiny indicators
    const tinyIndicators = ['just one template', 'single template', 'one simple', 'very quick', 'tiny'];
    const isTiny = tinyIndicators.some(indicator => fullText.includes(indicator));
    
    if (complexityScore >= 4) {
      return { size: 'large', baseHoursMin: 20, baseHoursMax: 35, weeks: '3–6 weeks' };
    } else if (isTiny && complexityScore <= -2 && inputs.urgency !== 'Needs attention' && inputs.urgency !== "It's urgent 🔥") {
      // Only Small if explicitly tiny, low complexity, AND not urgent
      return { size: 'small', baseHoursMin: 8, baseHoursMax: 12, weeks: '1–2 weeks' };
    } else {
      // Default Structure to Medium (2–3 weeks timeline)
      return { size: 'medium', baseHoursMin: 12, baseHoursMax: 20, weeks: '2–3 weeks' };
    }
  }
  
  // MOMENTUM WORK: Default to Medium (18-28 hours, 3-5 weeks, €2.800-€4.200)
  // Momentum work should NEVER default to Small unless explicitly tiny
  // Upsize to Large when: launch, multiple teams, deadlines slipping, priorities unclear, etc.
  if (inputs.supportType === 'momentum') {
    const tinyIndicators = ['just one task', 'single task', 'one quick', 'very quick', 'tiny'];
    const isTiny = tinyIndicators.some(indicator => fullText.includes(indicator));
    
    // Large indicators specific to momentum work
    const momentumLargeIndicators = [
      'launch', 'multiple team', 'multi-team', 'deadline', 'slipping',
      'priorities unclear', 'responsibilities unclear', 'coordination missing',
      'lost direction', 'scope unclear', 'complex', 'stakeholders'
    ];
    const hasLargeIndicator = momentumLargeIndicators.some(indicator => fullText.includes(indicator));
    
    if (complexityScore >= 4 || hasLargeIndicator) {
      return { size: 'large', baseHoursMin: 28, baseHoursMax: 40, weeks: '4–6 weeks' };
    } else if (isTiny && complexityScore <= -2 && inputs.urgency !== 'Needs attention' && inputs.urgency !== "It's urgent 🔥") {
      // Only Small if explicitly tiny, low complexity, AND not urgent
      return { size: 'small', baseHoursMin: 10, baseHoursMax: 15, weeks: '1–2 weeks' };
    } else {
      // Default Momentum to Medium (3–5 weeks timeline, 18-28 hours)
      return { size: 'medium', baseHoursMin: 18, baseHoursMax: 28, weeks: '3–5 weeks' };
    }
  }
  
  // PROTOTYPE WORK: Can be Small or Medium based on complexity
  // But respect urgency rules - "Needs attention" and "Urgent" avoid Small
  if (complexityScore <= 0 && inputs.urgency !== 'Needs attention' && inputs.urgency !== "It's urgent 🔥") {
    return { size: 'small', baseHoursMin: 8, baseHoursMax: 12, weeks: '1–2 weeks' };
  } else if (complexityScore <= 3) {
    return { size: 'medium', baseHoursMin: 12, baseHoursMax: 20, weeks: '2–4 weeks' };
  } else {
    return { size: 'large', baseHoursMin: 20, baseHoursMax: 35, weeks: '3–6 weeks' };
  }
}

function calculateModifiers(inputs: {
  urgency: string;
  situation: string;
  handoff: string;
}): number {
  let modifier = 0;
  const fullText = `${inputs.situation} ${inputs.handoff}`.toLowerCase();
  
  // Urgency modifier (updated logic)
  // Just exploring: no pressure, no modifier (was -10%, now 0%)
  // Soon: baseline, no modifier
  // Needs attention: +10% (project stuck/drifting)
  // It's urgent 🔥: +20% (immediate attention needed)
  switch (inputs.urgency) {
    case 'Just exploring':
      // No modifier - sizing determined purely by complexity
      break;
    case 'Soon':
      // Baseline, no change
      break;
    case 'Needs attention':
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
  if (fullText.includes('multiple team') || fullText.includes('multi-team')) {
    modifier += 15;
  }
  if (fullText.includes('unclear') || fullText.includes("don't know what")) {
    modifier += 10;
  }
  
  // Cap at 40%
  return Math.min(modifier, 40);
}

function calculateCostRange(size: string, modifier: number, supportType: string): { min: number; max: number } {
  // Base rate: €100/hour
  const baseRanges: Record<string, Record<string, { min: number; max: number }>> = {
    momentum: {
      small: { min: 1000, max: 1500 },   // 10-15 hours @ €100
      medium: { min: 1800, max: 2800 },  // 18-28 hours @ €100
      large: { min: 2800, max: 4000 },   // 28-40 hours @ €100
    },
    structure: {
      small: { min: 800, max: 1200 },    // 8-12 hours @ €100
      medium: { min: 1200, max: 2000 },  // 12-20 hours @ €100
      large: { min: 2000, max: 3500 },   // 20-35 hours @ €100
    },
    prototype: {
      small: { min: 800, max: 1200 },    // 8-12 hours @ €100
      medium: { min: 1200, max: 2000 },  // 12-20 hours @ €100
      large: { min: 2000, max: 3500 },   // 20-35 hours @ €100
    },
  };
  
  const typeRanges = baseRanges[supportType] || baseRanges.structure;
  const range = typeRanges[size] || typeRanges.medium;
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
    const projectSize = determineProjectSize({ situation, handoff, urgency, budget, supportType });
    const modifier = calculateModifiers({ urgency, situation, handoff });
    const costRange = calculateCostRange(projectSize.size, modifier, supportType);
    
    // Adjust hours based on modifier
    const adjustedHoursMin = Math.round(projectSize.baseHoursMin * (1 + modifier / 100));
    const adjustedHoursMax = Math.round(projectSize.baseHoursMax * (1 + modifier / 100));

    // Approach templates - numbered steps, conversational
    const approachTemplates = {
      structure: `1. I'd start with a fast deep-dive to understand how things work today and where the friction sits.
2. From there, I map and simplify the workflow into something clear, realistic, and easy for the team to follow.
3. If a lightweight tool helps (Notion, Airtable), I'll set it up in a way that removes noise instead of adding more.
4. The goal is calm, clarity, and a structure your team can actually use day-to-day.`,
      
      momentum: `1. I'll begin with a short diagnostic to see what's blocking progress and where things get stuck.
2. Then I stabilise the scope, set the priorities, and take ownership of the next steps.
3. Expect clear communication and visible progress each week, without adding unnecessary complexity.
4. My goal is to bring momentum back quickly and make everything feel manageable again.`,
      
      prototype: `1. We'll unpack the idea and define what you want it to achieve.
2. Then I'll shape a simple user flow and build a clean clickable prototype.
3. It's perfect for testing, alignment, or pitching, giving you something tangible, fast.
4. You'll have a clear concept that's ready for next steps.`
    };

    // Walk away with templates
    const walkAwayTemplates = {
      structure: [
        'A clear, unified workflow',
        'Practical templates',
        'Optional lightweight tooling setup',
        'A simple next-steps plan'
      ],
      momentum: [
        'Ownership of next steps',
        'Realistic priorities',
        'Weekly visible progress',
        'Clear communication'
      ],
      prototype: [
        'Clickable prototype',
        'User flow + structure',
        'Testing-ready concept',
        'Clear next steps'
      ]
    };

    const systemPrompt = `You are Esther, a warm, down-to-earth freelance consultant writing a project plan for someone who just described their situation. 

VOICE & TONE:
- Warm, conversational, concise, confident
- Human but not overly casual
- No corporate jargon, no AI-ish phrasing
- Clear, energetic, structured
- NEVER use double hyphens (--). Use proper punctuation, commas, or a single dash if needed
- Sound like someone genuinely rolling up their sleeves to help

DETECTED SUPPORT TYPE: ${supportType}
PROJECT SIZE: ${projectSize.size}

STRUCTURE (use these exact headers and format):

## Short summary
Write 2–3 warm sentences rephrasing their situation and what they need. Start naturally with "So..." or "Sounds like..." — show you actually got it.

## Here's how I'd tackle this
${approachTemplates[supportType]}

(Keep the numbered step format. Each step starts with a number.)

## What you'd walk away with
${walkAwayTemplates[supportType].map(item => `- ${item}`).join('\n')}

## Timeline
**${projectSize.weeks}**
Depends on alignment speed and complexity.

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**

## Ballpark cost
**${formatCurrency(costRange.min)}–${formatCurrency(costRange.max)}**
Most projects like this typically land in this range depending on final scope.

FORMATTING RULES:
- Use the exact headers above with ##
- Keep the approach as a numbered list (1. 2. 3. 4.)
- Be scannable and easy to read
- Sound like a real human, not a proposal generator
- Don't add extra sections or mention hourly rates
- NEVER use double hyphens (--) anywhere`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Urgency: ${urgency || "not specified"}
- Budget comfort zone: ${budget || "not specified"}

Generate the project plan using the structure above. Be human, warm, and direct.`;

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
