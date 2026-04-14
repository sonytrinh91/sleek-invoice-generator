import { useFormContext } from 'react-hook-form'
import { sectionErrorLine } from '../../invoice/sectionErrors.js'
import {
  Card,
  FieldLabel,
  OutlinedInput,
  sectionFooterErrorClass,
} from './FormPrimitives.jsx'

export function CustomerSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const customerErrorLine = sectionErrorLine(errors, [
    'customerName',
    'customerEmail',
  ])

  return (
    <Card>
      <FieldLabel>Customer name and email</FieldLabel>
      <div className="flex flex-row flex-wrap gap-3">
        <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
          <OutlinedInput
            id="customer-name"
            label="Customer name"
            type="text"
            autoComplete="name"
            error={errors.customerName?.message}
            {...register('customerName')}
          />
        </div>
        <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
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
      </div>
      {customerErrorLine ? (
        <p className={sectionFooterErrorClass} role="alert">
          {customerErrorLine}
        </p>
      ) : null}
    </Card>
  )
}
