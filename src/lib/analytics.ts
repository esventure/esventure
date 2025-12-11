// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Pre-defined events for consistency
export const analytics = {
  // Form events
  projectPlannerSubmit: (data: { urgency: string; budget: string }) => {
    trackEvent('project_planner_submit', {
      urgency: data.urgency,
      budget: data.budget,
    });
  },

  // CTA clicks
  ctaClick: (location: string) => {
    trackEvent('cta_click', { location });
  },

  // Contact events
  emailClick: () => {
    trackEvent('contact_email_click');
  },

  bookCallClick: () => {
    trackEvent('contact_book_call_click');
  },

  // Navigation
  navClick: (section: string) => {
    trackEvent('nav_click', { section });
  },
};
