import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "@/components/CookieConsent";
import { applyStoredLanguage } from "./i18n";

const queryClient = new QueryClient();

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    applyStoredLanguage();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
