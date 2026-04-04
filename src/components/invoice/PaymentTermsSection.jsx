import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import { Card } from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

export function PaymentTermsSection({ paymentTerms, onChange }) {
  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Payment details
      </h2>
      <SearchableSelectCombobox
        id="payment-terms"
        label="Payment terms"
        options={PAYMENT_OPTIONS}
        value={paymentTerms}
        onValueChange={(v) => onChange({ paymentTerms: v })}
        toggleAriaLabel="Toggle payment terms list"
      />
    </Card>
  )
}
