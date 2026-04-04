import { useFormContext } from 'react-hook-form'
import { COUNTRIES } from '../../invoice/constants.js'
import { AddOutlineButton } from './AddOutlineButton.jsx'
import { Card, FloatingField, FloatingSelect } from './FormPrimitives.jsx'

export function AddressSection() {
  const { register, watch, setValue } = useFormContext()
  const addressVisible = watch('addressVisible')
  const country = watch('country')

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
          <div className="flex gap-2 sm:gap-3">
            <FloatingField
              id="address-postal"
              label="Postal code"
              autoComplete="postal-code"
              title="Postal / ZIP code"
              narrow
              {...register('postalCode')}
            />
            <FloatingSelect
              id="address-country"
              label="Country"
              value={country}
              {...register('country')}
            >
              <option value="" disabled>
                {'\u00a0'}
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </FloatingSelect>
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
