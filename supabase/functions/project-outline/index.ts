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
  'planning meetings always turn into debates',
  // Coordination / ownership / role clarity
  'unclear roles', 'unclear responsibilities', 'roles unclear', 
  'responsibilities unclear', 'role confusion', 'who does what',
  'nobody knows who does what', 'ownership unclear', 'unclear ownership',
  'duplicated work', 'doing things twice', 'things done twice',
  'missed tasks', 'tasks slipping', 'tasks not getting done',
  'lack of coordination', 'coordination all over the place',
  'inconsistent interpretation', 'everyone interprets it differently'
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
  
  // Ownership / role clarity signals
  'ownership unclear', 'unclear ownership', 'nobody owns it', 
  'duplicated work', 'things get done twice', 'doing things twice',
  'missed tasks', 'tasks not getting done',
  'everyone interprets it differently', 'plan interpreted differently',
  'coordination all over the place', 'lack of coordination',
  'who does what is unclear', 'unclear roles', 'roles unclear',
  
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
// MOMENTUM SUB-TYPE DETECTION
// ============================================================================

type MomentumSubType = 'calendar_drift' | 'deadline_pressure' | 'coordination_issues' | 'progress_blocked' | 'general';

interface DetectedSignals {
  matchedOverrideKeywords: string[];
  matchedMomentumKeywords: string[];
  matchedStructureKeywords: string[];
  matchedPrototypeKeywords: string[];
  complexityIndicators: string[];
  momentumSubType: MomentumSubType;
  userPainPoints: string[];
}

