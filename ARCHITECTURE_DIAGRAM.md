# 📊 Inventory Management System - Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         TRENDHORA                                │
│                  Inventory Management System                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   User Interface     │         │   Admin Interface    │
│   (React Client)     │         │   (React Client)     │
└──────────┬───────────┘         └───────────┬──────────┘
           │                                   │
           │  Browse, Add to Cart, Checkout   │  Manage Stock
           │                                   │
           ├───────────────────────────────────┤
           │                                   │
           ▼                                   ▼
┌─────────────────────────────────────────────────────────┐
│                  Express API Server                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Routes (items.js, orders.js)                   │   │
│  └───────────────┬────────────────────┬────────────┘   │
│                  │                    │                 │
│                  ▼                    ▼                 │
│  ┌────────────────────┐   ┌──────────────────────┐    │
│  │ Items Controller   │   │  Orders Controller   │    │
│  │ - getItem          │   │  - createOrder       │    │
│  │ - checkStock       │   │  - getMyOrders       │    │
│  │ - updateStock      │   │  - updateStatus      │    │
│  │ - getLowStock      │   │                      │    │
│  └────────┬───────────┘   └──────────┬───────────┘    │
│           │                          │                 │
│           └──────────┬───────────────┘                 │
│                      │                                 │
│                      ▼                                 │
│           ┌──────────────────────┐                    │
│           │   Mongoose Models    │                    │
│           │   - Item Model       │                    │
│           │   - Order Model      │                    │
│           └──────────┬───────────┘                    │
└───────────────────────┼────────────────────────────────┘
                        │
                        ▼
           ┌────────────────────────┐
           │   MongoDB Database     │
           │  ┌──────────────────┐  │
           │  │  Items Collection│  │
           │  │  - stock         │  │
           │  │  - lowStockThr.  │  │
           │  │  - stockStatus   │  │
           │  └──────────────────┘  │
           │  ┌──────────────────┐  │
           │  │ Orders Collection│  │
           │  └──────────────────┘  │
           └────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Purchase Flow (Stock Validation)

```
User                 Frontend              Backend               Database
  │                     │                     │                     │
  │  Click Checkout     │                     │                     │
  ├────────────────────>│                     │                     │
  │                     │  POST /api/orders   │                     │
  │                     ├────────────────────>│                     │
  │                     │                     │  Validate Stock     │
  │                     │                     ├────────────────────>│
  │                     │                     │  Check each item    │
  │                     │                     │<────────────────────┤
  │                     │                     │                     │
  │                     │    ❌ Insufficient  │                     │
  │                     │      Stock Error    │                     │
  │   Error Message     │<────────────────────┤                     │
  │<────────────────────┤                     │                     │
  │                     │                     │                     │
  │                     │    ✅ Stock OK      │                     │
  │                     │                     │  Create Order       │
  │                     │                     ├────────────────────>│
  │                     │                     │  Decrease Stock     │
  │                     │                     ├────────────────────>│
  │   Order Success     │  Order Created      │                     │
  │<────────────────────┤<────────────────────┤                     │
  │                     │                     │                     │
```

### 2. Admin Stock Update Flow

```
Admin                Frontend              Backend               Database
  │                     │                     │                     │
  │ Navigate to         │                     │                     │
  │ /admin/inventory    │                     │                     │
  ├────────────────────>│                     │                     │
  │                     │  GET /api/items     │                     │
  │                     ├────────────────────>│                     │
  │                     │                     │  Fetch all items    │
  │                     │                     ├────────────────────>│
  │  Display table      │  Items with stock   │                     │
  │<────────────────────┤<────────────────────┤<────────────────────┤
  │                     │                     │                     │
  │ Click Edit          │                     │                     │
  ├────────────────────>│                     │                     │
  │ Update Dialog       │                     │                     │
  │<────────────────────┤                     │                     │
  │                     │                     │                     │
  │ Enter new stock     │                     │                     │
  │ Click Update        │                     │                     │
  ├────────────────────>│ PUT /api/items/:id/ │                     │
  │                     │      stock          │                     │
  │                     ├────────────────────>│                     │
  │                     │  (Admin auth)       │  Update stock       │
  │                     │                     ├────────────────────>│
  │  Success message    │  Updated item       │                     │
  │<────────────────────┤<────────────────────┤<────────────────────┤
  │ Table refreshes     │                     │                     │
```

### 3. Product Display Flow (Real-time Stock)

