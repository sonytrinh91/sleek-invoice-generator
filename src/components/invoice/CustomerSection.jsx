import { useState } from 'react'
import { isValidEmailFormat } from '../../invoice/validation.js'
import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'

export function CustomerSection({
  customerName,
  customerEmail,
  onChange,
  showCustomerErrors,
}) {
  const [emailBlurred, setEmailBlurred] = useState(false)
  const shouldValidateEmail = emailBlurred || showCustomerErrors
  const emailError =
    shouldValidateEmail &&
    (customerEmail.trim() === '' || !isValidEmailFormat(customerEmail))
      ? 'Please provide a valid email address.'
      : null

  return (
    <Card>
      <FieldLabel>Customer name and email</FieldLabel>
      <div className="space-y-3">
        <OutlinedInput
          id="customer-name"
          label="Customer name"
          type="text"
          autoComplete="name"
          value={customerName}
          onChange={(e) => onChange({ customerName: e.target.value })}
        />
        <OutlinedInput
          id="customer-email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={customerEmail}
          onChange={(e) => onChange({ customerEmail: e.target.value })}
          onBlur={() => setEmailBlurred(true)}
          error={emailError}
        />
      </div>
    </Card>
  )
}
