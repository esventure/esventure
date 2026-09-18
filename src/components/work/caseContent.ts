export interface CaseServiceRoute {
  title: string;
  situation: string;
  result: string;
  deliverables: string[];
  example: string;
}

export interface CaseStory {
  slug: string;
  accent: "secondary" | "coral" | "lime" | "primary";
  label: string;
  title: string;
  cardCopy?: string;
  client: string;
  scope: string;
  character: string;
  modalHeading: string;
  summary: string;
  needed: string;
  made: string[];
  direction: string;
  outcome: string;
  credits: string;
  brandbook?: {
    title: string;
    foundation: string;
    audience: string;
    principles: string[];
    voice: string;
  };
}

export const caseSlugs = ["dennis-gerrits", "studio-ingrid-de-reuver", "hap"] as const;

export const caseRoutes = ["brand", "website", "prototype"] as const;
