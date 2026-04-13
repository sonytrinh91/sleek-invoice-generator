/**
 * Sends download metadata to a Zapier Catch Hook.
 * Uses `application/x-www-form-urlencoded` (not JSON) so the browser sends a CORS
 * “simple” request; `application/json` triggers a preflight Zapier does not allow.
 * TODO: swap to `import.meta.env.VITE_ZAPIER_WEBHOOK_URL` when done testing.
 */
const ZAPIER_WEBHOOK_URL =
  'https://hooks.zapier.com/hooks/catch/26884693/u7ccb0v/'

export function submitZapierDownloadLead(formValues) {
  const url = ZAPIER_WEBHOOK_URL.trim()
  if (!url) return

  const params = new URLSearchParams()
  params.set('name', String(formValues?.customerName ?? '').trim())
  params.set('email', String(formValues?.customerEmail ?? '').trim())
  params.set('company', String(formValues?.companyName ?? '').trim())
  params.set('date', new Date().toISOString())

  void fetch(url.trim(), {
    method: 'POST',
    body: params,
    keepalive: true,
  }).catch(() => {
    /* non-blocking; avoid console noise in production embeds */
  })
}
