import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---------------------------------------------------------------------------
// Routes: brand, website, prototype (the three ways of working with Esther)
// ---------------------------------------------------------------------------

type Route = "brand" | "website" | "prototype";
type Size = "small" | "medium" | "large" | "very-large";

const BRAND_KEYWORDS = [
  "merk", "merknaam", "brand", "branding", "identiteit", "identity", "logo", "huisstijl",
  "brandbook", "kleuren", "colours", "colors", "typografie", "typography", "positionering",
  "positioning", "verhaal", "story", "tone of voice", "uitstraling", "rebrand", "naam",
  "visitekaart", "visual identity", "look and feel",
];

const WEBSITE_KEYWORDS = [
  "website", "site", "webshop", "shop", "webpagina", "landingspagina", "landing page",
  "portfolio", "onepager", "one-pager", "homepage", "pagina", "pages", "seo", "online",
  "webdesign", "web design", "boeking", "booking", "formulier", "form", "blog",
];

const PROTOTYPE_KEYWORDS = [
  "prototype", "proto", "idee", "idea", "app", "mvp", "concept", "testen", "test", "valideren",
  "validate", "klikbaar", "clickable", "flow", "screens", "schermen", "pitch", "demo",
  "wireframe", "user flow", "ux", "tool",
];

const BIG_SCOPE_KEYWORDS = [
  "webshop", "shop", "e-commerce", "ecommerce", "meerdere talen", "tweetalig", "multilingual",
  "integratie", "integraties", "integration", "api", "koppeling", "boekingssysteem",
  "booking system", "betalen", "payments", "veel pagina's", "veel paginas", "many pages",
  "compleet merk", "hele merk", "from scratch", "vanaf nul", "helemaal nieuw", "naamgeving",
  "brandbook", "campagne", "campaign", "fotografie", "video", "cms", "dashboard", "login",
  "accounts", "database",
];

const SMALL_SCOPE_KEYWORDS = [
  "klein", "small", "simpel", "simple", "een pagina", "één pagina", "one page", "onepager",
  "alleen een logo", "alleen logo", "opfrissen", "refresh", "snel", "quick", "eerste versie",
  "first version", "ruwe", "rough",
];

const SIZES: Record<Size, { weeks: { nl: string; en: string }; costMin: number; costMax: number }> = {
  small: { weeks: { nl: "1 tot 2 weken", en: "1 to 2 weeks" }, costMin: 1000, costMax: 1800 },
  medium: { weeks: { nl: "2 tot 4 weken", en: "2 to 4 weeks" }, costMin: 1800, costMax: 3200 },
  large: { weeks: { nl: "3 tot 6 weken", en: "3 to 6 weeks" }, costMin: 3200, costMax: 5000 },
  "very-large": { weeks: { nl: "5 tot 8 weken", en: "5 to 8 weeks" }, costMin: 5000, costMax: 8000 },
};

const SIZE_ORDER: Size[] = ["small", "medium", "large", "very-large"];

const bump = (size: Size, steps: number): Size => {
  const index = Math.min(SIZE_ORDER.length - 1, Math.max(0, SIZE_ORDER.indexOf(size) + steps));
  return SIZE_ORDER[index];
};

const countMatches = (text: string, list: string[]) => list.filter((word) => text.includes(word)).length;

function detectRoute(text: string, given?: string): Route {
  if (given === "brand" || given === "website" || given === "prototype") return given;
  const brand = countMatches(text, BRAND_KEYWORDS);
  const website = countMatches(text, WEBSITE_KEYWORDS);
  const prototype = countMatches(text, PROTOTYPE_KEYWORDS);
  if (prototype > brand && prototype >= website) return "prototype";
  if (website >= brand && website > 0) return "website";
  if (brand > 0) return "brand";
  return "website";
}

function detectSize(text: string, route: Route): Size {
  // Default per route: a prototype is the smallest piece of work, a brand the broadest.
  let size: Size = route === "prototype" ? "small" : route === "website" ? "medium" : "medium";

  const big = countMatches(text, BIG_SCOPE_KEYWORDS);
  const small = countMatches(text, SMALL_SCOPE_KEYWORDS);

  if (big >= 3) size = bump(size, 2);
  else if (big >= 1) size = bump(size, 1);

  if (small >= 1 && big === 0) size = bump(size, -1);

  // A full brand rarely lands in the smallest bucket.
  if (route === "brand" && size === "small") size = "medium";

  return size;
}

const formatCurrency = (amount: number) =>
  `\u20ac${amount.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}`;

