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
  if (paymentTerms === 'receipt') return d
  const days =
    paymentTerms === '15' ? 15 : paymentTerms === '60' ? 60 : 30
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

export function initialForm() {
  return {
    customerName: '',
    customerEmail: '',
    addressVisible: false,
    address: '',
    invoiceNumber: 'US-115',
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    currency: 'SGD',
    items: [newLineItem()],
    notes: '',
    selectedBankId: BANK_ACCOUNTS[0].id,
    bankDetailsText: bankDetailsFor(BANK_ACCOUNTS[0].id),
    paymentTerms: '30',
    companyName: 'COMPANY NAME PTE. LTD.',
  }
}

export function lineAmount(qtyStr, priceStr) {
  const q = parseFloat(qtyStr) || 0
  const p = parseFloat(priceStr) || 0
  return q * p
}
