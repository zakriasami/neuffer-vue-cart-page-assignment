<script setup lang="ts">
import type { CartItem as CartItemType } from '@/types/cart'
import { formatCurrency } from '@/utils/formatCurrency'
import ProductImage from './shared/ProductImage.vue'
import QuantityControls from './shared/QuantityControls.vue'

interface Props {
  item: CartItemType
  itemTotal: number
}

const props = defineProps<Props>()
const emit = defineEmits(['increment', 'decrement', 'remove'])

</script>

<template>
  <div class="hidden md:grid md:grid-cols-[100px_1fr_120px_100px_120px] gap-6 items-center py-6 border-b border-[#E1E1E4]">
    <!-- Product Image -->
    <ProductImage
      :image="item.image"
      :alt-text="item.title"
      size="md"
      @remove="$emit('remove')"
    />

    <!-- Product Title -->
    <div>
      <h3 class="font-roboto font-normal text-sm text-black line-clamp-2">
        {{ item.title }}
      </h3>
    </div>

    <!-- Price -->
    <div class="text-sm text-gray-700">{{ formatCurrency(item.price) }}</div>

    <!-- Quantity Controls -->
    <QuantityControls
      :quantity="item.quantity"
      @increment="$emit('increment')"
      @decrement="$emit('decrement')"
    />

    <!-- Item Total -->
    <div class="text-sm font-semibold text-primary-text text-right">
      {{ formatCurrency(itemTotal) }}
    </div>
  </div>
</template>