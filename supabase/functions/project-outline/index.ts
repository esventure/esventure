import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================================================
// CLASSIFICATION KEYWORDS - Priority order: Structure > Momentum > Prototype
// ============================================================================

// A. STRUCTURE / CLARITY WORK (highest priority)
const STRUCTURE_KEYWORDS = [
  'workflow', 'process', 'clarity', 'overview', 'structure', 'templates',
  'consistency', 'optimize', 'optimise', 'notion', 'airtable', 'tool setup',
  'mapping', 'cleaning up', 'clean up', 'everyone does it differently',
  'scattered tools', 'we lose track', 'lose track', 'inconsistent',
  'organise', 'organize', 'documentation', 'messy'
];

// B. MOMENTUM / DELIVERY WORK (type of support, not urgency)
const MOMENTUM_KEYWORDS = [
  'launch', 'delays', 'delay', 'stalled', 'slipping', 'slip', 'slips', 'slipped',
  'blocked', 'too many stakeholders', 'stakeholders', 'waiting on each other',
  'no clear owner', 'meetings with no progress', 'lost direction',
  'need structure', 'need movement', 'stuck', 'deadline', 'drifting',
  'coordination', 'execution', 'too many people', 'nobody knows',
  'decisions not being made', 'priorities unclear', 'responsibilities unclear',
  'coordination missing', 'chaotic', 'confusion',
  // Calendar / plan / marketing drift
  'calendar', 'content calendar', 'marketing calendar',
  'stick to the plan', 'stick to it',
  'never follow the plan', 'never follow the calendar',
  'planning but not doing', 'arguing about priorities',
  'meetings turn into debates', 'planning meetings turn into debates',
  'planning meetings always turn into debates'
];

// MOMENTUM OVERRIDE KEYWORDS (critical - these override Structure classification)
// If ANY of these appear, classify as Momentum even if structure keywords are present
// Structure = how work flows. Momentum = why work ISN'T flowing.
// If user's pain is about progress/movement/deadlines → ALWAYS Momentum
const MOMENTUM_OVERRIDE_KEYWORDS = [
  // Progress-blocking signals - calendar/plan not followed
  'calendar not being followed', 'not following calendar',
  'ignore the calendar', 'never stick to the plan',
  "don't stick to the plan", 'never stick to our plan',
  'never stick to our calendar', 'never stick to our marketing calendar',
  'never stick to it', 'we never stick to it', 'we never stick to the calendar',
  'we never stick to our calendar',
  
  // Things slipping variations
  'things keep slipping', 'things slipping', 'things slip',
  'things are slipping', 'things keep slipping through',
  'keep missing', 'keep slipping', 'keeps slipping',
  
  // Priority variations
  'priorities unclear', 'unclear priorities', 'priority unclear',
  'priorities get unclear', 'priorities get fuzzy',
  'priorities keep shifting', 'shifting priorities',
  
  // Planning not working variations
  'planning not translating', 'plans not translating',
  'plan not working', 'plan looks good but doesn\'t happen',
  'plan exists but we don\'t follow it',
  'calendar exists but we don\'t follow it',
  
  // Meeting variations
  'meetings unproductive', 'unproductive meetings',
  'meetings going nowhere', 'meetings go nowhere',
  'planning meetings turn into debates',
  'planning meetings always turn into debates',
  'meetings turn into debates', 'debating instead of deciding',
  'we debate instead of deciding',
  
  // Discussion stuck variations
  'team stuck in discussion', 'stuck in discussion',
  'endless discussions', 'all talk no action',
  'we talk but nothing happens', 'no progress', 'no movement',
  'not moving forward', "we're not moving forward",
  'lack of progress', 'nothing gets done',
  
  // Deadline and schedule signals
  'slipping deadline', 'deadline slipping', 'deadlines slipping',
  'missed deadline', 'missed deadlines',
  'behind schedule', 'we are behind', "we're behind", 'falling behind',
  'need to catch up', 'catch up', 'catching up', 'running late',
  
  // Team behavior signals  
  'team is improvising', 'improvising', 'making it up', 'winging it',
  'deliverables are drifting', 'deliverables drifting',
  'scope drifting', 'drifting',
  'onboarding is unstable', 'onboarding unstable', 'unstable onboarding',
  
  // Coordination signals
  'multiple teams', 'multi-team', 'many teams', 'several teams',
  'time-sensitive', 'time sensitive', 'tight timeline', 'tight deadline',
  'someone needs to coordinate', 'need coordination', 'needs coordination',
  'nobody is coordinating', 'no coordination', 'coordination missing',
  
  // Original signals
  'waiting on each other', 'people waiting', 'blocked by others',
  'abandon the plan'
];

