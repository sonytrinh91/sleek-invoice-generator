import { CURRENCIES } from '../../invoice/constants.js'
import { Card, OutlinedSelect } from './FormPrimitives.jsx'

export function CurrencySection({ currency, onChange }) {
  return (
    <Card>
      <OutlinedSelect
        id="currency"
        label="Currency"
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
