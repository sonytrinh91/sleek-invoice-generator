import { Controller, useFormContext } from 'react-hook-form'
import { COUNTRIES } from '../../invoice/constants.js'
import { DOCUMENT_TYPE_OPTIONS } from '../../invoice/documentTypes.js'
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
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Controller
            control={control}
            name="documentType"
            render={({ field, fieldState }) => (
              <SearchableSelectCombobox
                id="document-type"
                label="Document type"
                options={DOCUMENT_TYPE_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                searchable={false}
                toggleAriaLabel="Toggle document type list"
              />
            )}
          />
          <OutlinedInput
            id="document-number"
            label="# Number"
            type="text"
            error={errors.invoiceNumber?.message}
            {...register('invoiceNumber')}
          />
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
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
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <CurrencyCombobox
                  id="document-currency"
                  value={field.value}
                  onChange={(patch) => field.onChange(patch.currency)}
                />
              )}
            />
          </div>
        </div>
      </div>
      {errors.currency?.message ? (
        <p className="mt-2 text-xs text-red-800" role="alert">
          {errors.currency.message}
        </p>
      ) : null}
    </Card>
  )
}
