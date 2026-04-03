import { Plus } from 'lucide-react'
import { ACCENT } from '../../invoice/constants.js'
import { Card, FieldLabel, inputClass } from './FormPrimitives.jsx'

export function AddressSection({
  addressVisible,
  address,
  onChange,
}) {
  return (
    <Card>
      <FieldLabel>Address (optional)</FieldLabel>
      {!addressVisible ? (
        <button
          type="button"
          onClick={() => onChange({ addressVisible: true })}
          className="inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium text-accent transition hover:bg-blue-50"
          style={{ borderColor: ACCENT }}
        >
          <Plus className="size-4" />
          Add address
        </button>
      ) : (
        <textarea
          rows={3}
          placeholder="Street, city, postal code"
          value={address}
          onChange={(e) => onChange({ address: e.target.value })}
          className={inputClass}
        />
      )}
    </Card>
  )
}
