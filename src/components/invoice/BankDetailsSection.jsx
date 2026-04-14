import { useFormContext } from 'react-hook-form'
import { sectionErrorLine } from '../../invoice/sectionErrors.js'
import {
  Card,
  FieldLabel,
  OutlinedTextarea,
  sectionFooterErrorClass,
} from './FormPrimitives.jsx'

export function BankDetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const bankErrorLine = sectionErrorLine(errors, ['bankDetailsText'])

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
      {bankErrorLine ? (
        <p className={sectionFooterErrorClass} role="alert">
          {bankErrorLine}
        </p>
      ) : null}
    </Card>
  )
}
