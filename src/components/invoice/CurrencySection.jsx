import { CURRENCIES } from '../../invoice/constants.js'
import { Card, FieldLabel, SelectChevron, selectClass } from './FormPrimitives.jsx'

export function CurrencySection({ currency, onChange }) {
  return (
    <Card>
      <FieldLabel>Currency</FieldLabel>
      <div className="relative">
        <select
          value={currency}
          onChange={(e) => onChange({ currency: e.target.value })}
          className={selectClass}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <SelectChevron />
      </div>
    </Card>
  )
}
