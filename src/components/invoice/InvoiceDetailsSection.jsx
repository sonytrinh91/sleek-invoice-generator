import { Card, FieldLabel, OutlinedInput } from './FormPrimitives.jsx'

export function InvoiceDetailsSection({
  invoiceNumber,
  issueDate,
  onChange,
}) {
  return (
    <Card>
      <FieldLabel>Invoice details</FieldLabel>
      <div className="space-y-3">
        <OutlinedInput
          id="invoice-number"
          label="Invoice number"
          type="text"
          value={invoiceNumber}
          onChange={(e) => onChange({ invoiceNumber: e.target.value })}
        />
        <OutlinedInput
          id="issue-date"
          label="Issue date"
          type="date"
          value={issueDate}
          onChange={(e) => onChange({ issueDate: e.target.value })}
        />
      </div>
    </Card>
  )
}
