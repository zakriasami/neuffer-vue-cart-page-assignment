<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  quantity: number
}
const props = defineProps<Props>()

const emit = defineEmits(['increment', 'decrement', 'updateQuantity'])

// Local state for the input value
const inputValue = ref(props.quantity.toString())
const isEditing = ref(false)

// Watch for external quantity changes
watch(() => props.quantity, (newQuantity) => {
  if (!isEditing.value) {
    inputValue.value = newQuantity.toString()
  }
})

// Handle input changes
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

// Handle input focus
function handleFocus() {
  isEditing.value = true
}

// Handle input blur (when user finishes editing)
function handleBlur() {
  isEditing.value = false
  commitQuantityChange()
}

// Handle Enter key press
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const input = event.target as HTMLInputElement
    input.blur()
  }
}

// Commit the quantity change
function commitQuantityChange() {
  const newQuantity = parseInt(inputValue.value)

  // Validate input
  if (isNaN(newQuantity) || newQuantity < 1) {
    // Reset to current quantity if invalid
    inputValue.value = props.quantity.toString()
    return
  }

  // Limit to maximum 99 or other reasonable limit
  const clampedQuantity = Math.min(newQuantity, 99)

  // Only emit if value actually changed
  if (clampedQuantity !== props.quantity) {
    inputValue.value = clampedQuantity.toString()
    emit('updateQuantity', clampedQuantity)
  } else {
    inputValue.value = props.quantity.toString()
  }
}

</script>

<template>
  <div class="flex items-center justify-between bg-[#F0EFF2]">
    <button @click="$emit('decrement')" :class="[
      'flex items-center justify-center w-8 h-8 bg-[#E7E7EF]  cursor-pointer',
      (quantity <= 1) ? ' cursor-not-allowed' : ''
    ]" :disabled="quantity <= 1" aria-label="Decrease quantity">
      −
    </button>

    <input v-model="inputValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown"
      type="number" min="1" step="1"
      class="w-12 text-center text-sm font-normal text-gray-700 bg-transparent focus:outline-none focus:ring-0 px-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
      aria-label="Product quantity" />

    <button @click="$emit('increment')" class="flex items-center justify-center w-8 h-8 bg-[#E7E7EF] cursor-pointer" aria-label="Increase quantity">
      +
    </button>
  </div>
</template>