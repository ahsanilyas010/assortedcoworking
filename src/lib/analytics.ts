declare function gtag(...args: unknown[]): void;

const safeGtag = (...args: unknown[]) => {
  if (typeof gtag === "function") {
    gtag(...args);
  }
};

export const trackEvent = (
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) => {
  safeGtag("event", eventName, params);
};

export const trackPhoneCallClick = () =>
  trackEvent("phone_call_click", {
    event_category: "engagement",
    event_label: "+92 321 852 6405",
  });

export const trackWhatsAppClick = () =>
  trackEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: "whatsapp_contact",
  });

export const trackFormSubmit = () =>
  trackEvent("generate_lead", {
    event_category: "contact_form",
    event_label: "contact_form_submit",
  });

export const trackCTAClick = (label: string) =>
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: label,
  });
