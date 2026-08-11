import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Check, AlertCircle, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import logoEV from "@/assets/logo-ev.svg";
import { FixerIcon, SparringIcon, MapIcon, MirrorIcon } from "@/components/ServiceIcons";

const ColorSwatch = ({ name, variable, cssVar }: { name: string; variable: string; cssVar: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-20 h-20 rounded-lg border border-border shadow-sm"
      style={{ backgroundColor: `hsl(var(--${cssVar}))` }}
    />
    <span className="text-sm font-semibold text-foreground">{name}</span>
    <span className="text-xs text-muted-foreground font-mono">{variable}</span>
  </div>
);

const StyleGuide = () => {
  return (
    <>
      <Head>
        <title>Style Guide - Es Venture</title>
        <meta name="description" content="De Es Venture brand style guide. Ontdek onze kleuren, typografie, buttons, iconen, spacing en tone of voice." />
        <link rel="canonical" href="https://esventure.nl/styleguide" />
        <meta property="og:title" content="Style Guide - Es Venture" />
        <meta property="og:description" content="De Es Venture brand style guide. Ontdek onze kleuren, typografie, buttons, iconen, spacing en tone of voice." />
        <meta property="og:url" content="https://esventure.nl/styleguide" />
        <meta property="og:image" content="https://esventure.nl/og-image.png" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoEV} alt="Es Venture" className="h-8" />
            <h1 className="text-xl font-black font-display text-foreground">Style Guide</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="rounded-full font-bold print:hidden"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Link to="/" className="text-sm text-primary hover:underline print:hidden">
              ← Terug naar website
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-20">

        {/* ─── Logo ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Logo</h2>
          <p className="text-muted-foreground mb-8">Het Es Venture logo in verschillende toepassingen.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 flex items-center justify-center bg-background">
              <img src={logoEV} alt="Es Venture logo" className="h-12" />
            </Card>
            <Card className="p-8 flex items-center justify-center bg-primary">
              <img src={logoEV} alt="Es Venture logo op paars" className="h-12 brightness-0 invert" />
            </Card>
            <Card className="p-8 flex items-center justify-center bg-foreground">
              <img src={logoEV} alt="Es Venture logo op donker" className="h-12 brightness-0 invert" />
            </Card>
          </div>
        </section>

        {/* ─── Kleuren ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Kleuren</h2>
          <p className="text-muted-foreground mb-8">Het kernkleurenpalet van Es Venture.</p>
          
          <h3 className="text-lg font-bold text-foreground mb-4">Primaire kleuren</h3>
          <div className="flex flex-wrap gap-6 mb-10">
            <ColorSwatch name="Primary (Paars)" variable="#BF5AF2" cssVar="primary" />
            <ColorSwatch name="Secondary (Geel)" variable="#EEF0A3" cssVar="secondary" />
            <ColorSwatch name="Background" variable="#FFFFFF" cssVar="background" />
            <ColorSwatch name="Foreground" variable="#1A1A1A" cssVar="foreground" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-4">UI kleuren</h3>
          <div className="flex flex-wrap gap-6">
            <ColorSwatch name="Muted" variable="--muted" cssVar="muted" />
            <ColorSwatch name="Muted FG" variable="--muted-foreground" cssVar="muted-foreground" />
            <ColorSwatch name="Border" variable="--border" cssVar="border" />
            <ColorSwatch name="Destructive" variable="--destructive" cssVar="destructive" />
          </div>
        </section>

        {/* ─── Typografie ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Typografie</h2>
          <p className="text-muted-foreground mb-8">Twee fontfamilies: Poppins voor koppen, Nunito Sans voor body.</p>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Headings - Poppins</h3>
              <div className="space-y-3 border-l-4 border-primary pl-6">
                <p className="text-6xl font-black font-display text-foreground">Heading 1</p>
                <p className="text-4xl font-black font-display text-foreground">Heading 2</p>
                <p className="text-2xl font-black font-display text-foreground">Heading 3</p>
                <p className="text-xl font-bold font-display text-foreground">Heading 4</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Body - Nunito Sans</h3>
              <div className="space-y-3 border-l-4 border-secondary pl-6">
                <p className="text-xl text-foreground font-medium">
                  Large body text - gebruikt voor introductieteksten en hero's.
                </p>
                <p className="text-base text-foreground">
                  Regular body text - de standaard tekststijl voor paragrafen en beschrijvingen op de website.
                </p>
                <p className="text-sm text-muted-foreground">
                  Small / caption text - gebruikt voor labels, bijschriften en metadata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Buttons ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Buttons</h2>
          <p className="text-muted-foreground mb-8">Alle buttons zijn rounded-full met duidelijke hover states.</p>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" className="rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Primary CTA <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="rounded-full font-bold">
                Default <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold">
                Outline
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full font-bold">
                Ghost
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="default" className="rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Mail className="mr-2 h-4 w-4" /> Send email
              </Button>
              <Button size="sm" className="rounded-full font-bold">
                Small
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold bg-transparent text-primary border-2 border-primary/50 hover:bg-primary/10">
                Book a call <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Cards ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Cards</h2>
          <p className="text-muted-foreground mb-8">Service cards met iconen en beschrijvingen.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: FixerIcon, label: "The Driver", title: "Let's Get It Moving" },
              { Icon: SparringIcon, label: "The Sparring Room", title: "Let's Think It Through" },
              { Icon: MapIcon, label: "The Map", title: "Let's Make It Flow" },
              { Icon: MirrorIcon, label: "The Mirror", title: "Let's Make It Yours" },
            ].map(({ Icon, label, title }, i) => (
              <Card key={i} className="p-8 border border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{label}</span>
                <h3 className="text-xl font-black text-foreground font-display">{title}</h3>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Iconen ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Iconen</h2>
          <p className="text-muted-foreground mb-8">Custom service-iconen en Lucide UI-iconen.</p>

          <div className="flex flex-wrap gap-8 items-end">
            {[
              { Icon: FixerIcon, name: "Fixer" },
              { Icon: SparringIcon, name: "Sparring" },
              { Icon: MapIcon, name: "Map" },
              { Icon: MirrorIcon, name: "Mirror" },
            ].map(({ Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon size={28} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
            <div className="w-px h-12 bg-border" />
            {[ArrowRight, Mail, Check, AlertCircle, Star].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-foreground" />
                <span className="text-xs text-muted-foreground">{Icon.displayName || Icon.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Spacing & Radius ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Spacing & Radius</h2>
          <p className="text-muted-foreground mb-8">Standaard border-radius: 1rem. Buttons: full rounded.</p>

          <div className="flex flex-wrap gap-6 items-end">
            {[
              { label: "sm", cls: "rounded-sm" },
              { label: "md", cls: "rounded-md" },
              { label: "lg (default)", cls: "rounded-lg" },
              { label: "full", cls: "rounded-full" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-primary/20 border-2 border-primary ${cls}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Tone of Voice ─── */}
        <section>
          <h2 className="text-3xl font-black font-display text-foreground mb-2">Tone of Voice</h2>
          <p className="text-muted-foreground mb-8">De stem van Es Venture in tekst.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-primary">
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" /> Wel
              </h4>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li>Direct en persoonlijk - "jij/je" taalgebruik</li>
                <li>Energiek en actiegericht</li>
                <li>Helder, zelfverzekerd, no-nonsense</li>
                <li>Menselijk en benaderbaar</li>
                <li>"Your project's personal caffeine shot"</li>
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-destructive">
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" /> Niet
              </h4>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li>Corporate jargon of buzzwords</li>
                <li>Passieve of vage taal</li>
                <li>Overgestyled of te speels</li>
                <li>AI-illustraties of gradiënten</li>
                <li>Onpersoonlijk of afstandelijk</li>
              </ul>
            </Card>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Es Venture Style Guide - Intern document</p>
        </div>
      </footer>
    </div></>
  );
};

export default StyleGuide;
