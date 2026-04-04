import { invoiceFormSchema } from './invoiceSchema.js'

export { invoiceFormSchema }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmailFormat(value) {
  return EMAIL_RE.test(String(value).trim())
}

export function isEmailFieldValid(value) {
  const v = String(value).trim()
  if (!v) return false
  return isValidEmailFormat(v)
}

/** Download enabled when full form satisfies {@link invoiceFormSchema}. */
export function isInvoiceDownloadReady(form) {
  return invoiceFormSchema.safeParse(form).success
}
