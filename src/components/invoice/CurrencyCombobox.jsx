import { CURRENCIES } from '../../invoice/currencies.js'
import { SearchableSelectCombobox } from './SearchableSelectCombobox.jsx'

const currencyOptions = CURRENCIES.map((c) => ({
  value: c.code,
  label: c.label,
}))

export function CurrencyCombobox({ id, value, onChange }) {
  return (
    <SearchableSelectCombobox
      id={id}
      label="Currency"
      options={currencyOptions}
      value={value}
      onValueChange={(v) => onChange({ currency: v })}
      toggleAriaLabel="Toggle currency list"
    />
  )
}
