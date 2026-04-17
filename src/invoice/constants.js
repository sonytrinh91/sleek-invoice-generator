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

export const BANK_ACCOUNTS = [
  {
    id: 'wise',
    label: 'Wise - Multi currency',
    details:
      'Pay via bank transfer - \nBank Name - \nAccount Number -',
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
