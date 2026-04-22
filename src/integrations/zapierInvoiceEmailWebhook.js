/**
 * Invoice email → Zapier Catch Hook (form-urlencoded for CORS simple POST).
 * Map in Zapier: Gmail “Send Email” — To, Subject, Body (HTML), Reply-To, BCC.
 * (No PDF attachment — keeps payload under Zapier / proxy body limits.)
 *
 * Fields sent:
 * - to, subject, html_body, plain_body
 * - reply_to, bcc, from_name, from_email
 *
 * @see https://zapier.com/apps/gmail/integrations/webhook/63624/send-gmail-emails-from-caught-raw-webhooks
 */
const DEFAULT_ZAPIER_INVOICE_EMAIL_URL =
  'https://hooks.zapier.com/hooks/catch/26884693/ujlhwwy/'

const ZAPIER_INVOICE_EMAIL_WEBHOOK_URL =
  (typeof import.meta !== 'undefined' &&
    import.meta.env?.VITE_ZAPIER_INVOICE_EMAIL_WEBHOOK_URL?.trim()) ||
  DEFAULT_ZAPIER_INVOICE_EMAIL_URL

/**
 * @param {object} payload — from {@link buildInvoiceZapierEmailPayload}
 */
export function submitInvoiceEmailToZapier(payload) {
  const url = ZAPIER_INVOICE_EMAIL_WEBHOOK_URL.trim()
  if (!url) return Promise.resolve(null)

  const params = new URLSearchParams()
  params.set('to', payload.to)
  params.set('subject', payload.subject)
  params.set('html_body', payload.html_body)
  params.set('plain_body', payload.plain_body)
  params.set('reply_to', payload.reply_to ?? '')
  params.set('bcc', payload.bcc ?? '')
  params.set('from_name', payload.from_name ?? '')
  params.set('from_email', payload.from_email ?? '')

  /**
   * Do not use `keepalive: true` here: browsers cap keepalive request bodies at
   * ~64 KiB, so large `pdf_base64` payloads never reach Zapier.
   */
  return fetch(url, {
    method: 'POST',
    body: params,
  })
}
