import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'
import { fetchProducts, createProduct } from '@/api/cart.api'

export async function loadInitialCartItems(): Promise<CartItem[]> {
  const products = await fetchProducts(4)

  return products.map(mapProductToCartItem)
}

export async function addProductToCart(
  existingItems: CartItem[],
): Promise<CartItem[]> {
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000)
  const newProductPayload: Omit<Product, 'id'> = {
    title: `New Product + ${uniqueId}`,
    price: 29.99,
    description: 'A wonderful new product',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
  }
  const newProduct = await createProduct(newProductPayload)
  // we will not check for existing products as endpoint always returned the same product and we will not be able to acheive actual functionality
  // const existing = existingItems.find(i => i.title === newProduct.title)

  // if (existing) {
  //   return existingItems.map(item =>
  //     item.id === existing.id
  //       ? { ...item, quantity: item.quantity + 1 }
  //       : item
  //   )
  // }

  return [
    ...existingItems,
    mapProductToCartItem(newProduct),
  ]
}

function mapProductToCartItem(product: Product): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  }
}