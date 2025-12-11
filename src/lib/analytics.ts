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

// Scroll depth tracking state
const scrollDepthTracked = new Set<number>();
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export const initScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (scrollPercent >= threshold && !scrollDepthTracked.has(threshold)) {
        scrollDepthTracked.add(threshold);
        trackEvent('scroll_depth', {
          percent: threshold,
          page_path: window.location.pathname,
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Reset scroll tracking (useful for SPA navigation)
export const resetScrollDepthTracking = () => {
  scrollDepthTracked.clear();
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

  // Scroll depth
  initScrollTracking: initScrollDepthTracking,
  resetScrollTracking: resetScrollDepthTracking,
};