```
User                 Frontend              Backend               Database
  │                     │                     │                     │
  │ View Product Page   │                     │                     │
  ├────────────────────>│                     │                     │
  │                     │  GET /api/items/:id │                     │
  │                     ├────────────────────>│                     │
  │                     │                     │  Fetch item         │
  │                     │                     ├────────────────────>│
  │                     │                     │  with stock info    │
  │                     │  Item + stock +     │                     │
  │                     │  stockStatus        │                     │
  │  Display product    │<────────────────────┤<────────────────────┤
  │<────────────────────┤                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────────────────────┐    │                     │
  │  │ Product: T-Shirt                 │    │                     │
  │  │ Price: $25                       │    │                     │
  │  │ ┌─────────────────────────────┐  │    │                     │
  │  │ │ ⚠️ Low Stock - Only 3 left! │  │    │                     │
  │  │ └─────────────────────────────┘  │    │                     │
  │  │ [Add to Cart] (enabled)          │    │                     │
  │  └──────────────────────────────────┘    │                     │
```

---

## Component Hierarchy

```
App.js
├── Router
│   ├── Home
│   ├── Shop
│   ├── ItemView
│   │   └── Item
│   │       ├── ItemCarousel
│   │       └── Detail ⭐ (Stock Display)
│   │           ├── Stock Alerts
│   │           ├── Add to Cart (Stock-aware)
│   │           └── Quantity Selector (Stock-limited)
│   ├── CategoryView
│   │   └── ItemCard ⭐ (Stock Badges)
│   ├── Cart
│   │   └── CartCard ⭐ (Stock Validation)
│   └── Admin Routes
│       └── InventoryManagement ⭐ (NEW)
│           ├── All Items Tab
│           └── Low Stock Alerts Tab
```

⭐ = Modified/Created for inventory management

---

## Database Schema

### Item Model
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  description: String,
  image: [String],
  size: [String],
  highlights: [String],
  detail: String,
  
  // 🆕 Inventory Fields
  stock: Number (default: 0, min: 0),
  lowStockThreshold: Number (default: 5, min: 0),
  
  // 🆕 Virtual Field (computed)
  stockStatus: String ('in_stock' | 'low_stock' | 'out_of_stock'),
  
  timestamps: true
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderNumber: String (unique),
  items: [{
    product: ObjectId (ref: Item),
    name: String,
    price: Number,
    quantity: Number,  // ⚠️ Validated against stock
    size: String,
    image: String
  }],
  totalAmount: Number,
  status: String,
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  timestamps: true
}
```

---

## API Endpoints

### Public Endpoints
```
GET  /api/items                    - Get all items (includes stock)
GET  /api/items/:id                - Get single item (includes stock)
GET  /api/items/:id/check-stock    - Check stock availability
GET  /api/items/search?q=term      - Search items
```

### Protected Endpoints (User)
```
POST /api/orders                   - Create order (validates stock)
GET  /api/orders/my-orders         - Get user's orders
GET  /api/orders/:id               - Get order details
```

### Protected Endpoints (Admin)
```
GET  /api/items/low-stock          - Get low stock items
PUT  /api/items/:id/stock          - Update stock levels
POST /api/items                    - Add new item (with stock)
PUT  /api/items/:id                - Update item
DELETE /api/items/:id              - Delete item
```

---

## State Management

### Frontend State (React)
```javascript
// In components
const [stockInfo, setStockInfo] = useState({
  stock: 0,
  stockStatus: 'in_stock'
});

// Contexts used
- CartItemsContext     // Cart state management
- WishItemsContext     // Wishlist management
- ThemeContext         // Dark/light mode
- ComparisonContext    // Product comparison
```

---

## Security Layer

```
Request Flow:

Client Request
     │
     ▼
┌─────────────────┐
│  authMiddleware │  ← Checks JWT token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Role Check     │  ← Admin role required?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controller     │  ← Process request
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database       │
└─────────────────┘
```

---

## Error Handling

### Stock Validation Errors
```javascript
// Insufficient Stock
Status: 400 Bad Request
Body: {
  message: "Insufficient stock for some items",
  insufficientStock: [
    {
      productId: "...",
      name: "Product Name",
      requested: 5,
      available: 2
    }
  ]
}

// Out of Stock
Status: 400 Bad Request
Body: {
  message: "This item is currently out of stock"
}

// Admin Access Denied
Status: 403 Forbidden
Body: {
  message: "Access denied. Admin only."
}
```

---

## Performance Considerations

1. **Virtual Fields**: `stockStatus` computed on-the-fly (no extra DB field)
2. **Indexed Queries**: `_id` and custom indexes for fast lookups
3. **Lean Queries**: Only fetch necessary fields
4. **Caching**: Frontend caches stock info briefly
5. **Batch Updates**: Admin can update multiple items efficiently

---

**System fully documented and production-ready! 🚀**
