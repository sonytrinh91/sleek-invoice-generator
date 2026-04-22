import { invoiceEmailEnvelopeDefaults } from './invoiceEmailConfig.js'
import { formatMoney } from './utils.js'

/** Keep webhook body small (Zapier / proxies often reject large POSTs). */
const MAX_LINE_ITEMS = 20
const MAX_DESC_LEN = 100
const MAX_HTML_CHARS = 14_000
const MAX_PLAIN_CHARS = 8_000
const MAX_SUBJECT_CHARS = 500

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function truncateText(s, max) {
  const t = String(s).trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}

function clip(s, max) {
  if (s.length <= max) return s
  return `${s.slice(0, max - 20)}\n…(truncated)`
}

/**
 * @param {object} form
 * @param {number[]} lineAmounts
 * @param {{ grandTotal: number }} totals
 * @param {string} dueDisplayLong — e.g. "May 22, 2026"
 */
export function buildInvoiceZapierEmailPayload(
  form,
  lineAmounts,
  totals,
  dueDisplayLong,
) {
  const currency = form.currency?.trim() || 'SGD'
  const clientName = form.customerName.trim()
  const companyName = truncateText(form.companyName.trim(), 120)
  const invoiceNumber = truncateText(form.invoiceNumber.trim(), 60)
  const totalFormatted = formatMoney(totals.grandTotal, currency)

  let subject = `Invoice #${invoiceNumber} from ${companyName} - Due ${dueDisplayLong}`
  subject = clip(subject, MAX_SUBJECT_CHARS)

  const rawItems = (form.items ?? []).map((it, i) => {
    const desc = truncateText(
      (it.description ?? '').trim() || 'Item',
      MAX_DESC_LEN,
    )
    const qty = String(it.qty ?? '1').trim()
    const labelRaw = `${desc} X ${qty}`
    return {
      labelRaw,
      labelEscaped: escapeHtml(labelRaw),
      amountFormatted: formatMoney(lineAmounts[i] ?? 0, currency),
    }
  })

  const omitted = Math.max(0, rawItems.length - MAX_LINE_ITEMS)
  const items = rawItems.slice(0, MAX_LINE_ITEMS)

  const titleInCard = `Invoice # ${escapeHtml(invoiceNumber)} for ${escapeHtml(clientName)}`
  const companyLine = `${escapeHtml(companyName)} sent you an invoice`

  const rowsHtml = items
    .map(
      (row) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font:14px Arial,sans-serif;color:#333">${row.labelEscaped}</td><td align="right" style="padding:10px 0;border-bottom:1px solid #eee;font:14px Arial,sans-serif;color:#333">${row.amountFormatted}</td></tr>`,
    )
    .join('')

  const moreRow =
    omitted > 0
      ? `<tr><td colspan="2" style="padding:8px 0;font:12px Arial,sans-serif;color:#666">+ ${omitted} more line item(s) — open the invoice in Sleek for the full list.</td></tr>`
      : ''

  let html = `<table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;font-family:Arial,sans-serif;background:#f5f5f5"><tr><td style="padding:20px 12px"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5"><tr><td align="center" style="font:bold 16px Arial,sans-serif;color:#111;padding-bottom:12px">${companyLine}</td></tr><tr><td align="center" style="font:bold 26px Arial,sans-serif;color:#111">${totalFormatted}</td></tr><tr><td align="center" style="font:13px Arial,sans-serif;color:#666;padding:6px 0 20px">Due on ${escapeHtml(dueDisplayLong)}</td></tr><tr><td style="background:#fff;border:1px solid #e5e5e5;border-radius:6px;padding:16px"><p style="margin:0 0 12px;font:bold 15px Arial,sans-serif;color:#111">${titleInCard}</p><table width="100%" cellpadding="0" cellspacing="0">${rowsHtml}${moreRow}<tr><td style="padding:12px 0 4px;font:14px Arial,sans-serif;color:#333">Total</td><td align="right" style="padding:12px 0 4px;font:bold 16px Arial,sans-serif;color:#111">${totalFormatted}</td></tr></table></td></tr><tr><td align="center" style="padding-top:20px;font:11px Arial,sans-serif;color:#999">Powered by <a href="https://sleek.com" style="color:#0F6DFA">Sleek</a></td></tr></table></td></tr></table>`

  if (html.length > MAX_HTML_CHARS) {
    html = clip(html, MAX_HTML_CHARS)
  }

  const plainLines = [
    `${companyName} sent you an invoice`,
    '',
    totalFormatted,
    `Due on ${dueDisplayLong}`,
    '',
    `Invoice # ${invoiceNumber} for ${clientName}`,
    '—'.repeat(28),
    ...items.map((row) => `${row.labelRaw}  ${row.amountFormatted}`),
    ...(omitted > 0 ? [`+ ${omitted} more line item(s).`] : []),
    '',
    `Total  ${totalFormatted}`,
    '',
    'Powered by Sleek — https://sleek.com',
  ]
  let plain = plainLines.join('\n')
  plain = clip(plain, MAX_PLAIN_CHARS)

  const env = invoiceEmailEnvelopeDefaults()

  return {
    to: form.customerEmail.trim(),
    subject,
    html_body: html,
    plain_body: plain,
    reply_to: env.replyTo,
    bcc: env.bcc,
    from_name: env.fromName,
    from_email: env.fromEmail,
  }
}
