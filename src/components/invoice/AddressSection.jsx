import { Plus } from 'lucide-react'
import { ACCENT, COUNTRIES } from '../../invoice/constants.js'
import { Card, FloatingField, FloatingSelect } from './FormPrimitives.jsx'

const addButtonClass =
  'inline-flex items-center gap-1.5 rounded-sm cursor-pointer border border-1 px-4 py-3 text-sm font-medium text-accent transition hover:bg-blue-50'

export function AddressSection({
  addressVisible,
  addressLine1,
  addressLine2,
  postalCode,
  country,
  onChange,
}) {
  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">
        Address (optional)
      </h2>

      {addressVisible ? (
        <div className="space-y-3">
          <FloatingField
            id="address-line-1"
            label="Address line 1"
            autoComplete="address-line1"
            value={addressLine1}
            onChange={(e) => onChange({ addressLine1: e.target.value })}
          />
          <FloatingField
            id="address-line-2"
            label="Address line 2"
            autoComplete="address-line2"
            value={addressLine2}
            onChange={(e) => onChange({ addressLine2: e.target.value })}
          />
          <div className="flex gap-2 sm:gap-3">
            <FloatingField
              id="address-postal"
              label="Postal code"
              autoComplete="postal-code"
              title="Postal / ZIP code"
              value={postalCode}
              onChange={(e) => onChange({ postalCode: e.target.value })}
              narrow
            />
            <FloatingSelect
              id="address-country"
              label="Country"
              value={country}
              onChange={(e) => onChange({ country: e.target.value })}
            >
              <option value="" disabled>
                {'\u00a0'}
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </FloatingSelect>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onChange({ addressVisible: true })}
          className={addButtonClass}
          style={{ borderColor: ACCENT }}
        >
          <Plus className="size-4" />
          Add address
        </button>
      )}
    </Card>
  )
}
