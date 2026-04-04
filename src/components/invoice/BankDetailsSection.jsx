import { useFormContext } from 'react-hook-form'
import { Card, FieldLabel, OutlinedTextarea } from './FormPrimitives.jsx'

export function BankDetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <FieldLabel>Bank details</FieldLabel>
      <OutlinedTextarea
        id="bank-payment-details"
        label="Payment details"
        rows={5}
        error={errors.bankDetailsText?.message}
        {...register('bankDetailsText')}
      />
    </Card>
  )
}
