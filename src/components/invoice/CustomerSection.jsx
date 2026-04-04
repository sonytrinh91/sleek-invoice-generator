import { useFormContext } from 'react-hook-form'
import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'

export function CustomerSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Card>
      <FieldLabel>Customer name and email</FieldLabel>
      <div className="space-y-3">
        <OutlinedInput
          id="customer-name"
          label="Customer name"
          type="text"
          autoComplete="name"
          error={errors.customerName?.message}
          {...register('customerName')}
        />
        <OutlinedInput
          id="customer-email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.customerEmail?.message}
          {...register('customerEmail')}
        />
      </div>
    </Card>
  )
}
