/**
 * ISO 3166-1 alpha-2 → ISO 4217. Used when the user picks a country so currency
 * updates to a sensible default (user can still change currency after).
 */

const EUR_ZONE = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'CH',
])

const COUNTRY_TO_CURRENCY = {
  SG: 'SGD',
  MY: 'MYR',
  TH: 'THB',
  ID: 'IDR',
  VN: 'VND',
  PH: 'PHP',
  MM: 'MMK',
  KH: 'KHR',
  LA: 'LAK',
  BN: 'BND',
  US: 'USD',
  CA: 'CAD',
  MX: 'MXN',
  GB: 'GBP',
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  CN: 'CNY',
  HK: 'HKD',
  TW: 'TWD',
  KR: 'KRW',
  IN: 'INR',
  PK: 'PKR',
  BD: 'BDT',
  LK: 'LKR',
  NP: 'NPR',
  AE: 'AED',
  SA: 'SAR',
  QA: 'QAR',
  KW: 'KWD',
  BH: 'BHD',
  OM: 'OMR',
  IL: 'ILS',
  TR: 'TRY',
  EG: 'EGP',
  ZA: 'ZAR',
  NG: 'NGN',
  KE: 'KES',
  BR: 'BRL',
  AR: 'ARS',
  CL: 'CLP',
  CO: 'COP',
  PE: 'PEN',
  RU: 'RUB',
  UA: 'UAH',
}

/** @param {string | undefined} countryCode ISO 3166-1 alpha-2 */
export function currencyCodeForCountry(countryCode) {
  if (!countryCode) return undefined
  const c = countryCode.trim().toUpperCase()
  if (EUR_ZONE.has(c)) return 'EUR'
  return COUNTRY_TO_CURRENCY[c]
}

/** @param {function(string, unknown, object=): void} setValue react-hook-form setValue */
export function syncCurrencyFromCountry(setValue, countryCode) {
  const cur = currencyCodeForCountry(countryCode)
  if (cur) {
    setValue('currency', cur, { shouldValidate: true, shouldDirty: true })
  }
}