// C. PROTOTYPE WORK
const PROTOTYPE_KEYWORDS = [
  'idea', 'concept', 'prototype', 'ux', 'ui', 'user flow', 'screens',
  'mockup', 'mvp', 'pitch', 'wireframe', 'design', 'validate'
];

// ============================================================================
// SUPPORT TYPE DETECTION
// ============================================================================

function detectSupportType(text: string, urgency: string): 'structure' | 'momentum' | 'prototype' {
  const lowerText = text.toLowerCase();
  
  // CRITICAL: MOMENTUM PRIORITY OVERRIDE
  // Structure = how work flows. Momentum = why work ISN'T flowing.
  // If user's pain is about progress/movement/deadlines → ALWAYS Momentum
  
  // Check 1: Explicit momentum override keywords
  const hasMomentumOverride = MOMENTUM_OVERRIDE_KEYWORDS.some(kw => lowerText.includes(kw));
  if (hasMomentumOverride) {
    console.log('Momentum override triggered - explicit progress/deadline keywords');
    return 'momentum';
  }
  
  // Check 2: "It's urgent 🔥" + any drift/coordination signals → Momentum
  // When user selects urgent AND mentions ANY project complexity, assume they need movement not structure
  if (urgency === "It's urgent 🔥") {
    const urgentMomentumSignals = [
      'deadline', 'launch', 'team', 'stakeholder', 'coordinate', 'coordination',
      'behind', 'slipping', 'stuck', 'blocked', 'stalled', 'delay', 'drifting',
      'unclear', 'waiting', 'multiple', 'several', 'busy', 'complex'
    ];
    const hasUrgentMomentumSignal = urgentMomentumSignals.some(signal => lowerText.includes(signal));
    if (hasUrgentMomentumSignal) {
      console.log('Momentum override triggered - urgent + drift/coordination signals');
      return 'momentum';
    }
  }
  
  // Check 3: Even with structure keywords, if ANY momentum signal exists alongside urgency → Momentum
  // "workflow unclear AND we are behind schedule" → Momentum (not Structure)
  const hasMomentumKeyword = MOMENTUM_KEYWORDS.some(kw => lowerText.includes(kw));
  const hasStructureKeyword = STRUCTURE_KEYWORDS.some(kw => lowerText.includes(kw));
  
  if (hasStructureKeyword && hasMomentumKeyword) {
    // Mixed signals - check if the pain is about movement/deadlines
    const driftSignals = [
      'behind', 'deadline', 'slipping', 'stuck', 'stalled', 'blocked', 
      'delay', 'drifting', 'improvising', 'catch up', 'urgent', 'launch'
    ];
    const hasDriftPain = driftSignals.some(signal => lowerText.includes(signal));
    if (hasDriftPain) {
      console.log('Momentum override triggered - mixed signals but drift pain detected');
      return 'momentum';
    }
  }
  
  // Check 3.5: Planning / calendar drift fallback (Momentum bias)
  // If text mentions planning/scheduling concepts with "not following" signals → prefer Momentum
  const planningDriftSignals = [
    'calendar', 'content calendar', 'marketing calendar',
    'plan', 'planning', 'priorities', 'priority', 'meeting'
  ];
  const hasPlanningDrift = planningDriftSignals.some(signal => lowerText.includes(signal));
  
  // Only apply if NOT a very strong, explicit structure-only signal
  const strongStructureOnly = ['documenting a process', 'mapping a workflow', 'creating templates', 'building a template']
    .some(phrase => lowerText.includes(phrase));
  
  if (hasPlanningDrift && !strongStructureOnly) {
    // Check if there are ANY delay/slip/not-following signals
    const notFollowingSignals = ['not follow', 'never stick', "don't stick", 'arguing', 'debates', 'not working', 'slipping', 'behind', 'shifting'];
    if (notFollowingSignals.some(sig => lowerText.includes(sig))) {
      console.log('Momentum override triggered - planning/calendar drift fallback');
      return 'momentum';
    }
  }
  
  // STRUCTURE has priority (if no momentum override)
  if (hasStructureKeyword) {
    return 'structure';
  }
  
  // PROTOTYPE beats MOMENTUM only if explicitly describing building a prototype
  const hasPrototypeKeyword = PROTOTYPE_KEYWORDS.some(kw => lowerText.includes(kw));
  
  // Check for explicit prototype context
  const explicitPrototype = ['build a prototype', 'create a prototype', 'make a prototype', 
    'design a prototype', 'need a prototype', 'want a prototype', 'prototype for']
    .some(phrase => lowerText.includes(phrase));
  
  if (hasPrototypeKeyword && (explicitPrototype || !hasMomentumKeyword)) {
    return 'prototype';
  }
  
  if (hasMomentumKeyword) {
    return 'momentum';
  }
  
  // Ambiguous → default to Structure
  return 'structure';
}

