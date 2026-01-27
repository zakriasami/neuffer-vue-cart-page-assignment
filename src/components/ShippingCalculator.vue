<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart.store'
import type { ShippingInfo } from '@/types/shipping'
import { formatCurrency } from '@/utils/formatCurrency'

const cartStore = useCartStore()

const isCalculating = ref(false)

const localShippingInfo = ref<ShippingInfo>({
  country: '',
  state: '',
  zipCode: ''
})

const canCalculate = computed(() => {
  const { country, state, zipCode } = localShippingInfo.value
  return (
    country.trim().length > 0 &&
    state.trim().length > 0 &&
    zipCode.trim().length > 0
  )
})

const handleCalculate = async () => {
  if (!canCalculate.value || isCalculating.value) return

  isCalculating.value = true

  try {
    cartStore.updateShippingInfo(localShippingInfo.value)
    await cartStore.calculateShipping()
  } finally {
    isCalculating.value = false
  }
}
</script>

<template>
  <section aria-labelledby="cart-totals-title">
    <div class="card p-0 space-y-4 animate-fadeIn">
      <h3 id="cart-totals-title" class="table-header text-center pb-4">
        Calculate shipping
      </h3>

      <div class="bg-[#F4F4FC] rounded-sm p-6 space-y-4">
        <div>
          <label for="country" class="block text-sm font-medium text-neutral-700 mb-2">
            Country
          </label>
          <input id="country" v-model="localShippingInfo.country" type="text" placeholder="Enter country" class="w-full px-4 py-2.5 rounded-lg border-2 border-neutral-200
                   focus:border-primary-500 focus:outline-none transition-colors
                   text-neutral-800 placeholder-neutral-400" />
        </div>

        <div>
          <label for="state" class="block text-sm font-medium text-neutral-700 mb-2">
            State / Province
          </label>
          <input id="state" v-model="localShippingInfo.state" type="text" placeholder="Enter state" class="w-full px-4 py-2.5 rounded-lg border-2 border-neutral-200
                   focus:border-primary-500 focus:outline-none transition-colors
                   text-neutral-800 placeholder-neutral-400" />
        </div>

        <div>
          <label for="zipCode" class="block text-sm font-medium text-neutral-700 mb-2">
            Postcode / ZIP
          </label>
          <input id="zipCode" v-model="localShippingInfo.zipCode" type="text" placeholder="Enter ZIP code" class="w-full px-4 py-2.5 rounded-lg border-2 border-neutral-200
                   focus:border-primary-500 focus:outline-none transition-colors
                   text-neutral-800 placeholder-neutral-400" />
        </div>

        <button @click="handleCalculate" :disabled="!canCalculate || isCalculating"
          class="btn-clear-cart cursor-pointer">
          <span v-if="!isCalculating">Calculate Shipping</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Calculating...
          </span>
        </button>

        <div v-if="cartStore.shippingCost > 0" class="p-5 rounded-xl bg-gradient-to-br
from-emerald-50 to-emerald-100
shadow-sm animate-scaleIn">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs uppercase tracking-wide text-emerald-600">
                Estimated Shipping
              </span>
              <span class="text-[11px] text-emerald-500 mt-0.5">
                Based on your delivery address
              </span>
            </div>


            <span class="text-2xl font-semibold text-emerald-800">
              {{ formatCurrency(cartStore.shippingCost) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
