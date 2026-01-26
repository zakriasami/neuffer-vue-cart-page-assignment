// utils/formatCurrency.ts
interface FormatCurrencyOptions {
  currency?: string
  locale?: string
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {}
) {
  const { currency = 'EUR', locale = 'de-DE' } = options
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}