// ============================================================================
// PROJECT SIZING - Fixed buckets, not calculated
// ============================================================================

type ProjectSize = 'small' | 'medium' | 'large' | 'very-large';

interface SizeConfig {
  size: ProjectSize;
  hoursMin: number;
  hoursMax: number;
  weeks: string;
  costMin: number;
  costMax: number;
}

// FIXED COST BUCKETS - Must ALWAYS use these exact ranges
const SIZE_CONFIGS: Record<ProjectSize, SizeConfig> = {
  'small': {
    size: 'small',
    hoursMin: 8,
    hoursMax: 12,
    weeks: '1–2 weeks',
    costMin: 1000,
    costMax: 1800
  },
  'medium': {
    size: 'medium',
    hoursMin: 12,
    hoursMax: 20,
    weeks: '2–4 weeks',
    costMin: 1800,
    costMax: 3200
  },
  'large': {
    size: 'large',
    hoursMin: 20,
    hoursMax: 35,
    weeks: '3–6 weeks',
    costMin: 3200,
    costMax: 5000
  },
  'very-large': {
    size: 'very-large',
    hoursMin: 35,
    hoursMax: 50,
    weeks: '5–8 weeks',
    costMin: 5000,
    costMax: 8000
  }
};

function determineProjectSize(inputs: {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
  supportType: 'structure' | 'momentum' | 'prototype';
}): SizeConfig {
  const fullText = `${inputs.situation} ${inputs.handoff}`.toLowerCase();
  
  // Complexity indicators
  const largeIndicators = [
    'multiple teams', 'multi-team', 'stakeholders', 'integration', 'integrations', 
    'api', 'apis', 'testing', 'uat', 'e2e', 'migration', 'complex', 'unclear scope',
    'launch', 'slipping', 'deadline', 'priorities unclear', 'responsibilities unclear',
    'lost direction', 'coordination missing'
  ];
  
  const veryLargeIndicators = [
    'many teams', 'enterprise', 'organization-wide', 'company-wide', 
    'long-term', 'months', 'technical debt'
  ];
  
  const smallIndicators = [
    'simple', 'quick', 'single', 'just one', 'one deliverable', 'tiny',
    'small task', 'quick fix', 'founder', 'solo'
  ];
  
  let complexityScore = 0;
  
  // Count complexity signals
  largeIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 1;
  });
  
  veryLargeIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore += 2;
  });
  
  smallIndicators.forEach(indicator => {
    if (fullText.includes(indicator)) complexityScore -= 1;
  });
  
  // Budget signals
  if (inputs.budget === '€6.000+') complexityScore += 2;
  else if (inputs.budget === '€3.000–€6.000') complexityScore += 1;
  else if (inputs.budget === '< €1.000') complexityScore -= 1;
  
  // URGENCY-BASED SIZING (affects sizing, not classification)
  // "It's urgent 🔥" with complexity indicators → push towards Large
  if (inputs.urgency === "It's urgent 🔥") {
    const urgentLargeIndicators = ['deadline', 'multiple', 'team', 'stalled', 'stuck', 'blocked', 'launch'];
    const hasUrgentComplexity = urgentLargeIndicators.some(indicator => fullText.includes(indicator));
    if (hasUrgentComplexity) {
      complexityScore += 1;
    }
  }
  
  // STRUCTURE WORK: Defaults to Medium
  if (inputs.supportType === 'structure') {
    // Only Small if very explicitly tiny
    const isTiny = ['just one template', 'single template', 'one simple document', 'very quick', 'tiny']
      .some(indicator => fullText.includes(indicator));
    
    if (complexityScore >= 5) return SIZE_CONFIGS['very-large'];
    if (complexityScore >= 3) return SIZE_CONFIGS['large'];
    if (isTiny && complexityScore <= -2) return SIZE_CONFIGS['small'];
    return SIZE_CONFIGS['medium']; // DEFAULT
  }
  
  // MOMENTUM WORK: Defaults to Medium, upsize to Large on complexity
  if (inputs.supportType === 'momentum') {
    const isTiny = ['just one task', 'single task', 'one quick call', 'very quick', 'tiny']
      .some(indicator => fullText.includes(indicator));
    
    // Upsize to Large when: launch, multiple teams, deadlines slipping, priorities unclear
    const momentumLargeIndicators = [
      'launch', 'multiple team', 'multi-team', 'deadline', 'slipping',
      'priorities unclear', 'responsibilities unclear', 'coordination missing',
      'lost direction', 'scope unclear'
    ];
    const hasLargeIndicator = momentumLargeIndicators.some(indicator => fullText.includes(indicator));
    
    if (complexityScore >= 5) return SIZE_CONFIGS['very-large'];
    if (complexityScore >= 3 || hasLargeIndicator) return SIZE_CONFIGS['large'];
    if (isTiny && complexityScore <= -2) return SIZE_CONFIGS['small'];
    return SIZE_CONFIGS['medium']; // DEFAULT
  }
  
  // PROTOTYPE WORK: Small–Medium depending on complexity
  if (complexityScore >= 5) return SIZE_CONFIGS['very-large'];
  if (complexityScore >= 3) return SIZE_CONFIGS['large'];
  if (complexityScore >= 1) return SIZE_CONFIGS['medium'];
  return SIZE_CONFIGS['small'];
}

