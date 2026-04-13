/**
 * Sends download submission metadata to a Zapier Catch Hook (POST JSON).
 * TODO: swap to `import.meta.env.VITE_ZAPIER_WEBHOOK_URL` when done testing.
 */
const ZAPIER_WEBHOOK_URL =
  'https://hooks.zapier.com/hooks/catch/26884693/u7ccb0v/'

export function submitZapierDownloadLead(formValues) {
  const url = ZAPIER_WEBHOOK_URL.trim()
  if (!url) return

  const body = {
    name: String(formValues?.customerName ?? '').trim(),
    email: String(formValues?.customerEmail ?? '').trim(),
    company: String(formValues?.companyName ?? '').trim(),
    date: new Date().toISOString(),
  }

  void fetch(url.trim(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    /* non-blocking; avoid console noise in production embeds */
  })
}
