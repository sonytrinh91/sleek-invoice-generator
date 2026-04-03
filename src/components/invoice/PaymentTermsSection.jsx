import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import { Card, FieldLabel, SelectChevron, selectClass } from './FormPrimitives.jsx'

export function PaymentTermsSection({ paymentTerms, onChange }) {
  return (
    <Card>
      <FieldLabel>Payment details</FieldLabel>
      <div className="relative">
        <select
          value={paymentTerms}
          onChange={(e) => onChange({ paymentTerms: e.target.value })}
          className={selectClass}
        >
          {PAYMENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>
    </Card>
  )
}
