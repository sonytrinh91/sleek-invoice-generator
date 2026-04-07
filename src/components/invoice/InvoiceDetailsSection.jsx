import { Controller, useFormContext } from 'react-hook-form'
import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'

export function InvoiceDetailsSection() {
  const { control } = useFormContext()

  return (
    <Card>
      <FieldLabel>Invoice details</FieldLabel>
      <div className="space-y-3">
        <Controller
          control={control}
          name="issueDate"
          render={({ field, fieldState }) => (
            <OutlinedInput
              id="issue-date"
              label="Issue date"
              type="date"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    </Card>
  )
}
