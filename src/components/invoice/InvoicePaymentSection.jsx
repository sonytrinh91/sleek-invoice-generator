import { Controller, useFormContext } from 'react-hook-form'
import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

export function InvoicePaymentSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <FieldLabel>Invoice & payment</FieldLabel>
      <div className="space-y-3">
        <Controller
          control={control}
          name="issueDate"
          render={({ field, fieldState }) => (
            <OutlinedInput
              id="issue-date"
              label="Issue date"
              type="date"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
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
          <p className="text-xs text-red-800" role="alert">
            {errors.paymentTerms.message}
          </p>
        ) : null}
      </div>
    </Card>
  )
}
