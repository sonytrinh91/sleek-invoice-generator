import { Card, FieldLabel, OutlinedTextarea } from './FormPrimitives.jsx'

export function BankDetailsSection({ bankDetailsText, onChange }) {
  return (
    <Card>
      <FieldLabel>Bank details</FieldLabel>
        <OutlinedTextarea
          id="bank-payment-details"
          label="Payment details"
          rows={5}
          value={bankDetailsText}
          onChange={(e) => onChange({ bankDetailsText: e.target.value })}
        />
    </Card>
  )
}
