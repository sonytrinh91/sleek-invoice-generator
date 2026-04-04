import { BANK_ACCOUNTS } from '../../invoice/constants.js'
import { Card, FieldLabel, OutlinedSelect, OutlinedTextarea } from './FormPrimitives.jsx'

export function BankDetailsSection({
  selectedBankId,
  bankDetailsText,
  onBankChange,
  onChange,
}) {
  return (
    <Card>
      <FieldLabel>Bank details</FieldLabel>
      <div className="space-y-3">
        <OutlinedSelect
          id="bank-account"
          label="Bank account"
          value={selectedBankId}
          onChange={onBankChange}
        >
          <option value="" disabled>
            Select bank account
          </option>
          {BANK_ACCOUNTS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </OutlinedSelect>
        <OutlinedTextarea
          id="bank-payment-details"
          label="Payment details"
          rows={5}
          value={bankDetailsText}
          onChange={(e) => onChange({ bankDetailsText: e.target.value })}
        />
      </div>
    </Card>
  )
}
