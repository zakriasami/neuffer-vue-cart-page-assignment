<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/store/cart.store'
import { useShippingForm } from '@/composables/useShippingForm'
import ShippingResult from './ShippingResult.vue'

const cartStore = useCartStore()
const isCalculating = ref(false)

const {
  shippingInfo,
  errors,
  validate
} = useShippingForm(cartStore.shippingInfo)

const submit = async () => {
  if (!validate() || isCalculating.value) return

  isCalculating.value = true
  try {
    cartStore.updateShippingInfo(shippingInfo.value)
    await cartStore.calculateShipping()
  } finally {
    isCalculating.value = false
  }
}
</script>

<template>
  <section aria-labelledby="shipping-calculator-title">
    <h3 class="table-header text-center pb-2">
          Calculate Shipping
        </h3>
    <div class="bg-[#F4F4FC] rounded-sm p-6 space-y-4">
      <form class="card space-y-6 animate-fadeIn" @submit.prevent="submit" novalidate role="form"
        aria-label="Shipping information form">

        <div class="space-y-5">
          <!-- Country Input -->
          <div>
            <input id="country" v-model="shippingInfo.country" type="text" placeholder="Enter country"
              :aria-invalid="!!errors.country" :disabled="isCalculating"
              class="w-full px-4 py-2.5 border-0 border-b border-b-[#0843FC] focus:outline-none 
              disabled:bg-neutral-100 
              disabled:cursor-not-allowed"
              :class="[
                errors.country
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-neutral-200 focus:border-primary-500 '
              ]" />
            <p v-if="errors.country" class="mt-2 text-sm text-red-600 font-medium" role="alert">
              {{ errors.country }}
            </p>
          </div>

          <!-- State Input -->
          <div>
            <input id="state" v-model="shippingInfo.state" type="text" placeholder="Enter state or province"
              :aria-invalid="!!errors.state" :disabled="isCalculating"
              class="w-full px-4 py-2.5 border-0 border-b border-b-[#0843FC] focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed"
              :class="[
                errors.state
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-neutral-200 focus:border-primary-500 '
              ]" />
            <p v-if="errors.state" class="mt-2 text-sm text-red-600 font-medium" role="alert">
              {{ errors.state }}
            </p>
          </div>

          <!-- ZIP Code Input -->
          <div>
            <input id="zipCode" v-model="shippingInfo.zipCode" type="text" placeholder="Enter ZIP code"
              :aria-invalid="!!errors.zipCode" :disabled="isCalculating"
              class="w-full px-4 py-2.5 border-0 border-b border-b-[#0843FC] focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed"
              :class="[
                errors.zipCode
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-neutral-200 focus:border-primary-500 '
              ]" />
            <p v-if="errors.zipCode" class="mt-2 text-sm text-red-600 font-medium" role="alert">
              {{ errors.zipCode }}
            </p>
          </div>

          <!-- Calculate Button -->
          <button type="submit" :disabled="isCalculating"
            class="w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
            :class="[
              isCalculating
                ? 'bg-neutral-400 text-white'
                : 'bg-primary-pink text-white hover:opacity-90 active:scale-[0.99]'
            ]" :aria-busy="isCalculating">
            <div v-if="!isCalculating" class="flex items-center justify-center">
              <span>Calculate Shipping</span>
            </div>

            <div v-else class="flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span>Calculating...</span>
              <span class="sr-only">Please wait while we calculate shipping costs</span>
            </div>
          </button>

          <!-- Shipping Result Component -->
          <ShippingResult v-if="cartStore.shippingCost > 0" :amount="cartStore.shippingCost" />
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* Simple animation */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>