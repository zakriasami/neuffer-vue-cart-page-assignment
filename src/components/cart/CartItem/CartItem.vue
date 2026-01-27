<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem as CartItemType } from '@/types/cart'
import CartItemMobile from './CartItemMobile.vue'
import CartItemDesktop from './CartItemDesktop.vue'

interface Props {
  item: CartItemType
}

const props = defineProps<Props>()
const emit = defineEmits(['increment', 'decrement', 'remove'])

const itemTotal = computed(() => props.item.price * props.item.quantity)
</script>

<template>
  <CartItemMobile
    :item="item"
    @increment="$emit('increment')"
    @decrement="$emit('decrement')"
    @remove="$emit('remove')"
    :item-total="itemTotal"
  />
  <CartItemDesktop
    :item="item"
    @increment="$emit('increment')"
    @decrement="$emit('decrement')"
    @remove="$emit('remove')"
    :item-total="itemTotal"
  />
</template>