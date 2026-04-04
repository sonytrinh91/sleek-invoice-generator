import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import { Card, OutlinedSelect } from './FormPrimitives.jsx'

export function PaymentTermsSection({ paymentTerms, onChange }) {
  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Payment details
      </h2>
      <OutlinedSelect
        id="payment-terms"
        label="Payment terms"
        value={paymentTerms}
        onChange={(e) => onChange({ paymentTerms: e.target.value })}
      >
        {PAYMENT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </OutlinedSelect>
    </Card>
  )
}
