import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Pagina niet gevonden - Es Venture</title>
        <meta name="description" content="De pagina die je zoekt bestaat niet. Ga terug naar Es Venture voor strategie, design en delivery." />
        <link rel="canonical" href="https://esventure.nl/404" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Pagina niet gevonden - Es Venture" />
        <meta property="og:description" content="De pagina die je zoekt bestaat niet. Ga terug naar Es Venture." />
        <meta property="og:url" content="https://esventure.nl/404" />
        <meta property="og:image" content="https://esventure.nl/og-image.png" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
