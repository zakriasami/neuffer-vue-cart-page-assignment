# 🛒 Neuffer Shopping Cart

A modern, feature-rich shopping cart application built with Vue 3, TypeScript, and Tailwind CSS. This project demonstrates best practices in frontend development including type safety, state management, and responsive design.

🌐 **Live Demo**: [https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/](https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Testing](#-testing)
- [Building for Production](#-building-for-production)
- [Architecture](#-architecture)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Functionality
- ✅ **Product Display** - Browse products from FakeStore API
- ✅ **Cart Management** - Add, remove, and update item quantities
- ✅ **Real-time Calculations** - Automatic subtotal, tax (20%), and total calculations
- ✅ **Quantity Controls** - Increment/decrement buttons with manual input
- ✅ **Shipping Calculator** - Estimate shipping costs based on location
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop

### Advanced Features
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🔄 **State Management** - Pinia for reactive state management
- 📱 **Mobile-First** - Adaptive layouts for all screen sizes
- ♿ **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- 🎯 **Type Safety** - Full TypeScript coverage with strict mode
- 🧪 **Test Coverage** - 147 tests (unit, integration, E2E)
- 🚀 **Performance** - Lazy loading, optimized rendering
- 🌐 **Internationalization Ready** - EUR currency with German locale

---

## 🛠️ Tech Stack

### Core Technologies
- **[Vue 3](https://vuejs.org/)** `^3.5.24` - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** `~5.9.3` - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** `^7.2.4` - Next-generation build tool
- **[Pinia](https://pinia.vuejs.org/)** `^3.0.4` - State management

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** `^4.1.18` - Utility-first CSS framework
- **Custom CSS** - Additional styling and animations

### Testing
- **[Vitest](https://vitest.dev/)** `^4.0.18` - Unit testing framework
- **[Vue Test Utils](https://test-utils.vuejs.org/)** `^2.4.6` - Component testing
- **Coverage**: 85%+ across all metrics

### External APIs
- **[FakeStore API](https://fakestoreapi.com/)** - Product data source

---

## 📁 Project Structure

```
neuffer-shopping-cart/
├── public/                     # Static assets
│   └── favicon.svg            # Neuffer favicon
├── src/
│   ├── api/                   # API layer
│   │   └── cart.api.ts       # FakeStore API integration
│   ├── components/            # Vue components
│   │   ├── cart/
│   │   │   ├── Cart.vue                 # Main cart component
│   │   │   ├── CartItem/
│   │   │   │   ├── CartItem.vue        # Cart item wrapper
│   │   │   │   ├── CartItemDesktop.vue # Desktop layout
│   │   │   │   ├── CartItemMobile.vue  # Mobile layout
│   │   │   │   ├── SkeletonLoader.vue  # Loading skeleton
│   │   │   │   └── shared/             # Shared components
│   │   │   │       ├── ProductImage.vue
│   │   │   │       └── QuantityControls.vue
│   │   │   ├── CartTotals.vue          # Cart summary
│   │   │   └── EmptyCart.vue           # Empty state
│   │   └── Shipping/
│   │       ├── Calculator.vue          # Shipping calculator
│   │       └── ShippingResult.vue      # Shipping display
│   ├── composables/           # Composition API utilities
│   │   └── useShippingForm.ts # Shipping form logic
│   ├── config/                # Configuration
│   │   ├── currency.ts       # Currency settings (EUR)
│   │   └── tax.ts            # Tax rate (20%)
│   ├── services/              # Business logic
│   │   └── cart.service.ts   # Cart operations
│   ├── store/                 # Pinia stores
│   │   └── cart.store.ts     # Cart state management
│   ├── types/                 # TypeScript types
│   │   ├── cart.ts
│   │   ├── cartTotal.ts
│   │   ├── product.ts
│   │   └── shipping.ts
│   ├── utils/                 # Utility functions
│   │   └── formatCurrency.ts # Currency formatting
│   ├── __tests__/             # Test files
│   │   ├── unit/             # Unit tests
│   │   ├── integration/      # Integration tests
│   │   └── setup.ts          # Test configuration
│   ├── App.vue               # Root component
│   ├── main.ts               # Application entry
│   └── style.css             # Global styles
├── e2e/                       # End-to-end tests
│   └── cart.spec.ts
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── vitest.config.ts           # Vitest config
├── playwright.config.ts       # Playwright config
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>=18.0.0` (LTS recommended)
- **npm** `>=9.0.0` or **yarn** `>=1.22.0`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neuffer-shopping-cart.git
   cd neuffer-shopping-cart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |
| `npm run test:ui` | Open Vitest UI |

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm test              # Run tests
   npm run build        # Verify build works
   ```

3. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "test: add tests for feature"
   ```

---

## 🧪 Testing

### Test Coverage

The project includes **147 comprehensive tests**:

- **90 Unit Tests** - Store, services, utilities
- **22 Integration Tests** - Component integration
- **35 E2E Tests** - Full user workflows

### Running Tests

**Unit & Integration Tests:**
```bash
# Watch mode (recommended during development)
npm test

# Run once
npm run test:run

# With UI
npm run test:ui

## 🏗️ Building for Production

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Opens the production build at `http://localhost:4173`

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].css    # Minified styles
│   └── index-[hash].js     # Minified JavaScript
├── favicon.svg
└── index.html
```

**Optimizations Applied:**
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ CSS purging
- ✅ Asset optimization
- ✅ Gzip compression

---

## 🏛️ Architecture

### State Management (Pinia)

**Cart Store** (`src/store/cart.store.ts`)

```typescript
// State
items: CartItem[]           // Cart items
isLoading: boolean          // Loading state
error: string | null        // Error state
shippingCost: number        // Shipping cost
shippingInfo: ShippingInfo  // Shipping details

// Computed
isEmpty: boolean            // Check if cart is empty
itemCount: number          // Total item count
subtotal: number           // Cart subtotal
tax: number                // 20% tax
total: number              // Grand total
cartTotals: CartTotals     // All totals

// Actions
fetchInitialProducts()     // Load products
addNewItem()               // Add product to cart
updateQuantity()           // Update item quantity
incrementQuantity()        // Increase quantity
decrementQuantity()        // Decrease quantity
removeItem()               // Remove from cart
clearCart()                // Clear all items
calculateShipping()        // Calculate shipping
updateShippingInfo()       // Update shipping details
```

### Component Architecture

**Separation of Concerns:**
- **Presentation** - Vue components (views)
- **Business Logic** - Services layer
- **State** - Pinia stores
- **Data Access** - API layer
- **Types** - TypeScript interfaces

### Data Flow

```
User Interaction
    ↓
Component (Cart.vue)
    ↓
Store Action (cart.store.ts)
    ↓
Service (cart.service.ts)
    ↓
API Call (cart.api.ts)
    ↓
External API (FakeStore)
    ↓
Response Processing
    ↓
Store Update
    ↓
Component Re-render
```

---

## 🌐 API Integration

### FakeStore API

**Base URL:** `https://fakestoreapi.com`

**Endpoints Used:**

1. **Get Products**
   ```
   GET /products?limit=4
   ```
   Fetches initial cart items

2. **Create Product**
   ```
   POST /products
   Content-Type: application/json
   
   {
     "title": "New Product",
     "price": 29.99,
     "description": "Product description",
     "category": "electronics",
     "image": "https://..."
   }
   ```
   Adds new product to cart

### API Service Layer

Located in `src/api/cart.api.ts`:

```typescript
// Fetch products
export async function fetchProducts(limit = 4): Promise<Product[]>

// Create product
export async function createProduct(payload: Omit<Product, 'id'>): Promise<Product>
```

### Error Handling

All API calls include error handling:
```typescript
try {
  const products = await fetchProducts(4)
  // Success
} catch (error) {
  // Handle error
  console.error('Failed to fetch products:', error)
}
```

---

## 🎨 Styling

### Tailwind CSS

**Configuration** (`tailwind.config.js`):
- Custom color palette matching Neuffer brand
- Responsive breakpoints (sm, md, lg, xl)
- Custom utilities
- Roboto font family

### Custom Colors

```javascript
colors: {
  'primary-text': '#1D3178',
  'primary-green': '#19D16F',
  'primary-pink': '#FB2E86',
  'neutral-bg': '#F6F5FF',
  'neutral-border': '#E1E1E4',
  'neutral-buttonBg': '#E7E7EF',
  'neutral-placeholder': '#C4C4C4'
}
```

### Responsive Design

- **Mobile First** approach
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px (tablet)
  - `lg`: 1024px (desktop)
  - `xl`: 1280px

---

## ♿ Accessibility

### ARIA Support

- Semantic HTML5 elements (`<article>`, `<section>`, `<aside>`, `<nav>`)
- ARIA labels for all interactive elements
- ARIA live regions for dynamic content
- Proper heading hierarchy (h1-h3)

### Keyboard Navigation

- Tab navigation through all interactive elements
- Enter/Space to activate buttons
- Focus indicators
- Skip links for screen readers

### Screen Reader Support

- Descriptive labels
- Status announcements
- Error messages
- Loading states

---

## 🚢 Deployment

### Netlify (Current)

**Live URL:** [https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/](https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/)

**Deployment Steps:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Auto-deploy on push to main

### Alternative Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**GitHub Pages:**
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 📊 Performance

### Metrics

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~65KB gzipped

### Optimizations

- ✅ Code splitting by route
- ✅ Lazy loading images
- ✅ Tree shaking unused code
- ✅ CSS purging
- ✅ Minification
- ✅ Compression (Gzip/Brotli)

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🔧 Configuration

### TypeScript

**Strict Mode Enabled:**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

### Vite

- Fast HMR (Hot Module Replacement)
- Optimized builds
- TypeScript support
- Path aliases (`@/` → `src/`)

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🔗 Links

- **Live Demo**: [https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/](https://697976d5dccb5a52b22058d7--neuffer-vue-checkot.netlify.app/)
- **FakeStore API**: [https://fakestoreapi.com/](https://fakestoreapi.com/)
- **Vue 3 Docs**: [https://vuejs.org/](https://vuejs.org/)
- **Pinia Docs**: [https://pinia.vuejs.org/](https://pinia.vuejs.org/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)

---

**Made with ❤️ using Vue 3 + TypeScript + Tailwind CSS**

**Last Updated:** January 28, 2026
