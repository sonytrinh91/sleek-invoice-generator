import { BANK_ACCOUNTS } from '../../invoice/constants.js'
import {
  Card,
  FieldLabel,
  SelectChevron,
  inputClass,
  selectClass,
} from './FormPrimitives.jsx'

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
        <div className="relative">
          <select
            value={selectedBankId}
            onChange={onBankChange}
            className={selectClass}
          >
            <option value="" disabled>
              Select bank account
            </option>
            {BANK_ACCOUNTS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
        <textarea
          rows={5}
          placeholder="Payment details"
          value={bankDetailsText}
          onChange={(e) => onChange({ bankDetailsText: e.target.value })}
          className={inputClass}
        />
      </div>
    </Card>
  )
}
