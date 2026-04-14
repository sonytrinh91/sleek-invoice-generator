import { Controller, useFormContext } from 'react-hook-form'
import { PAYMENT_OPTIONS } from '../../invoice/constants.js'
import {
  Card,
  FieldLabel,
  fieldInlineErrorClass,
  OutlinedInput,
} from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

export function InvoicePaymentSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <FieldLabel>Invoice & payment</FieldLabel>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap gap-3">
          <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
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
          </div>
          <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
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
          </div>
        </div>
        {errors.paymentTerms?.message ? (
          <p className={fieldInlineErrorClass} role="alert">
            {errors.paymentTerms.message}
          </p>
        ) : null}
      </div>
    </Card>
  )
}
