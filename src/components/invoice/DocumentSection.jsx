import { Controller, useFormContext } from 'react-hook-form'
import { COUNTRIES } from '../../invoice/constants.js'
import { syncCurrencyFromCountry } from '../../invoice/countryCurrency.js'
import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'
import { CurrencyCombobox } from './CurrencyCombobox.jsx'

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.code,
  label: c.name,
}))

export function DocumentSection() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <FieldLabel>Document</FieldLabel>
      <div className="flex space-y-3 flex-row gap-4">
        <OutlinedInput
          id="document-number"
          label="# Number"
          type="text"
          className="w-auto max-w-30 shrink-0"
          error={errors.invoiceNumber?.message}
          {...register('invoiceNumber')}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <div className="min-w-44 shrink-0 sm:min-w-0 sm:flex-1">
              <SearchableSelectCombobox
                id="document-country"
                label="Country"
                options={COUNTRY_OPTIONS}
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v)
                  syncCurrencyFromCountry(setValue, v)
                }}
                toggleAriaLabel="Toggle country list"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <div className="min-w-48 shrink-0 sm:w-56">
              <CurrencyCombobox
                id="document-currency"
                value={field.value}
                onChange={(patch) => field.onChange(patch.currency)}
              />
            </div>
          )}
        />
      </div>
      {errors.currency?.message ? (
        <p className="mt-2 text-xs text-red-800" role="alert">
          {errors.currency.message}
        </p>
      ) : null}
    </Card>
  )
}
