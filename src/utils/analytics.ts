// Lightweight wrapper around the GTM dataLayer (GTM is loaded in index.html).
// Every conversion-relevant action pushes a named event here; in Google Tag
// Manager you then create a Trigger on each event name and fire a GA4 event
// tag (and/or Google Ads conversion). See GTM_SETUP_GUIDE.md for the exact
// trigger/tag setup. Without these pushes, GTM/GA4 can only see pageviews —
// never the actual leads.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// A visitor successfully submitted the contact form — the primary conversion.
export function trackLead(service?: string, deliveredEmail?: boolean): void {
  trackEvent('generate_lead', {
    lead_service: service || 'unspecified',
    email_delivered: deliveredEmail ?? false,
  })
}

// A visitor opened WhatsApp from anywhere on the site.
export function trackWhatsAppClick(location: string): void {
  trackEvent('whatsapp_click', { click_location: location })
}

// A visitor tapped the phone number (mobile click-to-call).
export function trackPhoneClick(location: string): void {
  trackEvent('phone_click', { click_location: location })
}

// A visitor submitted a testimonial.
export function trackTestimonial(): void {
  trackEvent('submit_testimonial')
}
