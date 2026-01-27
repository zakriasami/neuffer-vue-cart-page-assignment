<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/store/cart.store'
import Cart from './components/cart/Cart.vue';
import CartTotals from './components/cart/CartTotals.vue';
import ShippingCalculator from './components/ShippingCalculator.vue';
const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchInitialProducts();
})
</script>

<template>
  <div class="min-h-screen">
    <main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="page-title">
      <h1 id="page-title" class="sr-only">Shopping Cart</h1>

      <section class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section class="lg:col-span-2 space-y-6" aria-labelledby="cart-items-title">
          <Cart />
        </section>
        <aside class="lg:col-span-1 space-y-6" aria-labelledby="summary-title">
          <CartTotals />
          <ShippingCalculator />
        </aside>
      </section>
    </main>
  </div>
</template>