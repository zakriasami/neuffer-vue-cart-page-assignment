<template>
  <!-- Desktop Skeleton -->
  <div class="hidden md:grid md:grid-cols-[100px_1fr_120px_100px_120px] gap-6 items-center py-6 border-b border-[#E1E1E4] animate-pulse">
    <!-- Image skeleton -->
    <div class="w-[83px] h-[87px] rounded-[3px] bg-gray-200"></div>

    <!-- Title skeleton -->
    <div class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    
    <!-- Price skeleton -->
    <div class="h-4 bg-gray-200 rounded w-16"></div>
    
    <!-- Quantity skeleton -->
    <div class="h-8 bg-gray-200 rounded w-24"></div>
    
    <!-- Total skeleton -->
    <div class="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
  </div>

  <!-- Mobile Skeleton -->
  <div class="md:hidden flex gap-4 py-4 border-b-2 border-neutral-border animate-pulse">
    <div class="w-20 h-20 rounded-[3px] bg-gray-200"></div>
    <div class="flex-1 space-y-3">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="flex justify-between">
        <div class="h-4 bg-gray-200 rounded w-16"></div>
        <div class="h-8 bg-gray-200 rounded w-24"></div>
      </div>
      <div class="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
    </div>
  </div>
</template>
