import { Controller, useFormContext } from 'react-hook-form'
import { COUNTRIES } from '../../invoice/constants.js'
import { syncCurrencyFromCountry } from '../../invoice/countryCurrency.js'
import { AddOutlineButton } from './AddOutlineButton.jsx'
import { Card, FloatingField } from './FormPrimitives.jsx'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.code,
  label: c.name,
}))

export function AddressSection() {
  const { register, watch, control, setValue } = useFormContext()
  const addressVisible = watch('addressVisible')

  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Address (optional)
      </h2>

      {addressVisible ? (
        <div className="space-y-3">
          <FloatingField
            id="address-line-1"
            label="Address line 1"
            autoComplete="address-line1"
            {...register('addressLine1')}
          />
          <FloatingField
            id="address-line-2"
            label="Address line 2"
            autoComplete="address-line2"
            {...register('addressLine2')}
          />
          <div className="flex items-end gap-2 sm:gap-3">
            <FloatingField
              id="address-postal"
              label="Postal code"
              autoComplete="postal-code"
              title="Postal / ZIP code"
              narrow
              {...register('postalCode')}
            />
            <div className="min-w-0 flex-1">
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <SearchableSelectCombobox
                    id="address-country"
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
          </div>
        </div>
      ) : (
        <AddOutlineButton
          type="button"
          onClick={() => setValue('addressVisible', true, { shouldValidate: true })}
        >
          Add address
        </AddOutlineButton>
      )}
    </Card>
  )
}