const ROUTE_LABEL: Record<Route, { nl: string; en: string }> = {
  brand: { nl: "Merk", en: "Brand" },
  website: { nl: "Website", en: "Website" },
  prototype: { nl: "Prototype", en: "Prototype" },
};

const ROUTE_GUIDANCE: Record<Route, string> = {
  brand:
    "This is brand work: what the business stands for, how it sounds and how it looks. Steps move from conversation and positioning, to a visual direction, to a small brand system they can actually use (logo, colour, type, examples).",
  website:
    "This is website work: structure, copy direction, design and build. Steps move from what the site has to do, to structure and content, to design and build, to going live.",
  prototype:
    "This is prototype work: turning a loose idea into something clickable they can test or show. Steps move from sharpening the idea, to the main flow, to clickable screens, to testing it with real people.",
};

const HEADINGS = {
  nl: {
    summary: "## Wat ik eruit haal",
    approach: "## Zo pak ik het aan",
    deliver: "## Wat je krijgt",
    weeks: "## Doorlooptijd",
    cost: "## Indicatie kosten",
  },
  en: {
    summary: "## What I take from this",
    approach: "## How I would do it",
    deliver: "## What you get",
    weeks: "## Time needed",
    cost: "## Ballpark cost",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not set");

    const body = await req.json();
    const situation = String(body.situation ?? "").slice(0, 3000);
    const handoff = String(body.handoff ?? "").slice(0, 3000);
    const route = String(body.route ?? "");
    const urgency = String(body.urgency ?? "").slice(0, 120);
    const budget = String(body.budget ?? "").slice(0, 120);
    const lang = String(body.language ?? "nl").startsWith("nl") ? "nl" : "en";

    if (!situation.trim()) {
      return new Response(JSON.stringify({ error: "Missing situation" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = `${situation} ${handoff}`.toLowerCase();
    const detectedRoute = detectRoute(text, route);
    const size = detectSize(text, detectedRoute);
    const sizeConfig = SIZES[size];
    const headings = HEADINGS[lang];

    console.log("project-outline", { route: detectedRoute, size, urgency, budget, lang });

    const systemPrompt = `You are Esther Woerdman of Es Venture, writing a short first plan for someone who just described what they want to make. You work solo, direct and personal. You make brands, websites and prototypes for entrepreneurs, and every project starts from what makes that business different.

VOICE
- First person: I, me. Speak to the reader as je/jij (Dutch) or you (English).
- Short sentences. Warm, energetic, concrete. No corporate language, no hype words.
- Never use double hyphens or em dashes.
- Never mention an hourly rate, hours, or how you calculated anything.
- Do not invent client names, results or numbers.
${lang === "nl" ? "- Write the ENTIRE answer in Dutch." : "- Write the ENTIRE answer in English."}

ROUTE: ${ROUTE_LABEL[detectedRoute][lang]}
${ROUTE_GUIDANCE[detectedRoute]}

Mirror the reader's own words where it fits naturally.

OUTPUT FORMAT, exactly these five sections in this order, no extra sections, no nesting:

${headings.summary}
One or two sentences that show you understood, in their own words.

${headings.approach}
A markdown numbered list of exactly 4 steps (1. 2. 3. 4.). One short sentence each, max 12 words.

${headings.deliver}
A markdown bullet list of 3 or 4 items (- item). Concrete things they end up with, max 8 words each.

${headings.weeks}
**${sizeConfig.weeks[lang]}**

${headings.cost}
**${formatCurrency(sizeConfig.costMin)} - ${formatCurrency(sizeConfig.costMax)}**

The time and cost lines must be copied exactly as given above.`;

    const userPrompt = `${lang === "nl" ? "Wat ze willen maken" : "What they want to make"}: ${situation}
${handoff ? `${lang === "nl" ? "Extra context" : "Extra context"}: ${handoff}` : ""}
${lang === "nl" ? "Wanneer" : "Timing"}: ${urgency || "-"}
${lang === "nl" ? "Budgetgevoel" : "Budget comfort"}: ${budget || "-"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) throw new Error("No response from AI");

    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      await supabase.from("project_inquiries").insert({
        situation,
        handoff: handoff || detectedRoute,
        urgency,
        budget,
        ai_response: reply,
      });
    } catch (dbError) {
      console.error("Failed to store project inquiry:", dbError);
    }

    return new Response(JSON.stringify({ reply, route: detectedRoute }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in project-outline function:", error);
    return new Response(JSON.stringify({ error: "Failed to generate plan. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
