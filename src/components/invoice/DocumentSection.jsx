import { Controller, useFormContext } from 'react-hook-form'
import { sectionErrorLine } from '../../invoice/sectionErrors.js'
import {
  Card,
  FieldLabel,
  OutlinedInput,
  sectionFooterErrorClass,
} from './FormPrimitives.jsx'
import { CurrencyCombobox } from './CurrencyCombobox.jsx'

export function DocumentSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const documentErrorLine = sectionErrorLine(errors, [
    'invoiceNumber',
    'currency',
  ])

  return (
    <Card className="min-w-0">
      <FieldLabel>Document</FieldLabel>
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
        <OutlinedInput
          id="document-number"
          label="# Number"
          type="text"
          className="w-full min-w-0 sm:w-auto sm:shrink-0"
          error={errors.invoiceNumber?.message}
          {...register('invoiceNumber')}
        />
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <div className="min-w-0">
              <CurrencyCombobox
                id="document-currency"
                value={field.value}
                onChange={(patch) => field.onChange(patch.currency)}
                error={errors.currency?.message}
              />
            </div>
          )}
        />
      </div>
      {documentErrorLine ? (
        <p className={sectionFooterErrorClass} role="alert">
          {documentErrorLine}
        </p>
      ) : null}
    </Card>
  )
}
