import { Head } from "vite-react-ssg";

const headline = "A bold, candid digital home for a photographer who puts people at ease.";

const options = [
  {
    id: "bricolage",
    name: "Bricolage Grotesque",
    note: "Current",
    style: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 },
  },
  {
    id: "gabarito",
    name: "Gabarito",
    note: "Option 1 - warm, rounded, friendly-bold",
    style: { fontFamily: "'Gabarito', sans-serif", fontWeight: 700 },
  },
  {
    id: "familjen",
    name: "Familjen Grotesk",
    note: "Option 2 - crisp, slightly quirky editorial",
    style: { fontFamily: "'Familjen Grotesk', sans-serif", fontWeight: 700 },
  },
  {
    id: "clash",
    name: "Clash Display",
    note: "Option 3 - chunky statement display",
    style: { fontFamily: "'Clash Display', sans-serif", fontWeight: 600 },
  },
];

export default function FontPreview() {
  return (
    <div className="min-h-screen bg-paper px-6 py-12 md:px-12">
      <Head>
        <title>Font preview - Es Venture</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;600;700;800&family=Familjen+Grotesk:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </Head>

      <p className="mb-10 text-sm uppercase tracking-widest text-plum/60">
        Es Venture - display font preview
      </p>

      <div className="mx-auto max-w-4xl space-y-16">
        {options.map((option) => (
          <section key={option.id} className="border-t border-plum/15 pt-6">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="text-base font-semibold text-plum">{option.name}</h2>
              <p className="text-sm text-plum/60">{option.note}</p>
            </div>
            <p
              className="text-4xl leading-[1.05] tracking-tight text-plum md:text-6xl"
              style={option.style}
            >
              {headline}
            </p>
            <p
              className="mt-5 text-lg text-plum/70"
              style={option.style}
            >
              From idea to something unmistakably yours.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
