export const ACCENT = '#0F6DFA'

/** date-fns pattern for issue/due dates on the invoice preview */
export const DISPLAY_DATE_FORMAT = 'dd-MM-yyyy'

export const PAYMENT_OPTIONS = [
  { value: '30', label: 'Due in 30 days' },
  { value: '25', label: 'Due in 25 days' },
  { value: '20', label: 'Due in 20 days' },
  { value: '15', label: 'Due in 15 days' },
  { value: '10', label: 'Due in 10 days' },
]

/** ISO-style codes for the address country select */
export const COUNTRIES = [
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'PH', name: 'Philippines' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
]

export const BANK_ACCOUNTS = [
  {
    id: 'wise',
    label: 'Wise - 1231231231122 Multi currency',
    details:
      'Pay via bank transfer - \nBank Name: Wise - \nAccount Number: 1231231231122',
  },
  {
    id: 'dbs',
    label: 'DBS - Current 001-234567',
    details:
      'Pay via bank transfer\nBank Name: DBS Bank Ltd\nAccount Number: 001-234567',
  },
  {
    id: 'ocbc',
    label: 'OCBC - Business 567891234',
    details:
      'Pay via bank transfer\nBank Name: OCBC Bank\nAccount Number: 567891234',
  },
]
