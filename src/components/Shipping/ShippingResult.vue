<script setup lang="ts">
import { formatCurrency } from '@/utils/formatCurrency'

defineProps<{
  amount: number
}>()
</script>

<template>
  <div
    class="p-5 rounded-xl bg-gradient-to-br
           from-emerald-50 to-emerald-100
           shadow-sm animate-scaleIn"
    aria-live="polite"
  >
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs uppercase tracking-wide text-emerald-600">
          Estimated Shipping
        </span>
        <p class="text-[11px] text-emerald-500">
          Based on your delivery address
        </p>
      </div>

      <span class="text-2xl font-semibold text-emerald-800">
        {{ formatCurrency(amount) }}
      </span>
    </div>
  </div>
</template>