// ============================================================================
// MODIFIERS - Only affect hours, NOT cost buckets
// ============================================================================

function calculateHourModifier(inputs: {
  urgency: string;
  situation: string;
  handoff: string;
}): number {
  let modifier = 0;
  const fullText = `${inputs.situation} ${inputs.handoff}`.toLowerCase();
  
  // URGENCY MODIFIERS
  switch (inputs.urgency) {
    case 'Just exploring':
      // No modifier
      break;
    case 'Soon':
      // Baseline, no modifier
      break;
    case 'Needs attention':
      modifier += 10;
      break;
    case "It's urgent 🔥":
      modifier += 20;
      break;
  }
  
  // COMPLEXITY MODIFIERS
  if (fullText.includes('testing') || fullText.includes('uat') || fullText.includes('e2e')) {
    modifier += 20;
  }
  if (fullText.includes('integration') || fullText.includes('api')) {
    modifier += 15;
  }
  if (fullText.includes('multiple team') || fullText.includes('multi-team')) {
    modifier += 15;
  }
  if (fullText.includes('unclear') || fullText.includes("don't know what") || fullText.includes('scope unclear')) {
    modifier += 10;
  }
  
  // Cap at 40%
  return Math.min(modifier, 40);
}

// ============================================================================
// FORMATTING
// ============================================================================

