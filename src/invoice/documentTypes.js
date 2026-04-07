const HEADING_BY_VALUE = {
  INVOICE: 'Invoice',
  RECEIPT: 'Receipt',
  QUOTE: 'Quote',
  CREDIT_NOTE: 'Credit note',
  PURCHASE_ORDER: 'Purchase order',
}

/** Title shown on preview / PDF. */
export function documentTypeHeading(value) {
  return HEADING_BY_VALUE[value] ?? 'Invoice'
}

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'INVOICE', label: 'INVOICE' },
  { value: 'RECEIPT', label: 'RECEIPT' },
  { value: 'QUOTE', label: 'QUOTE' },
  { value: 'CREDIT_NOTE', label: 'CREDIT NOTE' },
  { value: 'PURCHASE_ORDER', label: 'PURCHASE ORDER' },
]
