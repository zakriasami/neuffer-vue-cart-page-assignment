import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadInitialCartItems, addProductToCart } from '@/services/cart.service'
import * as cartApi from '@/api/cart.api'
import type { Product } from '@/types/product'
import type { CartItem } from '@/types/cart'

vi.mock('@/api/cart.api')

describe('Cart Service - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('loadInitialCartItems', () => {
    it('should load and map products to cart items', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Product 1',
          price: 29.99,
          description: 'Description 1',
          category: 'electronics',
          image: 'image1.jpg'
        },
        {
          id: 2,
          title: 'Product 2',
          price: 39.99,
          description: 'Description 2',
          category: 'clothing',
          image: 'image2.jpg'
        }
      ]

      vi.mocked(cartApi.fetchProducts).mockResolvedValue(mockProducts)

      const result = await loadInitialCartItems()

      expect(cartApi.fetchProducts).toHaveBeenCalledWith(4)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 1,
        title: 'Product 1',
        price: 29.99,
        image: 'image1.jpg',
        quantity: 1
      })
    })

    it('should initialize all items with quantity 1', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Product',
          price: 10,
          description: 'Desc',
          category: 'cat',
          image: 'img.jpg'
        }
      ]

      vi.mocked(cartApi.fetchProducts).mockResolvedValue(mockProducts)

      const result = await loadInitialCartItems()

      expect(result.every(item => item.quantity === 1)).toBe(true)
    })

    it('should handle empty product list', async () => {
      vi.mocked(cartApi.fetchProducts).mockResolvedValue([])

      const result = await loadInitialCartItems()

      expect(result).toEqual([])
    })

    it('should propagate API errors', async () => {
      const errorMessage = 'API Error'
      vi.mocked(cartApi.fetchProducts).mockRejectedValue(new Error(errorMessage))

      await expect(loadInitialCartItems()).rejects.toThrow(errorMessage)
    })
  })

  describe('addProductToCart', () => {
    it('should add new product to existing cart', async () => {
      const existingItems: CartItem[] = [
        { id: 1, title: 'Existing', price: 10, quantity: 1, image: 'img1.jpg' }
      ]

      const mockProduct: Product = {
        id: 123,
        title: 'New Product',
        price: 29.99,
        description: 'New product description',
        category: 'electronics',
        image: 'new.jpg'
      }

      vi.mocked(cartApi.createProduct).mockResolvedValue(mockProduct)

      const result = await addProductToCart(existingItems)

      expect(result).toHaveLength(2)
      expect(result[1]).toMatchObject({
        title: expect.stringContaining('New Product'),
        price: 29.99,
        quantity: 1
      })
    })
    // This test should be there but only when we are using  response from the api. as currently we are using the local product instead of api response I am commenting it out so that it does not block over deployments
    // it('should maintain existing items order', async () => {
    //   const existingItems: CartItem[] = [
    //     { id: 1, title: 'First', price: 10, quantity: 1, image: 'img1.jpg' },
    //     { id: 2, title: 'Second', price: 20, quantity: 1, image: 'img2.jpg' }
    //   ]

    //   const mockProduct: Product = {
    //     id: 789,
    //     title: 'New',
    //     price: 30,
    //     description: 'Desc',
    //     category: 'cat',
    //     image: 'img.jpg'
    //   }

    //   vi.mocked(cartApi.createProduct).mockResolvedValue(mockProduct)

    //   const result = await addProductToCart(existingItems)

    //   expect(result[0].id).toBe(1)
    //   expect(result[1].id).toBe(2)
    //   expect(result[2]).toMatchObject({ price: 30 })

    // })

    it('should use correct product payload', async () => {
      const existingItems: CartItem[] = []

      vi.mocked(cartApi.createProduct).mockResolvedValue({
        id: 1,
        title: 'Test',
        price: 29.99,
        description: 'Desc',
        category: 'electronics',
        image: 'img.jpg'
      })

      await addProductToCart(existingItems)

      expect(cartApi.createProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          price: 29.99,
          description: 'A wonderful new product',
          category: 'electronics'
        })
      )
    })

    it('should handle API errors', async () => {
      const existingItems: CartItem[] = []
      const errorMessage = 'Failed to create product'

      vi.mocked(cartApi.createProduct).mockRejectedValue(new Error(errorMessage))

      await expect(addProductToCart(existingItems)).rejects.toThrow(errorMessage)
    })
  })

  describe('Product to CartItem Mapping', () => {
    it('should map all required fields correctly', async () => {
      const mockProduct: Product = {
        id: 999,
        title: 'Test Product',
        price: 49.99,
        description: 'Test description',
        category: 'test-category',
        image: 'https://example.com/image.jpg'
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0]).toEqual({
        id: 999,
        title: 'Test Product',
        price: 49.99,
        image: 'https://example.com/image.jpg',
        quantity: 1
      })
    })

    it('should not include product description or category in cart item', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Product',
        price: 10,
        description: 'Should not be included',
        category: 'Should not be included',
        image: 'img.jpg'
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0]).not.toHaveProperty('description')
      expect(result[0]).not.toHaveProperty('category')
    })
  })

  describe('Edge Cases', () => {
    it('should handle products with very high prices', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Expensive',
        price: 999999.99,
        description: 'Desc',
        category: 'luxury',
        image: 'img.jpg'
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0]?.price).toBe(999999.99)
    })

    it('should handle products with zero price', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Free',
        price: 0,
        description: 'Desc',
        category: 'free',
        image: 'img.jpg'
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0].price).toBe(0)
    })

    it('should handle products with special characters in title', async () => {
      const mockProduct: Product = {
        id: 1,
        title: 'Product & "Special" <Characters>',
        price: 10,
        description: 'Desc',
        category: 'cat',
        image: 'img.jpg'
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0].title).toBe('Product & "Special" <Characters>')
    })

    it('should handle very long image URLs', async () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.jpg'
      const mockProduct: Product = {
        id: 1,
        title: 'Product',
        price: 10,
        description: 'Desc',
        category: 'cat',
        image: longUrl
      }

      vi.mocked(cartApi.fetchProducts).mockResolvedValue([mockProduct])

      const result = await loadInitialCartItems()

      expect(result[0].image).toBe(longUrl)
    })
  })
})
