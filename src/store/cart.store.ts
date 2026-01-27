import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types/cart'
import {
  loadInitialCartItems,
  addProductToCart,
} from '@/services/cart.service'
import { TAX_RATE } from '@/config/tax';
import type { CartTotals } from '@/types/cartTotal';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isEmpty = computed(() => items.value.length === 0)
  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

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
  }
  
  // tax values
    const shippingCost = ref(20);
    const subtotal = computed(() => {
      return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })
    const tax = computed(() => {
      return subtotal.value * TAX_RATE
    })

    const total = computed(() => {
      return subtotal.value + tax.value + shippingCost.value
    })

    const cartTotals = computed<CartTotals>(() => ({
      subtotal: subtotal.value,
      tax: tax.value,
      shipping: shippingCost.value,
      total: total.value
    }))


  return {
    items,
    isLoading,
    error,
    isEmpty,
    itemCount,
    fetchInitialProducts,
    addNewItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,

    // computed
    subtotal,
    tax,
    total,
    cartTotals,
  }
})