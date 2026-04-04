import { Controller, useFormContext } from 'react-hook-form'
import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import { Card } from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

export function PaymentTermsSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Payment details
      </h2>
      <Controller
        control={control}
        name="paymentTerms"
        render={({ field }) => (
          <SearchableSelectCombobox
            id="payment-terms"
            label="Payment terms"
            options={PAYMENT_OPTIONS}
            value={field.value}
            onValueChange={field.onChange}
            toggleAriaLabel="Toggle payment terms list"
          />
        )}
      />
      {errors.paymentTerms?.message ? (
        <p className="mt-2 text-xs text-red-800" role="alert">
          {errors.paymentTerms.message}
        </p>
      ) : null}
    </Card>
  )
}
