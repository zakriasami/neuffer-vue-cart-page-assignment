import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'
import type { ShippingInfo } from '@/types/shipping'
import type { CartTotals } from '@/types/cartTotal'
import { loadInitialCartItems, addProductToCart } from '@/services/cart.service'
import { TAX_RATE } from '@/config/tax'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const shippingCost = ref(0)
  const shippingInfo = ref<ShippingInfo>({
    country: '',
    state: '',
    zipCode: ''
  })

  const isEmpty = computed(() => items.value.length === 0)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )

  const tax = computed(() => subtotal.value * TAX_RATE)

  const total = computed(() =>
    subtotal.value + tax.value + shippingCost.value
  )

  const cartTotals = computed<CartTotals>(() => ({
    subtotal: subtotal.value,
    tax: tax.value,
    shipping: shippingCost.value,
    total: total.value
  }))

  async function fetchInitialProducts() {
    isLoading.value = true
    error.value = null

    try {
      items.value = await loadInitialCartItems()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load cart'
    } finally {
      isLoading.value = false
    }
  }

  async function addNewItem() {
    error.value = null

    try {
      items.value = await addProductToCart(items.value)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to add item'
      return false
    }
  }

  function updateQuantity(id: number, qty: number) {
    if (qty <= 0) return
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity = qty
  }

  function incrementQuantity(id: number) {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity++
  }

  function decrementQuantity(id: number) {
    const item = items.value.find(i => i.id === id)
    if (!item) return

    if (item.quantity > 1) item.quantity--
    else removeItem(id)
  }

  function removeItem(id: number) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clearCart() {
    items.value = []
    shippingCost.value = 0
  }

  function updateShippingInfo(info: Partial<ShippingInfo>) {
    shippingInfo.value = { ...shippingInfo.value, ...info }
  }

  async function calculateShipping() {
    await new Promise(resolve => setTimeout(resolve, 600))
    shippingCost.value = Math.floor(Math.random() * 20) + 5
    return shippingCost.value
  }

  return {
    items,
    isLoading,
    error,
    shippingCost,
    shippingInfo,

    isEmpty,
    itemCount,
    subtotal,
    tax,
    total,
    cartTotals,

    fetchInitialProducts,
    addNewItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    updateShippingInfo,
    calculateShipping
  }
})