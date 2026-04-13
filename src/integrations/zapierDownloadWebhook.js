/**
 * Sends download submission metadata to a Zapier Catch Hook (POST JSON).
 * URL: `VITE_ZAPIER_WEBHOOK_URL` (set at build time in Vite).
 */
export function submitZapierDownloadLead(formValues) {
  const url = import.meta.env.VITE_ZAPIER_WEBHOOK_URL
  if (typeof url !== 'string' || !url.trim()) return

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
