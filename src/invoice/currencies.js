import { CURRENCY_CODES } from './currencyCodes.generated.js'

let displayNames
function currencyDisplayName(code) {
  try {
    displayNames ??= new Intl.DisplayNames('en', { type: 'currency' })
    return displayNames.of(code) ?? code
  } catch {
    return code
  }
}

/** Active ISO 4217 currencies with English names (via Intl). */
export const CURRENCIES = CURRENCY_CODES.map((code) => {
  const name = currencyDisplayName(code)
  return {
    code,
    name,
    label: `${code} - ${name}`,
  }
})
