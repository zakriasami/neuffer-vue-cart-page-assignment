<script setup lang="ts">
import { useCartStore } from '@/store/cart.store'
import CartItem from '@/components/cart/CartItem/CartItem.vue'
import SkeletonLoader from '@/components/cart/CartItem/SkeletonLoader.vue';
import EmptyCart from './CartItem/shared/EmptyCart.vue';
const cartStore = useCartStore();
function handleAddItem(): void {
  cartStore.addNewItem()
}
function handleClearCart(): void {
  cartStore.clearCart()
};
</script>

<template>
  <h2 id="cart-items-title" class="sr-only">Cart Items</h2>

  <section class="cart-items" aria-live="polite">
    <div class="hidden md:grid md:grid-cols-[100px_1fr_120px_100px_120px] gap-6 pb-4 mb-2" role="row">
      <span class="table-header" role="columnheader">Product</span>
      <span class="table-header" role="columnheader"></span>
      <span class="table-header" role="columnheader">Price</span>
      <span class="table-header" role="columnheader">Quantity</span>
      <span class="table-header text-right" role="columnheader">
        Total
      </span>
    </div>

    <div v-if="cartStore.isLoading" class="space-y-0">
      <SkeletonLoader v-for="i in 4" :key="i" />
    </div>
    <ul v-else-if="!cartStore.isEmpty && !cartStore.error" class="space-y-0" role="list">
      <CartItem v-for="item in cartStore.items" :key="item.id" :item="item"
        :onIncrement="() => cartStore.incrementQuantity(item.id)"
        :onDecrement="() => cartStore.decrementQuantity(item.id)" :onRemove="() => cartStore.removeItem(item.id)" />
    </ul>
    <EmptyCart v-else @add-item="handleAddItem" />
  </section>

  <div v-if="!cartStore.error" class="flex items-center justify-between pt-6">
    <button type="button" @click="handleAddItem" class="btn-add-item  cursor-pointer">
      Add Item
    </button>

    <button type="button" @click="handleClearCart" class="btn-clear-cart cursor-pointer">
      Clear Cart
    </button>
  </div>
</template>