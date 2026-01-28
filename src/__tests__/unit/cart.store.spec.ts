import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/store/cart.store'
import * as cartService from '@/services/cart.service'
import type { CartItem } from '@/types/cart'

// Mock the cart service
vi.mock('@/services/cart.service')

describe('Cart Store - Unit Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with empty cart', () => {
      const store = useCartStore()

      expect(store.items).toEqual([])
      expect(store.isEmpty).toBe(true)
      expect(store.itemCount).toBe(0)
      expect(store.subtotal).toBe(0)
      expect(store.tax).toBe(0)
      expect(store.total).toBe(0)
    })

    it('should initialize with no loading or error state', () => {
      const store = useCartStore()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should initialize with zero shipping cost', () => {
      const store = useCartStore()

      expect(store.shippingCost).toBe(0)
      expect(store.shippingInfo).toEqual({
        country: '',
        state: '',
        zipCode: ''
      })
    })
  })

  describe('Computed Properties', () => {
    it('should calculate subtotal correctly', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 10, quantity: 2, image: '' },
        { id: 2, title: 'Item 2', price: 20, quantity: 1, image: '' }
      ]

      expect(store.subtotal).toBe(40)
    })

    it('should calculate tax at 20%', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 100, quantity: 1, image: '' }
      ]

      expect(store.tax).toBe(20) // 100 * 0.2
    })

    it('should calculate total including shipping', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 100, quantity: 1, image: '' }
      ]
      store.shippingCost = 10

      // subtotal: 100, tax: 20, shipping: 10, total: 130
      expect(store.total).toBe(130)
    })

    it('should count total items correctly', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 10, quantity: 2, image: '' },
        { id: 2, title: 'Item 2', price: 20, quantity: 3, image: '' }
      ]

      expect(store.itemCount).toBe(5) // 2 + 3
    })

    it('should identify empty cart', () => {
      const store = useCartStore()

      expect(store.isEmpty).toBe(true)

      store.items = [{ id: 1, title: 'Item', price: 10, quantity: 1, image: '' }]
      expect(store.isEmpty).toBe(false)
    })

    it('should provide cart totals object', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 100, quantity: 1, image: '' }
      ]
      store.shippingCost = 15

      expect(store.cartTotals).toEqual({
        subtotal: 100,
        tax: 20,
        shipping: 15,
        total: 135
      })
    })
  })

  describe('Quantity Management', () => {
    it('should increment quantity', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      store.incrementQuantity(1)
      expect(store.items[0].quantity).toBe(2)
    })

    it('should decrement quantity', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 3, image: '' }
      ]

      store.decrementQuantity(1)
      expect(store.items[0].quantity).toBe(2)
    })

    it('should remove item when decrementing from quantity 1', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      store.decrementQuantity(1)
      expect(store.items).toEqual([])
    })

    it('should update quantity directly', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      store.updateQuantity(1, 5)
      expect(store.items[0].quantity).toBe(5)
    })

    it('should not update quantity to zero or negative', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 5, image: '' }
      ]

      store.updateQuantity(1, 0)
      expect(store.items[0].quantity).toBe(5)

      store.updateQuantity(1, -1)
      expect(store.items[0].quantity).toBe(5)
    })

    it('should set item quantity within valid range (1-99)', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      store.setItemQuantity(1, 50)
      expect(store.items[0].quantity).toBe(50)

      store.setItemQuantity(1, 99)
      expect(store.items[0].quantity).toBe(99)

      store.setItemQuantity(1, 1)
      expect(store.items[0].quantity).toBe(1)
    })

    it('should not set quantity outside valid range', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 5, image: '' }
      ]

      store.setItemQuantity(1, 0)
      expect(store.items[0].quantity).toBe(5)

      store.setItemQuantity(1, 100)
      expect(store.items[0].quantity).toBe(5)

      store.setItemQuantity(1, -5)
      expect(store.items[0].quantity).toBe(5)
    })

    it('should handle non-existent item gracefully', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      expect(() => store.incrementQuantity(999)).not.toThrow()
      expect(() => store.decrementQuantity(999)).not.toThrow()
      expect(() => store.updateQuantity(999, 5)).not.toThrow()
    })
  })

  describe('Item Management', () => {
    it('should remove item from cart', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 10, quantity: 1, image: '' },
        { id: 2, title: 'Item 2', price: 20, quantity: 1, image: '' }
      ]

      store.removeItem(1)
      expect(store.items).toHaveLength(1)
      expect(store.items[0].id).toBe(2)
    })

    it('should clear entire cart', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item 1', price: 10, quantity: 1, image: '' },
        { id: 2, title: 'Item 2', price: 20, quantity: 1, image: '' }
      ]
      store.shippingCost = 15

      store.clearCart()
      expect(store.items).toEqual([])
      expect(store.shippingCost).toBe(0)
    })
  })

  describe('Async Operations', () => {
    it('should fetch initial products successfully', async () => {
      const store = useCartStore()
      const mockItems: CartItem[] = [
        { id: 1, title: 'Product 1', price: 29.99, quantity: 1, image: 'img1.jpg' },
        { id: 2, title: 'Product 2', price: 39.99, quantity: 1, image: 'img2.jpg' }
      ]

      vi.mocked(cartService.loadInitialCartItems).mockResolvedValue(mockItems)

      await store.fetchInitialProducts()

      expect(store.items).toEqual(mockItems)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should set loading state during fetch', async () => {
      const store = useCartStore()

      vi.mocked(cartService.loadInitialCartItems).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve([]), 100))
      )

      const fetchPromise = store.fetchInitialProducts()
      expect(store.isLoading).toBe(true)

      await fetchPromise
      expect(store.isLoading).toBe(false)
    })

    it('should handle fetch error', async () => {
      const store = useCartStore()
      const errorMessage = 'Network error'

      vi.mocked(cartService.loadInitialCartItems).mockRejectedValue(
        new Error(errorMessage)
      )

      await store.fetchInitialProducts()

      expect(store.error).toBe(errorMessage)
      expect(store.items).toEqual([])
      expect(store.isLoading).toBe(false)
    })

    it('should add new item successfully', async () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Existing', price: 10, quantity: 1, image: '' }
      ]

      const updatedItems: CartItem[] = [
        ...store.items,
        { id: 2, title: 'New Product', price: 29.99, quantity: 1, image: 'new.jpg' }
      ]

      vi.mocked(cartService.addProductToCart).mockResolvedValue(updatedItems)

      const result = await store.addNewItem()

      expect(result).toBe(true)
      expect(store.items).toHaveLength(2)
      expect(store.error).toBe(null)
    })

    it('should handle add item error', async () => {
      const store = useCartStore()
      const errorMessage = 'Failed to add product'

      vi.mocked(cartService.addProductToCart).mockRejectedValue(
        new Error(errorMessage)
      )

      const result = await store.addNewItem()

      expect(result).toBe(false)
      expect(store.error).toBe(errorMessage)
    })
  })

  describe('Shipping', () => {
    it('should update shipping info', () => {
      const store = useCartStore()

      store.updateShippingInfo({
        country: 'USA',
        state: 'CA'
      })

      expect(store.shippingInfo).toEqual({
        country: 'USA',
        state: 'CA',
        zipCode: ''
      })
    })

    it('should calculate shipping cost', async () => {
      const store = useCartStore()

      const cost = await store.calculateShipping()

      expect(cost).toBeGreaterThanOrEqual(5)
      expect(cost).toBeLessThanOrEqual(25)
      expect(store.shippingCost).toBe(cost)
    })

    it('should update total when shipping changes', async () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 100, quantity: 1, image: '' }
      ]

      const totalBefore = store.total // 100 + 20 (tax) = 120
      expect(totalBefore).toBe(120)

      await store.calculateShipping()
      const totalAfter = store.total

      expect(totalAfter).toBeGreaterThan(totalBefore)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty cart calculations', () => {
      const store = useCartStore()

      expect(store.subtotal).toBe(0)
      expect(store.tax).toBe(0)
      expect(store.total).toBe(0)
      expect(store.itemCount).toBe(0)
    })

    it('should handle very large quantities', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 99, image: '' }
      ]

      expect(store.subtotal).toBe(990)
      expect(store.itemCount).toBe(99)
    })

    it('should handle decimal prices correctly', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 9.99, quantity: 3, image: '' }
      ]

      expect(store.subtotal).toBeCloseTo(29.97, 2)
    })

    it('should maintain state consistency after multiple operations', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      store.incrementQuantity(1)
      store.incrementQuantity(1)
      store.decrementQuantity(1)

      expect(store.items[0].quantity).toBe(2)
      expect(store.subtotal).toBe(20)
    })

    it('should handle concurrent quantity updates', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 5, image: '' }
      ]

      store.incrementQuantity(1)
      store.decrementQuantity(1)
      store.updateQuantity(1, 10)

      expect(store.items[0].quantity).toBe(10)
    })
  })

  describe('Integration with Computed Properties', () => {
    it('should update all computed properties when items change', () => {
      const store = useCartStore()

      expect(store.isEmpty).toBe(true)
      expect(store.itemCount).toBe(0)
      expect(store.subtotal).toBe(0)

      store.items = [
        { id: 1, title: 'Item', price: 50, quantity: 2, image: '' }
      ]

      expect(store.isEmpty).toBe(false)
      expect(store.itemCount).toBe(2)
      expect(store.subtotal).toBe(100)
      expect(store.tax).toBe(20)
      expect(store.total).toBe(120)
    })

    it('should recalculate on quantity changes', () => {
      const store = useCartStore()
      store.items = [
        { id: 1, title: 'Item', price: 10, quantity: 1, image: '' }
      ]

      const initialTotal = store.total

      store.incrementQuantity(1)
      expect(store.total).toBeGreaterThan(initialTotal)
    })
  })
})
