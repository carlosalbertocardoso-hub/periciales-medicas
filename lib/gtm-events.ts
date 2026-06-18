// GTM event tracking helpers

export interface FormSubmissionEvent {
  event: 'form_submitted';
  form_name: string;
  email?: string;
  form_type?: 'consulta' | 'servicio';
  timestamp: number;
}

export interface PageViewEvent {
  event: 'page_view';
  page_title: string;
  page_path: string;
}

export interface ConversionEvent {
  event: 'conversion';
  conversion_type: 'form_submission' | 'contact_request';
  value?: number;
  currency?: string;
}

/**
 * Push event to GTM dataLayer
 * GTM must be loaded (Consent Mode ensures it waits for user consent)
 */
export function trackEvent(
  eventData: FormSubmissionEvent | PageViewEvent | ConversionEvent
) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/**
 * Track form submission with email
 */
export function trackFormSubmission(
  formName: string,
  email?: string,
  formType?: 'consulta' | 'servicio'
) {
  trackEvent({
    event: 'form_submitted',
    form_name: formName,
    email,
    form_type: formType,
    timestamp: Date.now(),
  });
}

/**
 * Track page view
 */
export function trackPageView(pageTitle: string, pagePath: string) {
  trackEvent({
    event: 'page_view',
    page_title: pageTitle,
    page_path: pagePath,
  });
}

/**
 * Track conversion
 */
export function trackConversion(
  conversionType: 'form_submission' | 'contact_request',
  value?: number,
  currency?: string
) {
  trackEvent({
    event: 'conversion',
    conversion_type: conversionType,
    value,
    currency,
  });
}
