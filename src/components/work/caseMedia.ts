import ingridHero from "@/assets/work/ingrid/site-hero.jpg";
import ingridPortfolioAsset from "@/assets/work/ingrid/site-portfolio-newborn.png.asset.json";
import ingridMobile from "@/assets/work/ingrid/site-mobile.jpg";
import ingridContact from "@/assets/work/ingrid/site-contact.jpg";
import ingridLogo from "@/assets/work/ingrid/logo.svg";
import dennisHero from "@/assets/work/dennis/site-hero.jpg";
import dennisAbout from "@/assets/work/dennis/site-about.jpg";
import dennisExperiences from "@/assets/work/dennis/site-experiences.jpg";
import dennisContact from "@/assets/work/dennis/site-contact.jpg";
import dennisMobile from "@/assets/work/dennis/site-mobile.jpg";
import dennisLogoAsset from "@/assets/work/dennis/lockup-horizontal-cream.png.asset.json";
import dennisBookLogoAsset from "@/assets/work/dennis/brandbook-logo.png.asset.json";
import dennisBookColorAsset from "@/assets/work/dennis/brandbook-color.png.asset.json";
import dennisBookTypeAsset from "@/assets/work/dennis/brandbook-type.png.asset.json";
import dennisBookCardAsset from "@/assets/work/dennis/brandbook-card.png.asset.json";
import hapHomeAsset from "@/assets/work/hap/start-portrait-v2.png.asset.json";
import hapVideoAsset from "@/assets/work/hap/walkthrough.mp4.asset.json";
import hapSkillAsset from "@/assets/work/hap/skill.png.asset.json";
import hapIngredientsAsset from "@/assets/work/hap/ingredients.png.asset.json";
import hapReviewAsset from "@/assets/work/hap/review.png.asset.json";
import hapResultsAsset from "@/assets/work/hap/results.png.asset.json";

export interface CaseScreen {
  src: string;
  captionKey: string;
  ratio: "wide" | "tall";
}

export interface CaseVideo {
  src: string;
  poster?: string;
  captionKey: string;
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
  video?: CaseVideo;
  screens: CaseScreen[];
  brandbook?: CaseScreen[];
  palette?: CaseSwatch[];
  typefaces?: CaseTypeface[];
}

const hostedAsset = (path: string) => `https://esventure.lovable.app${path}`;

export const caseMedia: Record<string, CaseMedia> = {
  "studio-ingrid-de-reuver": {
    liveUrl: "https://www.studioingriddereuver.nl",
    liveLabel: "studioingriddereuver.nl",
    logo: ingridLogo,
    logoBg: "#FAF8F5",
    screens: [
      { src: ingridHero, captionKey: "ingridHero", ratio: "wide" },
      { src: hostedAsset(ingridPortfolioAsset.url), captionKey: "ingridPortfolio", ratio: "wide" },
      { src: ingridContact, captionKey: "ingridContact", ratio: "wide" },
      { src: ingridMobile, captionKey: "ingridMobile", ratio: "tall" },
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
  "dennis-gerrits": {
    liveUrl: "https://dennisgerrits.com",
    liveLabel: "dennisgerrits.com",
    logo: hostedAsset(dennisLogoAsset.url),
    logoBg: "#2D0036",
    screens: [
      { src: dennisHero, captionKey: "dennisHero", ratio: "wide" },
      { src: dennisAbout, captionKey: "dennisAbout", ratio: "wide" },
      { src: dennisExperiences, captionKey: "dennisExperiences", ratio: "wide" },
      { src: dennisContact, captionKey: "dennisContact", ratio: "wide" },
      { src: dennisMobile, captionKey: "dennisMobile", ratio: "tall" },
    ],
    brandbook: [
      { src: hostedAsset(dennisBookLogoAsset.url), captionKey: "dennisBookLogo", ratio: "wide" },
      { src: hostedAsset(dennisBookColorAsset.url), captionKey: "dennisBookColor", ratio: "wide" },
      { src: hostedAsset(dennisBookTypeAsset.url), captionKey: "dennisBookType", ratio: "wide" },
      { src: hostedAsset(dennisBookCardAsset.url), captionKey: "dennisBookCard", ratio: "wide" },
    ],
    palette: [
      { hex: "#2D0036", nameKey: "dennisPlum" },
      { hex: "#E66300", nameKey: "dennisOrange" },
      { hex: "#1C4A36", nameKey: "dennisGreen" },
      { hex: "#B09E94", nameKey: "dennisTaupe" },
      { hex: "#FAFAFA", nameKey: "dennisPaper" },
    ],
    typefaces: [
      { name: "Bebas Neue", useKey: "dennisDisplay", className: "font-dennis-display uppercase tracking-normal" },
      { name: "Outfit", useKey: "dennisText", className: "font-dennis-text" },
      { name: "Caveat", useKey: "dennisAccent", className: "font-dennis-accent" },
    ],
  },
  hap: {
    liveUrl: "https://haprecipes.lovable.app",
    liveLabel: "haprecipes.lovable.app",
    video: {
      src: hostedAsset(hapVideoAsset.url),
      poster: hostedAsset(hapHomeAsset.url),
      captionKey: "hapWalkthrough",
    },
    screens: [
      { src: hostedAsset(hapHomeAsset.url), captionKey: "hapHome", ratio: "tall" },
      { src: hostedAsset(hapSkillAsset.url), captionKey: "hapSkill", ratio: "tall" },
      { src: hostedAsset(hapIngredientsAsset.url), captionKey: "hapIngredients", ratio: "tall" },
      { src: hostedAsset(hapReviewAsset.url), captionKey: "hapReview", ratio: "tall" },
      { src: hostedAsset(hapResultsAsset.url), captionKey: "hapResults", ratio: "tall" },
    ],
  },
};
