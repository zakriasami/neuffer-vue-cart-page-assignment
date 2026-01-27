<script setup lang="ts">
defineEmits<{
  (e: 'add-item'): void
}>()
</script>

<template>
  <div class="bg-white p-12 text-center space-y-6">
    <!-- Empty Cart Icon -->
    <div class="flex justify-center">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
        <svg 
          class="w-12 h-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Empty Message -->
    <div class="space-y-2">
      <h3 class="text-2xl font-bold text-gray-800">
        Your cart is empty
      </h3>
      <p class="text-gray-600 max-w-md mx-auto">
        Start adding some products to your cart to see them here.
      </p>
    </div>

    <!-- Add Item Button -->
    <button
      @click="$emit('add-item')"
      class="btn-add-item inline-flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Your First Item
    </button>
  </div>
</template>
