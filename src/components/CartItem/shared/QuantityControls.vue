<script setup lang="ts">
interface Props {
  quantity: number
}
const props = defineProps<Props>();

const emit = defineEmits(['increment', 'decrement'])
</script>

<template>
  <div
    class="flex items-center justify-between bg-[#F0EFF2]"
  >
    <button
      @click="$emit('decrement')"
      class="quantity-btn"
      :disabled="quantity <= 1"
    >
      −
    </button>
    <span class="w-auto text-center text-sm font-normal text-gray-700 px-2">
      {{ quantity }}
    </span>
    <button @click="$emit('increment')" class="quantity-btn">
      +
    </button>
  </div>
</template>