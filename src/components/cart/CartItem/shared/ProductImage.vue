<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  image?: string
  altText: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showRemove: false
})

const emit = defineEmits(['remove'])

const imageError = ref(false)

const handleImageError = ():void => {
  imageError.value = true
}

const handleRemove = (e: Event): void => {
  e.stopPropagation()
  emit('remove')
}

// Size classes
const imageSize = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20 md:w-[83px] md:h-[87px]'
}
</script>

<template>
  <div class="relative shrink-0">
    <div :class="[imageSize[size], 'relative']">
      <div :class="['rounded-[3px] overflow-hidden bg-neutral-placeholder flex items-center justify-center', imageSize[size]]">
        <img
          v-if="image && !imageError"
          :src="image"
          :alt="altText"
          class="w-full h-full object-contain p-2"
          @error="handleImageError"
          loading="lazy"
        />
      </div>

      <!-- Remove Button -->
      <button
        @click="handleRemove"
        :class="['absolute flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer', 
                size === 'sm' ? '-top-1 -right-1 w-5 h-5 text-[10px]' : '-top-2 -right-2 w-5 h-5']"
        aria-label="Remove item"
      >
        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>