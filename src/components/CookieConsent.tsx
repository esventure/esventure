import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "cookie_consent";

export const getCookieConsent = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY);
};

export const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);
    if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShowBanner(false);
    if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-background border border-border rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-foreground/80">
                  {t("cookie.message")}{" "}
                  <Link to="/privacy" className="underline hover:text-foreground">
                    {t("cookie.privacy")}
                  </Link>
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="flex-1 md:flex-none rounded-full text-sm"
                >
                  {t("cookie.decline")}
                </Button>
                <Button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm"
                >
                  {t("cookie.accept")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
