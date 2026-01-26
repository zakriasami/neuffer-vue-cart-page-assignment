<script setup lang="ts">
function handleAddItem(): void {}
function handleClearCart(): void {}
</script>

<template>
  <div class="min-h-screen">
    <main
      class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="page-title"
    >
      <h1 id="page-title" class="sr-only">Shopping Cart</h1>

      <section class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section
          class="lg:col-span-2 space-y-6"
          aria-labelledby="cart-items-title"
        >
          <h2 id="cart-items-title" class="sr-only">Cart Items</h2>

          <section class="cart-items" aria-live="polite">
            <div
              class="hidden md:grid md:grid-cols-[100px_1fr_120px_100px_120px] gap-6 pb-4 mb-2"
              role="row"
            >
              <span class="table-header" role="columnheader">Product</span>
              <span class="table-header" role="columnheader"></span>
              <span class="table-header" role="columnheader">Price</span>
              <span class="table-header" role="columnheader">Quantity</span>
              <span class="table-header text-right" role="columnheader">
                Total
              </span>
            </div>

            <ul class="space-y-0" role="list"></ul>
          </section>

          <div class="flex items-center justify-between pt-6">
            <button
              type="button"
              @click="handleAddItem"
              class="btn-add-item  cursor-pointer"
            >
              Add Item
            </button>

            <button
              type="button"
              @click="handleClearCart"
              class="btn-clear-cart cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        </section>

        <aside
          class="lg:col-span-1 space-y-6"
          aria-labelledby="summary-title"
        >
          <h2 id="summary-title" class="sr-only">Order Summary</h2>

          <section aria-labelledby="cart-totals-title">
            <h3
              id="cart-totals-title"
              class="table-header text-center mb-4"
            >
              Cart Totals
            </h3>
            <div class="bg-[#E8E6F1] p-3 mb-6"></div>
          </section>

          <section aria-labelledby="shipping-title">
            <h3
              id="shipping-title"
              class="table-header text-center mb-4"
            >
              Calculate shipping
            </h3>
            <div class="bg-[#E8E6F1] p-3 mb-6"></div>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>