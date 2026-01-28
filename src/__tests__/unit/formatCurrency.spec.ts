import { describe, it, expect } from 'vitest'
import { formatCurrency, formatAmount, getCurrencySymbol } from '@/utils/formatCurrency'
import { appCurrencyConfig } from '@/config/currency'

describe('formatCurrency - Unit Tests', () => {
  describe('Basic Formatting (EUR/de-DE)', () => {
    it('should format whole numbers correctly with EUR symbol', () => {
      expect(formatCurrency(100)).toBe('100,00 €')
      expect(formatCurrency(1000)).toBe('1.000,00 €')
      expect(formatCurrency(1000000)).toBe('1.000.000,00 €')
    })

    it('should format decimal numbers correctly', () => {
      expect(formatCurrency(10.5)).toBe('10,50 €')
      expect(formatCurrency(99.99)).toBe('99,99 €')
      expect(formatCurrency(1.23)).toBe('1,23 €')
    })

    it('should round to 2 decimal places', () => {
      expect(formatCurrency(10.555)).toBe('10,56 €')
      expect(formatCurrency(10.554)).toBe('10,55 €')
      expect(formatCurrency(10.999)).toBe('11,00 €')
    })

    it('should format zero correctly', () => {
      expect(formatCurrency(0)).toBe('0,00 €')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      expect(formatCurrency(999999999.99)).toBe('999.999.999,99 €')
    })

    it('should handle very small decimals', () => {
      expect(formatCurrency(0.01)).toBe('0,01 €')
      expect(formatCurrency(0.001)).toBe('0,00 €')
      expect(formatCurrency(0.009)).toBe('0,01 €')
    })

    it('should handle negative numbers', () => {
      expect(formatCurrency(-10.50)).toBe('-10,50 €')
      expect(formatCurrency(-1000)).toBe('-1.000,00 €')
    })

    it('should handle floating point precision issues', () => {
      expect(formatCurrency(0.1 + 0.2)).toBe('0,30 €')
      expect(formatCurrency(10.05 + 10.05)).toBe('20,10 €')
    })
  })

  describe('Thousand Separators (German format)', () => {
    it('should use dots for thousands separators', () => {
      expect(formatCurrency(1000)).toBe('1.000,00 €')
      expect(formatCurrency(10000)).toBe('10.000,00 €')
      expect(formatCurrency(100000)).toBe('100.000,00 €')
      expect(formatCurrency(1234567.89)).toBe('1.234.567,89 €')
    })

    it('should use commas for decimal separators', () => {
      expect(formatCurrency(99.99)).toBe('99,99 €')
      expect(formatCurrency(1234.56)).toBe('1.234,56 €')
    })
  })

  describe('Currency Symbol', () => {
    it('should use euro symbol with non-breaking space', () => {
      expect(formatCurrency(50)).toBe('50,00 €')
      expect(formatCurrency(0)).toBe('0,00 €')
      expect(formatCurrency(1000000)).toBe('1.000.000,00 €')
    })

    it('should place minus sign before the number', () => {
      const result = formatCurrency(-50)
      expect(result).toBe('-50,00 €')
    })

    it('should get the correct currency symbol', () => {
      expect(getCurrencySymbol()).toBe('€')
    })
  })

  describe('Type Coercion', () => {
    it('should handle string numbers', () => {
      expect(formatCurrency(Number('100.50'))).toBe('100,50 €')
    })

    it('should handle scientific notation', () => {
      expect(formatCurrency(1e3)).toBe('1.000,00 €')
      expect(formatCurrency(1e6)).toBe('1.000.000,00 €')
    })
  })

  describe('Special Values', () => {
    it('should handle Infinity', () => {
      expect(formatCurrency(Infinity)).toBe('∞ €')
    })

    it('should handle NaN', () => {
      expect(formatCurrency(NaN)).toBe('NaN €')
    })
  })

  describe('Real World Scenarios', () => {
    it('should format typical cart prices', () => {
      expect(formatCurrency(29.99)).toBe('29,99 €')
      expect(formatCurrency(149.95)).toBe('149,95 €')
      expect(formatCurrency(9.99)).toBe('9,99 €')
    })

    it('should format tax calculations', () => {
      const subtotal = 100
      const tax = subtotal * 0.2 // 20%
      expect(formatCurrency(tax)).toBe('20,00 €')
    })

    it('should format shipping costs', () => {
      expect(formatCurrency(5.99)).toBe('5,99 €')
      expect(formatCurrency(15.00)).toBe('15,00 €')
    })

    it('should format cart totals', () => {
      const items = [
        { price: 29.99, quantity: 2 }, // 59,98
        { price: 15.50, quantity: 1 }  // 15,50
      ]
      const subtotal = items.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
      ) // 75,48
      const tax = subtotal * 0.2 // 15,096
      const shipping = 10
      const total = subtotal + tax + shipping // 100,576

      expect(formatCurrency(total)).toBe('100,58 €')
    })
  })

  describe('Amount formatting without currency symbol', () => {
    it('should format amounts with correct decimal separators', () => {
      expect(formatAmount(1000)).toBe('1.000,00')
      expect(formatAmount(99.99)).toBe('99,99')
      expect(formatAmount(1234.56)).toBe('1.234,56')
    })
  })

  describe('Configuration', () => {
    it('should use app config by default', () => {
      // Verify the function uses our config
      const result = formatCurrency(1234.56)
      // German format: 1.234,56 €
      expect(result).toBe('1.234,56 €')
    })

    it('should allow locale override', () => {
      expect(formatCurrency(1234.56, { locale: 'en-US' })).toBe('€1,234.56')
      expect(formatCurrency(1234.56, { locale: 'en-GB' })).toBe('€1,234.56')
    })

    it('should allow currency override', () => {
      expect(formatCurrency(1234.56, { currency: 'USD' })).toBe('1.234,56 $')
      expect(formatCurrency(1234.56, { currency: 'GBP' })).toBe('1.234,56 £')
    })
  })
})