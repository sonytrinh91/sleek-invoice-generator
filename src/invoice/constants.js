export const ACCENT = '#0052FF'

export const CURRENCIES = [
  { code: 'SGD', label: 'SGD - Singapore Dollar' },
  { code: 'USD', label: 'USD - US Dollar' },
  { code: 'EUR', label: 'EUR - Euro' },
]

export const PAYMENT_OPTIONS = [
  { value: '30', label: 'Due in 30 days' },
  { value: '15', label: 'Due in 15 days' },
  { value: '60', label: 'Due in 60 days' },
  { value: 'receipt', label: 'Due on receipt' },
]

export const BANK_ACCOUNTS = [
  {
    id: 'wise',
    label: 'Wise - 1231231231122 Multi currency',
    details:
      'Pay via bank transfer\nBank Name: Wise\nAccount Number: 1231231231122',
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
