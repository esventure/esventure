import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Head } from "vite-react-ssg";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacybeleid - Es Venture</title>
        <meta
          name="description"
          content="Lees hoe Es Venture persoonlijke gegevens verzamelt, gebruikt en beschermt, inclusief jouw rechten onder de AVG en cookievoorkeuren."
        />
        <link rel="canonical" href="https://esventure.nl/privacy" />
        <meta property="og:title" content="Privacybeleid - Es Venture" />
        <meta
          property="og:description"
          content="Lees hoe Es Venture persoonlijke gegevens verzamelt, gebruikt en beschermt, inclusief jouw rechten en cookievoorkeuren."
        />
        <meta property="og:url" content="https://esventure.nl/privacy" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <Button asChild variant="ghost" className="mb-8 -ml-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar home
            </Link>
          </Button>

          <h1 className="mb-8 font-display text-3xl font-bold md:text-4xl">Privacybeleid</h1>

          <div className="space-y-6 text-foreground/80">
            <p className="text-sm text-muted-foreground">Laatst bijgewerkt: 17 september 2026</p>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Inleiding</h2>
              <p>
                Es Venture respecteert je privacy en gaat zorgvuldig om met persoonlijke gegevens. Dit beleid legt uit welke gegevens worden verzameld, waarvoor ze worden gebruikt en hoe ze worden beschermd wanneer je de website gebruikt.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Welke gegevens worden verzameld</h2>
              <p>Es Venture kan de volgende gegevens verwerken:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Analyticsgegevens:</strong> geanonimiseerde informatie over websitegebruik, zoals bezochte pagina’s, tijd op de website en globale locatie. Dit gebeurt alleen als je analyticscookies accepteert.
                </li>
                <li>
                  <strong>Formuliergegevens:</strong> informatie die je invult in het projectformulier, zoals je projectomschrijving, planning, budgetindicatie en contactgegevens.
                </li>
                <li>
                  <strong>Contactgegevens:</strong> je e-mailadres en informatie die je zelf deelt wanneer je mailt of een gesprek boekt.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Waarvoor gegevens worden gebruikt</h2>
              <p>Deze gegevens worden gebruikt om:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>vragen en projectaanvragen te beantwoorden;</li>
                <li>een passende eerste inschatting of projectrichting te maken;</li>
                <li>contact met je te onderhouden over een mogelijk project;</li>
                <li>de website te verbeteren op basis van algemene gebruikspatronen.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Cookies</h2>
              <p>
                Es Venture gebruikt Google Analytics 4 om websiteverkeer te analyseren. Analyticscookies worden pas geactiveerd wanneer je ze accepteert in de cookiemelding. Je kunt je keuze wijzigen door je browsercookies te verwijderen en de website opnieuw te bezoeken.
              </p>
              <p>
                Meer informatie over hoe Google gegevens verwerkt vind je in het{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  privacybeleid van Google
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Jouw rechten</h2>
              <p>Onder de AVG heb je onder andere het recht om:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>inzage te vragen in je persoonlijke gegevens;</li>
                <li>onjuiste gegevens te laten corrigeren;</li>
                <li>gegevens te laten verwijderen wanneer dat mogelijk is;</li>
                <li>toestemming voor analyticscookies in te trekken;</li>
                <li>bezwaar te maken tegen verwerking van je gegevens.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Bewaartermijn</h2>
              <p>
                Analyticsgegevens worden bewaard volgens de standaardinstellingen van Google Analytics. Contactgegevens en projectinformatie worden niet langer bewaard dan nodig is voor het doel waarvoor je ze hebt gedeeld, tenzij een wettelijke bewaarplicht geldt.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
              <p>
                Voor vragen over dit privacybeleid of om je privacyrechten uit te oefenen, kun je mailen naar{" "}
                <a href="mailto:esther@esventure.nl" className="text-primary hover:underline">
                  esther@esventure.nl
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
