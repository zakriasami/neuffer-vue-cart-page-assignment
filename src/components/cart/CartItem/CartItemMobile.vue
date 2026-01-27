<script setup lang="ts">
import type { CartItem as CartItemType } from '@/types/cart'
import { formatCurrency } from '@/utils/formatCurrency'
import ProductImage from './shared/ProductImage.vue'
import QuantityControls from './shared/QuantityControls.vue'

interface Props {
  item: CartItemType,
  itemTotal: number
}

const props = defineProps<Props>()
const emit = defineEmits(['increment', 'decrement', 'remove'])

</script>

<template>
  <div class="flex md:hidden gap-3 py-4 border-b border-[#E1E1E4]">
    <!-- Product Image -->
    <ProductImage
      :image="item.image"
      :alt-text="item.title"
      size="sm"
      @remove="$emit('remove')"
    />

    <!-- Product Info & Controls -->
    <div class="flex-1 flex flex-col">
      <h3 class="font-roboto font-normal text-sm text-black line-clamp-2 mb-1">
        {{ item.title }}
      </h3>

      <!-- Price -->
      <span class="text-sm text-gray-700 mb-3">{{ formatCurrency(item.price) }}</span>

      <!-- Controls & Total -->
      <div class="flex items-center justify-between">
        <QuantityControls
          :quantity="item.quantity"
          @increment="$emit('increment')"
          @decrement="$emit('decrement')"
        />

        <div class="text-sm font-semibold text-primary-text">
          {{ formatCurrency(itemTotal) }}
        </div>
      </div>
    </div>
  </div>
</template>