function formatCurrency(amount: number): string {
  return `€${amount.toLocaleString('de-DE')}`;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

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

    // 1. CLASSIFY SUPPORT TYPE (urgency can trigger Momentum override)
    const fullText = `${situation} ${handoff}`;
    const supportType = detectSupportType(fullText, urgency);
    
    // 2. DETERMINE PROJECT SIZE (includes urgency-based sizing)
    const sizeConfig = determineProjectSize({ situation, handoff, urgency, budget, supportType });
    
    // 3. CALCULATE HOUR MODIFIER (urgency + complexity)
    const hourModifier = calculateHourModifier({ urgency, situation, handoff });
    
    // 4. ADJUST HOURS (modifiers apply to hours, NOT to cost buckets)
    const adjustedHoursMin = Math.round(sizeConfig.hoursMin * (1 + hourModifier / 100));
    const adjustedHoursMax = Math.round(sizeConfig.hoursMax * (1 + hourModifier / 100));
    
    // 5. COST COMES FROM FIXED BUCKET (never calculated from hours)
    const costMin = sizeConfig.costMin;
    const costMax = sizeConfig.costMax;

    console.log('=== Project Plan Generator ===');
    console.log('Support type:', supportType);
    console.log('Project size:', sizeConfig.size);
    console.log('Hour modifier:', hourModifier + '%');
    console.log('Adjusted hours:', adjustedHoursMin, '-', adjustedHoursMax);
    console.log('Cost bucket:', formatCurrency(costMin), '-', formatCurrency(costMax));

    // Approach templates - numbered steps
    const approachTemplates = {
      structure: `1. I'd start with a fast deep-dive to understand how things work today and where the friction sits.
2. From there, I map and simplify the workflow into something clear, realistic, and easy for the team to follow.
3. If a lightweight tool helps (Notion, Airtable), I'll set it up in a way that removes noise instead of adding more.
4. The goal is calm, clarity, and a structure your team can actually use day-to-day.`,
      
      momentum: `1. I'll start with a diagnostic to understand what's blocking progress and why things keep stalling.
2. Then I stabilise the scope and priorities so we all know what matters most right now.
3. I take ownership of coordination and make sure decisions get made and followed through.
4. Every week, you'll see visible progress and clear updates on what's moving.`,
      
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

    // Urgency-based tone guidance
    let toneGuidance = '';
    switch (urgency) {
      case 'Just exploring':
        toneGuidance = 'Use the softest, calmest tone. No pressure.';
        break;
      case 'Soon':
        toneGuidance = 'Neutral professional tone.';
        break;
      case 'Needs attention':
        toneGuidance = 'Confident and proactive tone. The project is active but stuck.';
        break;
      case "It's urgent 🔥":
        toneGuidance = 'Direct, decisive tone (still warm, never dramatic). Immediate attention needed.';
        break;
      default:
        toneGuidance = 'Warm, professional tone.';
    }

    const systemPrompt = `You are Esther, a warm, down-to-earth freelance consultant writing a project plan.

VOICE & TONE:
- Warm, clear, calm, direct
- Professional but human
- No corporate jargon, no hype, no over-enthusiasm
- No exclamation marks unless user uses them
- Write like a senior consultant with empathy and clarity
- NEVER use double hyphens (--). Use proper punctuation or a single dash if needed
- ${toneGuidance}

DETECTED SUPPORT TYPE: ${supportType}
PROJECT SIZE: ${sizeConfig.size}

SECTION ORDER RULE (CRITICAL - prevents duplicate/nested headings):
You MUST output sections in this EXACT order. "Short summary" is ALWAYS first. "Here's how I'd tackle this" is ALWAYS second.
NEVER nest headings. NEVER output "Here's how I'd tackle this" before "Short summary".

## Short summary
Write 2–3 warm sentences rephrasing their situation and what they need. Start naturally with "So..." or "Sounds like..." — show you actually got it.

## Here's how I'd tackle this
${approachTemplates[supportType]}

(Keep the numbered step format. Each step starts with a number.)

## What you'd walk away with
${walkAwayTemplates[supportType].map(item => `- ${item}`).join('\n')}

## Timeline
**${sizeConfig.weeks}**
Depends on alignment speed and complexity.

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**

## Ballpark cost
**${formatCurrency(costMin)}–${formatCurrency(costMax)}**
Most projects like this typically land in this range depending on final scope.

CRITICAL RULES:
- "Short summary" MUST be the first visible section heading
- "Here's how I'd tackle this" MUST be the second section heading
- Output all 6 sections in this EXACT order
- NEVER omit any section
- NEVER nest or repeat section headings
- Keep numbered steps for UX clarity
- Don't mention hourly rates
- NEVER use double hyphens (--)`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Urgency: ${urgency || "not specified"}
- Budget comfort zone: ${budget || "not specified"}

Generate the project plan using the structure above. Be human, warm, and direct.`;

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