function extractDetectedSignals(text: string): DetectedSignals {
  const lowerText = text.toLowerCase();
  
  // Extract matched keywords
  const matchedOverrideKeywords = MOMENTUM_OVERRIDE_KEYWORDS.filter(kw => lowerText.includes(kw));
  const matchedMomentumKeywords = MOMENTUM_KEYWORDS.filter(kw => lowerText.includes(kw));
  const matchedStructureKeywords = STRUCTURE_KEYWORDS.filter(kw => lowerText.includes(kw));
  const matchedPrototypeKeywords = PROTOTYPE_KEYWORDS.filter(kw => lowerText.includes(kw));
  
  // Extract complexity indicators
  const complexityKeywords = [
    'multiple teams', 'multi-team', 'stakeholders', 'integration', 'integrations',
    'api', 'apis', 'testing', 'uat', 'migration', 'complex', 'unclear scope',
    'launch', 'many teams', 'enterprise', 'organization-wide', 'company-wide'
  ];
  const complexityIndicators = complexityKeywords.filter(kw => lowerText.includes(kw));
  
  // Detect momentum sub-type
  let momentumSubType: MomentumSubType = 'general';
  
  // Calendar/Planning Drift signals
  const calendarDriftSignals = [
    'calendar', 'content calendar', 'marketing calendar', 'never stick to',
    'not following', 'ignore the calendar', 'planning but not doing',
    'meetings turn into debates', 'debating instead of deciding'
  ];
  const hasCalendarDrift = calendarDriftSignals.some(s => lowerText.includes(s));
  
  // Deadline/Schedule Pressure signals
  const deadlineSignals = [
    'deadline', 'behind schedule', 'slipping', 'catch up', 'running late',
    'time-sensitive', 'tight timeline', 'launch', 'falling behind'
  ];
  const hasDeadlinePressure = deadlineSignals.some(s => lowerText.includes(s));
  
  // Coordination/Ownership Issues signals
  const coordinationSignals = [
    'unclear roles', 'unclear ownership', 'who does what', 'duplicated work',
    'missed tasks', 'nobody owns', 'lack of coordination', 'coordination',
    'multiple teams', 'no clear owner', 'responsibilities unclear'
  ];
  const hasCoordinationIssues = coordinationSignals.some(s => lowerText.includes(s));
  
  // Progress Blocked signals
  const progressBlockedSignals = [
    'stuck', 'stalled', 'blocked', 'no progress', 'no movement',
    'nothing gets done', 'waiting on each other', 'not moving forward'
  ];
  const hasProgressBlocked = progressBlockedSignals.some(s => lowerText.includes(s));
  
  // Prioritize sub-type (most specific first)
  if (hasCoordinationIssues) momentumSubType = 'coordination_issues';
  else if (hasCalendarDrift) momentumSubType = 'calendar_drift';
  else if (hasDeadlinePressure) momentumSubType = 'deadline_pressure';
  else if (hasProgressBlocked) momentumSubType = 'progress_blocked';
  
  // Extract user pain points (key phrases that describe their specific situation)
  const painPointPatterns = [
    /we (never|don't|can't|aren't) [^.!?]+/gi,
    /things (keep|are|get) [^.!?]+/gi,
    /nobody (knows|owns|is) [^.!?]+/gi,
    /no one (knows|owns|is) [^.!?]+/gi,
    /everyone (does|interprets) [^.!?]+/gi,
    /meetings [^.!?]+/gi,
    /team is [^.!?]+/gi,
    /priorities [^.!?]+/gi,
    /deadlines? [^.!?]+/gi
  ];
  
  const userPainPoints: string[] = [];
  for (const pattern of painPointPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      userPainPoints.push(...matches.slice(0, 2)); // Limit to 2 per pattern
    }
  }
  
  return {
    matchedOverrideKeywords: matchedOverrideKeywords.slice(0, 5), // Top 5
    matchedMomentumKeywords: matchedMomentumKeywords.slice(0, 5),
    matchedStructureKeywords: matchedStructureKeywords.slice(0, 5),
    matchedPrototypeKeywords: matchedPrototypeKeywords.slice(0, 5),
    complexityIndicators: complexityIndicators.slice(0, 5),
    momentumSubType,
    userPainPoints: userPainPoints.slice(0, 4) // Top 4 pain points
  };
}

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
  
  // Check 3.6: Coordination / Ownership Drift Bias
  // If text mentions duplicated work, missed work, unclear ownership, unclear roles, or coordination breakdown → Momentum
  const coordinationDriftSignals = [
    'duplicated work', 'doing things twice', 'things done twice', 'things get done twice',
    'missed tasks', 'tasks not getting done', 'tasks slipping',
    'ownership unclear', 'unclear ownership', 'nobody owns it',
    'unclear roles', 'roles unclear', 'who does what',
    'coordination all over the place', 'lack of coordination',
    'everyone interprets it differently', 'plan interpreted differently'
  ];
  const hasCoordinationDrift = coordinationDriftSignals.some(signal => lowerText.includes(signal));
  if (hasCoordinationDrift) {
    console.log('Momentum override triggered - coordination/ownership drift fallback');
    return 'momentum';
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
// DYNAMIC APPROACH GUIDANCE (replaces static templates)
// ============================================================================

function getMomentumApproachGuidance(subType: MomentumSubType, painPoints: string[]): string {
  const painContext = painPoints.length > 0 
    ? `\nUser's specific pain points to address: "${painPoints.join('", "')}"` 
    : '';
  
  const subTypeGuidance: Record<MomentumSubType, string> = {
    calendar_drift: `The user is struggling with plans/calendars not being followed. Focus step 2 on why the calendar isn't sticking and how to make planning realistic and actually followed.`,
    deadline_pressure: `The user has deadline/schedule pressure. Focus step 2 on stabilising what's in scope NOW and cutting what can wait. Emphasize speed and focus.`,
    coordination_issues: `The user has ownership/coordination confusion. Focus step 2 on clarifying who owns what, eliminating duplicate work, and setting clear handoffs.`,
    progress_blocked: `The user feels stuck or blocked. Focus step 2 on identifying and removing specific blockers, getting quick wins to rebuild momentum.`,
    general: `Focus on general momentum restoration with clear ownership and visible progress.`
  };

  return `Write 4 numbered steps tailored to THIS specific situation. Reference their actual problem.
${subTypeGuidance[subType]}
${painContext}

Your steps should follow this structure but use THEIR language and situation:
1. Diagnostic step - understand what's specifically blocking them (reference their situation)
2. [Sub-type specific action] - the core fix for their type of problem
3. Ownership & coordination - clarify who does what and how decisions get made
4. Visible progress - establish weekly rhythm so they SEE things moving

Do NOT use generic language. Reference specifics from their input.`;
}

function getStructureApproachGuidance(painPoints: string[]): string {
  const painContext = painPoints.length > 0 
    ? `\nUser's specific pain points to address: "${painPoints.join('", "')}"` 
    : '';

  return `Write 4 numbered steps tailored to THIS specific situation. Reference their actual problem.
${painContext}

Your steps should follow this structure but use THEIR language and situation:
1. Discovery step - understand their current state and where the friction is
2. Mapping step - document and simplify the workflow into something usable
3. Tools/templates - set up lightweight structure (Notion, templates, etc.) if helpful
4. Handover - deliver something they can actually use day-to-day

Do NOT use generic language. Reference specifics from their input.`;
}

function getPrototypeApproachGuidance(painPoints: string[]): string {
  const painContext = painPoints.length > 0 
    ? `\nUser's specific goals: "${painPoints.join('", "')}"` 
    : '';

  return `Write 4 numbered steps tailored to THIS specific concept. Reference their actual idea.
${painContext}

Your steps should follow this structure but use THEIR language and situation:
1. Unpack the idea - define what they want to achieve and who it's for
2. User flow - map out the key screens/interactions
3. Build - create a clickable prototype they can test or pitch
4. Ready for next steps - prepare it for testing, alignment, or presentation

Do NOT use generic language. Reference specifics from their input.`;
}

// ============================================================================
// DYNAMIC WALK-AWAY GUIDANCE (replaces static templates)
// ============================================================================

function getWalkAwayGuidance(supportType: 'structure' | 'momentum' | 'prototype', subType: MomentumSubType): string {
  const baseGuidance = `List 3-4 tangible outcomes they'd walk away with, tailored to their specific situation.
Use bullets (-). Reference what they actually mentioned needing.
Keep each bullet short (5-10 words max).`;

  const typeHints: Record<string, string> = {
    structure: `Focus on: clarity, usable workflows, templates, reduced confusion.`,
    momentum_calendar_drift: `Focus on: a calendar that sticks, realistic planning rhythm, decisions that get made.`,
    momentum_deadline_pressure: `Focus on: clear priorities, protected timeline, focused scope, visible progress.`,
    momentum_coordination_issues: `Focus on: clear ownership, no duplicate work, smooth handoffs, everyone knowing their role.`,
    momentum_progress_blocked: `Focus on: blockers removed, momentum restored, quick wins, forward movement.`,
    momentum_general: `Focus on: ownership, momentum, weekly progress, clear next steps.`,
    prototype: `Focus on: clickable prototype, clear user flow, something to test/pitch, ready for next steps.`
  };

  const key = supportType === 'momentum' ? `momentum_${subType}` : supportType;
  return `${baseGuidance}\n${typeHints[key] || ''}`;
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
    
    // 2. EXTRACT DETECTED SIGNALS for contextual output
    const detectedSignals = extractDetectedSignals(fullText);
    
    // 3. DETERMINE PROJECT SIZE (includes urgency-based sizing)
    const sizeConfig = determineProjectSize({ situation, handoff, urgency, budget, supportType });
    
    // 4. CALCULATE HOUR MODIFIER (urgency + complexity)
    const hourModifier = calculateHourModifier({ urgency, situation, handoff });
    
    // 5. ADJUST HOURS (modifiers apply to hours, NOT to cost buckets)
    const adjustedHoursMin = Math.round(sizeConfig.hoursMin * (1 + hourModifier / 100));
    const adjustedHoursMax = Math.round(sizeConfig.hoursMax * (1 + hourModifier / 100));
    
    // 6. COST COMES FROM FIXED BUCKET (never calculated from hours)
    const costMin = sizeConfig.costMin;
    const costMax = sizeConfig.costMax;

    console.log('=== Project Plan Generator ===');
    console.log('Support type:', supportType);
    console.log('Momentum sub-type:', detectedSignals.momentumSubType);
    console.log('Project size:', sizeConfig.size);
    console.log('Hour modifier:', hourModifier + '%');
    console.log('Adjusted hours:', adjustedHoursMin, '-', adjustedHoursMax);
    console.log('Cost bucket:', formatCurrency(costMin), '-', formatCurrency(costMax));
    console.log('Detected signals:', JSON.stringify(detectedSignals, null, 2));

    // Get dynamic approach guidance based on support type and sub-type
    let approachGuidance: string;
    if (supportType === 'momentum') {
      approachGuidance = getMomentumApproachGuidance(detectedSignals.momentumSubType, detectedSignals.userPainPoints);
    } else if (supportType === 'structure') {
      approachGuidance = getStructureApproachGuidance(detectedSignals.userPainPoints);
    } else {
      approachGuidance = getPrototypeApproachGuidance(detectedSignals.userPainPoints);
    }

    // Get dynamic walk-away guidance
    const walkAwayGuidance = getWalkAwayGuidance(supportType, detectedSignals.momentumSubType);

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

    // Build context block for AI
    const contextBlock = `
DETECTED CONTEXT (use this to tailor your response):
- Support Type: ${supportType}
- Momentum Sub-Type: ${supportType === 'momentum' ? detectedSignals.momentumSubType.replace('_', ' ') : 'N/A'}
- Matched Signals: ${[...detectedSignals.matchedOverrideKeywords, ...detectedSignals.matchedMomentumKeywords].slice(0, 5).join(', ') || 'none specific'}
- Complexity Factors: ${detectedSignals.complexityIndicators.join(', ') || 'none detected'}
- User Pain Points: ${detectedSignals.userPainPoints.join(' | ') || 'not extracted'}

LANGUAGE MIRRORING RULE:
Mirror key phrases from the user's input where natural. If they said "calendar chaos", acknowledge "the calendar chaos" in your response. If they said "nobody knows who does what", reference that exact phrase. This makes the response feel personal and understood.
`;

    const systemPrompt = `You are Esther, a warm, down-to-earth freelance consultant writing a project plan.

CRITICAL BREVITY RULES:
- BE CONCISE. Every sentence must earn its place.
- NO fluff, filler words, or unnecessary qualifiers
- Short sentences. Punchy. Direct.
- If you can say it in 5 words, don't use 10
- This is a FIRST IMPRESSION - light but sharp

VOICE & TONE:
- Warm but economical with words
- Direct, no padding
- ${toneGuidance}
- NEVER use double hyphens (--)

${contextBlock}

PROJECT SIZE: ${sizeConfig.size}

OUTPUT FORMAT (strict order, no nesting):

## Short summary
1-2 sentences max. Show you get it. Start with "So..." or "Sounds like..." and reference their specific situation. No fluff.

## Here's how I'd tackle this
4 numbered steps. Each step: ONE short sentence (max 12 words). Action-focused.
${approachGuidance}

## What you'd walk away with
3-4 bullet points. Each bullet: 4-8 words max. Concrete outcomes only.
${walkAwayGuidance}

## Timeline
**${sizeConfig.weeks}**

## Estimated hours
**${adjustedHoursMin}–${adjustedHoursMax} hours**

## Ballpark cost
**${formatCurrency(costMin)}–${formatCurrency(costMax)}**

RULES:
- Sections in this EXACT order, no skipping
- Mirror their language where natural
- No hourly rates mentioned
- Keep it scannable - this is a quick read, not a proposal`;

    const userPrompt = `User input:
- Situation: ${situation}
- What they need handled: ${handoff}
- Urgency: ${urgency || "not specified"}
- Budget comfort zone: ${budget || "not specified"}

Generate the project plan using the structure above. Be human, warm, and direct. Reference their specific situation, don't be generic.`;

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
