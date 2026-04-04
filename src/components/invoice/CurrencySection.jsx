import { Controller, useFormContext } from 'react-hook-form'
import { Card } from './FormPrimitives.jsx'
import { CurrencyCombobox } from './CurrencyCombobox.jsx'

export function CurrencySection() {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">Currency</h2>
      <Controller
        control={control}
        name="currency"
        render={({ field }) => (
          <CurrencyCombobox
            id="currency"
            value={field.value}
            onChange={(patch) => field.onChange(patch.currency)}
          />
        )}
      />
      {errors.currency?.message ? (
        <p className="mt-2 text-xs text-red-800" role="alert">
          {errors.currency.message}
        </p>
      ) : null}
    </Card>
  )
}
