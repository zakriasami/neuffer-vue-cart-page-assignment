import { appCurrencyConfig, FRACTION_DIGITS } from "@/config/currency"

interface FormatCurrencyOptions {
  currency?: string
  locale?: string
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {}
): string {
  const { 
    currency = appCurrencyConfig.currency, 
    locale = appCurrencyConfig.locale 
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: FRACTION_DIGITS.MIN,
    maximumFractionDigits: FRACTION_DIGITS.MAX,
  }).format(value)
}

export function formatAmount(value: number, locale = appCurrencyConfig.locale): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function getCurrencySymbol(): string {
  const formatter = new Intl.NumberFormat(appCurrencyConfig.locale, {
    style: 'currency',
    currency: appCurrencyConfig.currency,
  })
  
  const parts = formatter.formatToParts(0)
  const currencyPart = parts.find(part => part.type === 'currency')
  return currencyPart?.value || appCurrencyConfig.currency
}