import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "@/components/CookieConsent";
import { applyStoredLanguage } from "./i18n";

const queryClient = new QueryClient();

const RootLayout = () => {
  useEffect(() => {
    applyStoredLanguage();
  }, []);

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
