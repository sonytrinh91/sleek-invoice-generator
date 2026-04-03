import { Card, FieldLabel, inputClass } from './FormPrimitives.jsx'

export function InvoiceDetailsSection({
  invoiceNumber,
  issueDate,
  onChange,
}) {
  return (
    <Card>
      <FieldLabel>Invoice details</FieldLabel>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Invoice number"
          value={invoiceNumber}
          onChange={(e) => onChange({ invoiceNumber: e.target.value })}
          className={inputClass}
        />
        <input
          type="date"
          value={issueDate}
          onChange={(e) => onChange({ issueDate: e.target.value })}
          className={inputClass}
        />
      </div>
    </Card>
  )
}
