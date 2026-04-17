import { useFormContext } from 'react-hook-form'
import { AddOutlineButton } from './AddOutlineButton.jsx'
import { Card, FloatingField } from './FormPrimitives.jsx'

export function AddressSection() {
  const { register, watch, setValue } = useFormContext()
  const addressVisible = watch('addressVisible')

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold text-[#040015]">
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
          <FloatingField
            id="address-postal"
            label="Postal code"
            autoComplete="postal-code"
            title="Postal / ZIP code"
            {...register('postalCode')}
          />
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
