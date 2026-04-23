import { format, isValid } from 'date-fns'
import { ACCENT } from './constants.js'
import { invoiceEmailEnvelopeDefaults } from './invoiceEmailConfig.js'
import { computeDueDate, formatMoney, parseIssueDate } from './utils.js'

/** Keep webhook body small (Zapier / proxies often reject large POSTs). */
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

function clip(s, max) {
  if (s.length <= max) return s
  return `${s.slice(0, max - 20)}\n…(truncated)`
}

function truncateText(s, max) {
  const t = String(s).trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}

function bankDetailsToHtml(text) {
  const t = escapeHtml(String(text ?? '').trim())
  if (!t) return '<span style="color:#9ca3af">—</span>'
  return t.replace(/\n/g, '<br>')
}

function firstNameFromCustomer(name) {
  const n = String(name ?? '').trim()
  if (!n) return 'there'
  return n.split(/\s+/)[0]
}

/**
 * @param {object} form
 * @param {number[]} _lineAmounts — reserved (webhook payload shape)
 * @param {{ grandTotal: number }} totals
 */
export function buildInvoiceZapierEmailPayload(form, _lineAmounts, totals) {
  const currency = form.currency?.trim() || 'SGD'
  const clientName = form.customerName.trim()
  const companyName = truncateText(form.companyName.trim(), 120)
  const invoiceNumber = truncateText(form.invoiceNumber.trim(), 60)
  const totalFormatted = formatMoney(totals.grandTotal, currency)
  const hiName = escapeHtml(firstNameFromCustomer(clientName))
  const companyEsc = escapeHtml(companyName)
  const invEsc = escapeHtml(invoiceNumber)

  const issueParsed = parseIssueDate(form.issueDate ?? '')
  const issueLong = isValid(issueParsed)
    ? format(issueParsed, 'd MMMM yyyy')
    : escapeHtml(String(form.issueDate ?? '—'))

  const dueD = computeDueDate(form.issueDate, form.paymentTerms)
  const dueLong =
    dueD && isValid(dueD) ? format(dueD, 'd MMMM yyyy') : '—'

  let subject = `Invoice #${invoiceNumber} from ${companyName} - Due ${dueLong}`
  subject = clip(subject, MAX_SUBJECT_CHARS)

  const contactRaw = String(form.yourEmail ?? '').trim()
  const contactEsc = escapeHtml(contactRaw)
  const supportBlock =
    contactRaw.length > 0
      ? `Questions about this invoice? Email <a href="mailto:${contactEsc}" style="color:${ACCENT};text-decoration:none;font-weight:600">${contactEsc}</a> and <strong>${companyEsc}</strong> will get back to you directly.`
      : `Questions about this invoice? Reply to this email and <strong>${companyEsc}</strong> will get back to you directly.`

  const summaryBg = '#f0f5fb'
  const summaryBorder = '#dbe4f0'
  const muted = '#6b7280'
  const text = '#111827'
  const footerBg = '#e8f2fc'

  let html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:${text};line-height:1.5">
  <tr>
    <td align="center" style="padding:24px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto">
        <tr>
          <td style="padding-bottom:16px;border-bottom:1px solid #e5e7eb">
            <a href="https://sleek.com" target="_blank" rel="noopener noreferrer"><img src="https://sleek.com/sg/wp-content/uploads/sites/3/2025/07/Sleek-logo-main.svg" alt="${companyName}" style="max-width:100%;height:33px"></a>
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px;font-size:15px;color:${text}">
            <p style="margin:0 0 12px;font-size:15px;font-weight:700">Hi ${hiName},</p>
            <p style="margin:0;font-size:15px;color:#374151">You have a new invoice from <strong>${companyEsc}</strong>. Please review the details below and arrange payment before the due date.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${summaryBg};border:1px solid ${summaryBorder};border-radius:10px;overflow:hidden">
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Invoice number</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${invEsc}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Invoice date</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${issueLong}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Due date</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:#dc2626">${escapeHtml(dueLong)}</td>
              </tr>
              <tr>
                <td style="padding:18px 18px 16px;font-size:15px;color:${muted}">Amount due</td>
                <td align="right" style="padding:18px 18px 16px;font-size:22px;font-weight:700;color:${text};white-space:nowrap">${totalFormatted}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top:14px">
            <p style="font-size:12px;font-weight:700;color:${text};letter-spacing:0.06em">BANK TRANSFER DETAILS</p>
            <div style="font-size:14px;color:${text};line-height:1.65">
              ${bankDetailsToHtml(form.bankDetailsText)}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding-top:12px;border-top:1px solid #e5e7eb">
            <p style="font-size:14px;color:#4b5563">${supportBlock}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 18px;background:${footerBg};border-radius:8px;margin-top:24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle" style="padding-right:12px;font-size:13px;color:#374151;line-height:1.45">
                  <strong>${companyEsc}</strong> uses Sleek to create and send professional invoices in minutes — free, no account needed.
                </td>
                <td valign="middle" align="right" style="white-space:nowrap">
                  <a href="https://sleek.com/sg/invoice-generator" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${ACCENT};color:#ffffff;font-weight:700;font-size:13px;padding:10px 16px;border-radius:6px;text-decoration:none">Try free →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.replace(/\n\s*/g, '')

  if (html.length > MAX_HTML_CHARS) {
    html = clip(html, MAX_HTML_CHARS)
  }

  const plain = clip(
    [
      'sleek',
      '',
      `Hi ${firstNameFromCustomer(clientName)},`,
      '',
      `You have a new invoice from ${companyName}. Please review the details below and arrange payment before the due date.`,
      '',
      `Invoice number: ${invoiceNumber}`,
      `Invoice date: ${isValid(issueParsed) ? format(issueParsed, 'd MMMM yyyy') : form.issueDate}`,
      `Due date: ${dueLong}`,
      `Amount due: ${totalFormatted}`,
      '',
      'BANK TRANSFER DETAILS',
      String(form.bankDetailsText ?? '').trim() || '—',
      '',
      contactRaw
        ? `Questions? Email ${contactRaw}`
        : 'Questions? Reply to this email.',
      '',
      `${companyName} uses Sleek — https://sleek.com`,
    ].join('\n'),
    MAX_PLAIN_CHARS,
  )

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

function companyFirstLine(companyNameRaw) {
  return String(companyNameRaw ?? '')
    .trim()
    .split(/\n/)[0]
    .trim()
}

/**
 * Sender receipt: delivered summary after the client invoice email is sent.
 * Only call when `yourEmail` is non-empty and passes the same format check as the form schema.
 *
 * @param {object} form
 * @param {{ grandTotal: number }} totals
 */
export function buildSenderConfirmationZapierEmailPayload(form, totals) {
  const currency = form.currency?.trim() || 'SGD'
  const clientName = form.customerName.trim()
  const clientEmail = form.customerEmail.trim()
  const invoiceNumber = truncateText(form.invoiceNumber.trim(), 60)
  const totalFormatted = formatMoney(totals.grandTotal, currency)
  const senderTo = String(form.yourEmail ?? '').trim()

  const hiSender = escapeHtml(
    firstNameFromCustomer(companyFirstLine(form.companyName)),
  )
  const invEsc = escapeHtml(invoiceNumber)
  const clientEsc = escapeHtml(clientName)
  const emailEsc = escapeHtml(clientEmail)
  const mailtoHref = `mailto:${encodeURIComponent(clientEmail)}`
  const deliveredPlain = `${clientName} · ${clientEmail}`

  const issueParsed = parseIssueDate(form.issueDate ?? '')
  const issueLong = isValid(issueParsed)
    ? format(issueParsed, 'd MMMM yyyy')
    : escapeHtml(String(form.issueDate ?? '—'))

  const dueD = computeDueDate(form.issueDate, form.paymentTerms)
  const dueLong =
    dueD && isValid(dueD) ? format(dueD, 'd MMMM yyyy') : '—'

  let subject = `Invoice ${invoiceNumber} sent successfully`
  subject = clip(subject, MAX_SUBJECT_CHARS)

  const summaryBg = '#f3f4f6'
  const summaryBorder = '#e5e7eb'
  const muted = '#6b7280'
  const text = '#111827'
  const upsellBg = '#eff6ff'
  const upsellBorder = '#bfdbfe'

  let html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:${text};line-height:1.5">
  <tr>
    <td align="center" style="padding:24px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto">
        <tr>
          <td style="padding-bottom:16px">
            <a href="https://sleek.com" target="_blank" rel="noopener noreferrer"><img src="https://sleek.com/sg/wp-content/uploads/sites/3/2025/07/Sleek-logo-main.svg" alt="sleek" style="max-width:100%;height:33px"></a>
          </td>
        </tr>
        <tr>
          <td style="padding:0;border-radius:10px;overflow:hidden;background:${ACCENT}">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:20px 22px;color:#ffffff">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px">
                    <tr>
                      <td valign="middle" style="padding-right:10px">
                        <span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border-radius:9999px;background:rgba(255,255,255,0.25);font-size:16px">&#10003;</span>
                      </td>
                      <td valign="middle" style="font-size:15px;font-weight:700">Invoice sent successfully</td>
                    </tr>
                  </table>
                  <p style="margin:0;font-size:14px;opacity:0.95;color:#ffffff">Delivered to <a href="${mailtoHref}" style="color:#ffffff !important;-webkit-text-fill-color:#ffffff;text-decoration:underline">${emailEsc}</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px;font-size:15px;color:${text}">
            <p style="margin:0 0 12px;font-size:15px;font-weight:700">Hi ${hiSender},</p>
            <p style="margin:0;font-size:15px;color:#374151">Your invoice has been sent. Here is a summary of what was delivered.</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${summaryBg};border:1px solid ${summaryBorder};border-radius:10px;overflow:hidden">
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Invoice number</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${invEsc}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Sent to</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${clientEsc}<br><span style="font-weight:600;font-size:13px;color:#4b5563">${emailEsc}</span></td>
              </tr>
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Invoice date</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${issueLong}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;color:${muted}">Due date</td>
                <td align="right" style="padding:14px 18px;border-bottom:1px solid ${summaryBorder};font-size:14px;font-weight:700;color:${text}">${escapeHtml(dueLong)}</td>
              </tr>
              <tr>
                <td style="padding:18px 18px 16px;font-size:15px;color:${muted}">Amount due</td>
                <td align="right" style="padding:18px 18px 16px;font-size:22px;font-weight:700;color:${text};white-space:nowrap">${totalFormatted}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top:20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${upsellBg};border:1px solid ${upsellBorder};border-radius:10px">
              <tr>
                <td style="padding:16px 18px">
                  <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:${text}">Get more from every invoice</p>
                  <p style="margin:0;font-size:13px;color:#374151;line-height:1.5">Upgrade to Sleek Accounting and unlock the full invoicing toolkit &mdash; all connected to your books automatically.</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 0;border-collapse:separate;border-spacing:0">
                    <tr>
                      <td valign="top" width="50%" style="padding:4px 6px 4px 0">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0">
                          <tr>
                            <td style="background:#ffffff;border:1px solid ${upsellBorder};border-radius:9999px;padding:8px 12px;font-size:12px;line-height:1.35;font-weight:600;color:${ACCENT}">&#10003; Accept Stripe payments</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="50%" style="padding:4px 0 4px 6px">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0">
                          <tr>
                            <td style="background:#ffffff;border:1px solid ${upsellBorder};border-radius:9999px;padding:8px 12px;font-size:12px;line-height:1.35;font-weight:600;color:${ACCENT}">&#10003; Track Sent, Viewed, Paid, Overdue</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" width="50%" style="padding:4px 6px 4px 0">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0">
                          <tr>
                            <td style="background:#ffffff;border:1px solid ${upsellBorder};border-radius:9999px;padding:8px 12px;font-size:12px;line-height:1.35;font-weight:600;color:${ACCENT}">&#10003; Auto-fill saved clients</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="50%" style="padding:4px 0 4px 6px">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0">
                          <tr>
                            <td style="background:#ffffff;border:1px solid ${upsellBorder};border-radius:9999px;padding:8px 12px;font-size:12px;line-height:1.35;font-weight:600;color:${ACCENT}">&#10003; Sync to accounting</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:14px 0 0">
                    <a href="https://sleek.com/sg/accounting-services-singapore" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${ACCENT};color:#ffffff;font-weight:700;font-size:13px;padding:10px 16px;border-radius:6px;text-decoration:none">Upgrade to Sleek Accounting &rarr;</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top:28px;padding-bottom:8px">
            <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.5">You are receiving this because you sent an invoice via Sleek Invoice Generator.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.replace(/\n\s*/g, '')

  if (html.length > MAX_HTML_CHARS) {
    html = clip(html, MAX_HTML_CHARS)
  }

  const plain = clip(
    [
      'sleek',
      '',
      `Hi ${firstNameFromCustomer(companyFirstLine(form.companyName))},`,
      '',
      'Your invoice has been sent successfully.',
      `Delivered to: ${clientEmail}`,
      '',
      `Invoice number: ${invoiceNumber}`,
      `Sent to: ${deliveredPlain}`,
      `Invoice date: ${isValid(issueParsed) ? format(issueParsed, 'd MMMM yyyy') : form.issueDate}`,
      `Due date: ${dueLong}`,
      `Amount due: ${totalFormatted}`,
      '',
      'Get more from every invoice — Upgrade to Sleek Accounting and unlock the full invoicing toolkit.',
      '✓ Accept Stripe payments',
      '✓ Track Sent, Viewed, Paid, Overdue',
      '✓ Auto-fill saved clients',
      '✓ Sync to accounting',
      '',
      'https://sleek.com/sg/accounting',
    ].join('\n'),
    MAX_PLAIN_CHARS,
  )

  const env = invoiceEmailEnvelopeDefaults()

  return {
    to: senderTo,
    subject,
    html_body: html,
    plain_body: plain,
    reply_to: env.replyTo,
    bcc: env.bcc,
    from_name: env.fromName,
    from_email: env.fromEmail,
  }
}
