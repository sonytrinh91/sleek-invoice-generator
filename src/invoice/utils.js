import { addDays, format, isValid, parse } from 'date-fns'
import { BANK_ACCOUNTS } from './constants.js'

export function bankDetailsFor(id) {
  return BANK_ACCOUNTS.find((b) => b.id === id)?.details ?? ''
}

export function formatMoney(amount, currencyCode) {
  try {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount)
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`
  }
}

export function parseIssueDate(issueDateStr) {
  return parse(issueDateStr, 'yyyy-MM-dd', new Date())
}

export function computeDueDate(issueDateStr, paymentTerms) {
  const d = parseIssueDate(issueDateStr)
  if (!isValid(d)) return null
  const days = Number.parseInt(paymentTerms, 10)
  if (!Number.isFinite(days) || days < 0) return addDays(d, 30)
  return addDays(d, days)
}

export function newLineItem() {
  return {
    id: crypto.randomUUID(),
    description: '',
    qty: '1',
    unitPrice: '0',
  }
}

/** First URL path segment → default invoice currency (e.g. host `/sg/...` → SGD). */
export function defaultCurrencyForPathname(pathname) {
  const segment = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? ''
  const byRegion = {
    sg: 'SGD',
    au: 'AUD',
    hk: 'HKD',
    uk: 'GBP',
  }
  return byRegion[segment] ?? 'SGD'
}

export function initialForm() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/'
  return {
    customerName: '',
    customerEmail: '',
    addressVisible: false,
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    invoiceNumber: 'DEMO - TEST - 001',
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    currency: defaultCurrencyForPathname(pathname),
    items: [newLineItem()],
    notes: '',
    taxEnabled: false,
    taxRate: '9',
    taxIsPercent: true,
    discountExpanded: false,
    discountValue: '0',
    discountIsPercent: true,
    bankDetailsText: bankDetailsFor(BANK_ACCOUNTS[0].id),
    paymentTerms: '30',
    companyName: 'COMPANY NAME PTE. LTD.',
    yourEmail: '',
    logoDataUrl: '',
  }
}

export function lineAmount(qtyStr, priceStr) {
  const q = parseFloat(qtyStr) || 0
  const p = parseFloat(priceStr) || 0
  return q * p
}

/** Multi-line block for invoice preview (Bill to) */
export function formatInvoiceAddress(form) {
  if (!form.addressVisible) return ''
  const line1 = form.addressLine1?.trim() ?? ''
  const line2 = form.addressLine2?.trim() ?? ''
  const postal = form.postalCode?.trim() ?? ''
  return [line1, line2, postal].filter(Boolean).join('\n')
}
