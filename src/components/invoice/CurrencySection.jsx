import { CURRENCIES } from '../../invoice/constants.js'
import { Card, OutlinedSelect } from './FormPrimitives.jsx'

export function CurrencySection({ currency, onChange }) {
  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">Currency</h2>
      <OutlinedSelect
        id="currency"
        label="Invoice currency"
        value={currency}
        onChange={(e) => onChange({ currency: e.target.value })}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </OutlinedSelect>
    </Card>
  )
}
