<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/store/cart.store'
import { formatCurrency } from '@/utils/formatCurrency'
import { TAX_RATE } from '@/config/tax'

const cartStore = useCartStore()

const totals = computed(() => cartStore.cartTotals)
const isEmpty = computed(() => cartStore.isEmpty)

const handleCheckout = () => {
  if (!isEmpty.value) {
    alert(`Proceeding to checkout.\nTotal: ${formatCurrency(totals.value.total)}`)
  }
}
</script>

<template>
  <section aria-labelledby="cart-totals-title">
    <div class="bg-neutral-bg rounded-sm p-2 space-y-6">
      <h3 class="table-header text-center pb-4">
        Cart Totals
      </h3>

      <div class="bg-[#F4F4FC] rounded-sm p-6 space-y-4">
        <!-- Subtotal -->
        <div class="flex justify-between items-center pb-3   border-b-2 border-b-[#E8E6F1]">
          <span class="text-lg font-semibold text-primary-text">Subtotals:</span>
          <span class="text-base text-primary-text">
            {{ formatCurrency(totals.subtotal) }}
          </span>
        </div>

        <!-- Shipping -->
        <div v-if="totals.shipping > 0" class="flex justify-between items-center pb-3 border-b-2 border-b-[#E8E6F1]">
          <span class="text-lg font-semibold text-primary-text">Shipping:</span>
          <span class="text-base text-primary-text">
            {{ formatCurrency(totals.shipping) }}
          </span>
        </div>

        <!-- Tax -->
        <div class="flex justify-between items-center pb-3 border-b-2 border-b-[#E8E6F1]">
          <span class="text-lg font-semibold text-primary-text">Tax: ({{ TAX_RATE * 100 }}%)</span>
          <span class="text-base text-primary-text">
            {{ formatCurrency(totals.tax) }}
          </span>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center pt-2">
          <span class="text-lg font-semibold text-primary-text">Totals:</span>
          <span class="text-base font-semibold text-primary-text">
            {{ formatCurrency(totals.total) }}
          </span>
        </div>

        <!-- Checkout Button -->
        <button @click="handleCheckout" :disabled="isEmpty"
          class="w-full h-[40px] rounded-[3px] bg-[#19D16F] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-200 cursor-pointer">
          Proceed To Checkout
        </button>
      </div>

    </div>
  </section>
</template>
