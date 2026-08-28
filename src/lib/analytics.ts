'use client';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

/**
 * Sends a custom event to Google Analytics.
 * This should only be called on the client side.
 * Supports both string labels and complex event objects for maximum precision.
 */
export const trackEvent = (eventName: string, eventParams: string | Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    const params = typeof eventParams === 'string' ? { event_label: eventParams } : eventParams;
    window.gtag('event', eventName, params);
  } else {
    // Silent fail in environments where Analytics is blocked or not loaded
  }
};
