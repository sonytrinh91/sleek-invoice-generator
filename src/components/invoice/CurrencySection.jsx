import { CurrencyCombobox } from './CurrencyCombobox.jsx'
import { Card } from './FormPrimitives.jsx'

export function CurrencySection({ currency, onChange }) {
  return (
    <Card>
      <h2 className="mb-3 text-base font-semibold text-gray-900">Currency</h2>
      <CurrencyCombobox id="currency" value={currency} onChange={onChange} />
    </Card>
  )
}
