import ingridHero from "@/assets/work/ingrid/site-hero.jpg";
import ingridPortfolio from "@/assets/work/ingrid/site-portfolio.jpg";
import ingridMobile from "@/assets/work/ingrid/site-mobile.jpg";
import ingridContact from "@/assets/work/ingrid/site-contact.jpg";
import ingridLogo from "@/assets/work/ingrid/logo.svg";

export interface CaseScreen {
  src: string;
  captionKey: string;
  ratio: "wide" | "tall";
}

export interface CaseSwatch {
  hex: string;
  nameKey: string;
}

export interface CaseTypeface {
  name: string;
  useKey: string;
  className: string;
}

export interface CaseMedia {
  liveUrl?: string;
  liveLabel?: string;
  logo?: string;
  logoBg?: string;
  screens: CaseScreen[];
  palette?: CaseSwatch[];
  typefaces?: CaseTypeface[];
}

export const caseMedia: Record<string, CaseMedia> = {
  "studio-ingrid-de-reuver": {
    liveUrl: "https://www.studioingriddereuver.nl",
    liveLabel: "studioingriddereuver.nl",
    logo: ingridLogo,
    logoBg: "#FAF8F5",
    screens: [
      { src: ingridHero, captionKey: "ingridHero", ratio: "wide" },
      { src: ingridMobile, captionKey: "ingridMobile", ratio: "tall" },
      { src: ingridPortfolio, captionKey: "ingridPortfolio", ratio: "wide" },
      { src: ingridContact, captionKey: "ingridContact", ratio: "wide" },
    ],
    palette: [
      { hex: "#FF2D87", nameKey: "ingridPink" },
      { hex: "#FAF8F5", nameKey: "ingridPaper" },
      { hex: "#F1EEEA", nameKey: "ingridSand" },
      { hex: "#1A1A1A", nameKey: "ingridInk" },
    ],
    typefaces: [
      { name: "Fraunces", useKey: "ingridDisplay", className: "font-serif italic" },
      { name: "Inter", useKey: "ingridText", className: "font-sans" },
    ],
  },
};
