/**
 * Defaults for Zapier → Gmail (or similar). Override at build time via Vite env.
 * `import.meta.env` is inlined in `vite build --mode single` for a single HTML file.
 */
export function invoiceEmailEnvelopeDefaults() {
  return {
    replyTo:
      (typeof import.meta !== 'undefined' &&
        import.meta.env?.VITE_INVOICE_EMAIL_REPLY_TO?.trim()) ||
      'sony.trinh@sleek.com',
    bcc:
      (typeof import.meta !== 'undefined' &&
        import.meta.env?.VITE_INVOICE_EMAIL_BCC?.trim()) ||
      'email-notifications@sleek.com',
    fromName:
      (typeof import.meta !== 'undefined' &&
        import.meta.env?.VITE_INVOICE_EMAIL_FROM_NAME?.trim()) ||
      'Sleek',
    fromEmail:
      (typeof import.meta !== 'undefined' &&
        import.meta.env?.VITE_INVOICE_EMAIL_FROM_EMAIL?.trim()) ||
      'customer@sleek.sg',
  }
}
