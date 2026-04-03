import { Card, FieldLabel, inputClass } from './FormPrimitives.jsx'

export function CustomerSection({ customerName, customerEmail, onChange }) {
  return (
    <Card>
      <FieldLabel>Customer name and email</FieldLabel>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => onChange({ customerName: e.target.value })}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          value={customerEmail}
          onChange={(e) => onChange({ customerEmail: e.target.value })}
          className={inputClass}
        />
      </div>
    </Card>
  )
}
