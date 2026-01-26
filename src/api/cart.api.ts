import type { Product } from '@/types/product'

const BASE_URL = 'https://fakestoreapi.com'

export async function fetchProducts(limit = 4): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function createProduct(payload: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}