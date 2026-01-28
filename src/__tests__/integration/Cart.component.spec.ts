import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Cart from "@/components/cart/Cart.vue";
import { useCartStore } from "@/store/cart.store";

// Mocks

vi.mock("@/components/cart/CartItem/CartItem.vue", () => ({
  default: {
    name: "CartItem",
    props: ["item", "onIncrement", "onDecrement", "onRemove"],
    template: `<li class="cart-item-mock">{{ item.title }}</li>`,
  },
}));

vi.mock("@/components/cart/CartItem/SkeletonLoader.vue", () => ({
  default: {
    name: "SkeletonLoader",
    template: `<div class="skeleton-loader-mock"></div>`,
  },
}));

vi.mock("@/components/cart/EmptyCart.vue", () => ({
  default: {
    name: "EmptyCart",
    emits: ["add-item"],
    template: `
      <div class="empty-cart-mock">
        <button @click="$emit('add-item')">Add First Item</button>
      </div>
    `,
  },
}));

// TEST HELPERS

function setup() {
  const pinia = createPinia();
  setActivePinia(pinia);

  const wrapper = mount(Cart, {
    global: {
      plugins: [pinia],
    },
  });

  const store = useCartStore();
  return { wrapper, store };
}

// TESTS

describe("Cart Component - Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("renders loading skeletons when loading", async () => {
    const { wrapper, store } = setup();

    store.isLoading = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".skeleton-loader-mock")).toHaveLength(4);
  });

  it("renders cart items when loaded", async () => {
    const { wrapper, store } = setup();

    store.items = [
      { id: 1, title: "Item 1", price: 10, quantity: 1, image: "" },
      { id: 2, title: "Item 2", price: 20, quantity: 1, image: "" },
    ];

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".cart-item-mock")).toHaveLength(2);
  });

  it("renders empty cart when no items", async () => {
    const { wrapper, store } = setup();

    store.items = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".empty-cart-mock").exists()).toBe(true);
  });

  it("renders empty cart on error", async () => {
    const { wrapper, store } = setup();

    store.error = "Failed";
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".empty-cart-mock").exists()).toBe(true);
  });


  it("renders table headers", () => {
    const { wrapper } = setup();

    const headers = wrapper.findAll('[role="columnheader"]');
    expect(headers).toHaveLength(5);
    expect(headers[0]!.text()).toBe("Product");
    expect(headers[2]!.text()).toBe("Price");
    expect(headers[3]!.text()).toBe("Quantity");
    expect(headers[4]!.text()).toBe("Total");
  });


  it("shows action buttons when cart has items", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".btn-add-item").exists()).toBe(true);
    expect(wrapper.find(".btn-clear-cart").exists()).toBe(true);
  });

  it("hides action buttons when cart is empty", async () => {
    const { wrapper, store } = setup();

    store.items = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".btn-add-item").exists()).toBe(false);
    expect(wrapper.find(".btn-clear-cart").exists()).toBe(false);
  });

  it("calls addNewItem when Add Item clicked", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    const spy = vi.spyOn(store, "addNewItem");

    await wrapper.vm.$nextTick();
    await wrapper.find(".btn-add-item").trigger("click");

    expect(spy).toHaveBeenCalledOnce();
  });

  it("calls clearCart when Clear Cart clicked", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    const spy = vi.spyOn(store, "clearCart");

    await wrapper.vm.$nextTick();
    await wrapper.find(".btn-clear-cart").trigger("click");

    expect(spy).toHaveBeenCalledOnce();
  });


  it("handles add-item event from EmptyCart", async () => {
    const { wrapper, store } = setup();

    store.items = [];
    const spy = vi.spyOn(store, "addNewItem");

    await wrapper.vm.$nextTick();
    await wrapper.find(".empty-cart-mock button").trigger("click");

    expect(spy).toHaveBeenCalledOnce();
  });

  it("passes correct props to CartItem", async () => {
    const { wrapper, store } = setup();

    const item = { id: 1, title: "Test", price: 50, quantity: 2, image: "" };
    store.items = [item];

    await wrapper.vm.$nextTick();

    const cartItem = wrapper.findComponent({ name: "CartItem" });
    expect(cartItem.exists()).toBe(true);
    expect(cartItem.props("item")).toEqual(item);
    expect(cartItem.props("onIncrement")).toBeTypeOf("function");
    expect(cartItem.props("onDecrement")).toBeTypeOf("function");
    expect(cartItem.props("onRemove")).toBeTypeOf("function");
  });

  it("renders list role when items exist", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it("renders screen-reader heading", () => {
    const { wrapper } = setup();

    const heading = wrapper.find("#cart-items-title");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Cart Items");
    expect(heading.classes()).toContain("sr-only");
  });

  it("renders correct button types", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('button[type="button"]')).toHaveLength(2);
  });

  it("buttons have cursor-pointer class", async () => {
    const { wrapper, store } = setup();

    store.items = [{ id: 1, title: "Item", price: 10, quantity: 1, image: "" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".btn-add-item").classes()).toContain("cursor-pointer");
    expect(wrapper.find(".btn-clear-cart").classes()).toContain(
      "cursor-pointer",
    );
  });
});
