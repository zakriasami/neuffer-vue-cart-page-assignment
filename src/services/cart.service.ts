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
  const newProduct = await createProduct({
    title: 'New Product',
    price: 29.99,
    description: 'A wonderful new product',
    category: 'electronics',
    image: 'https://via.placeholder.com/300',
  })

  const existing = existingItems.find(i => i.title === newProduct.title)

  if (existing) {
    return existingItems.map(item =>
      item.id === existing.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

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