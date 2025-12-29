# CleanCare Backend API

A robust Node.js/Express backend API for the CleanCare e-commerce platform with PostgreSQL database, local file storage, and comprehensive product management.

## 🚀 Features

### Core API Features
- **RESTful API** with Express.js and TypeScript
- **PostgreSQL Database** with Prisma ORM
- **Local File Storage** for images and uploads
- **JWT Authentication** with role-based access
- **Product Management** with categories and variants
- **Shopping Cart** with persistent storage
- **Order Management** with status tracking
- **File Upload** with local storage
- **Input Validation** with express-validator
- **Error Handling** with custom middleware
- **Rate Limiting** for API protection

### Product Categories
- **Cleaning Products**
  - Floor Care (hardwood, tile, multi-surface)
  - Kitchen Cleaners (dishwash, degreasers)
  - Bathroom Cleaners (toilet, shower, disinfectants)
  - Laundry Care (detergents, fabric softeners)
  - Multi-Surface Cleaners
  - Eco Refills (sustainable packaging)

- **Household Products**
  - Cleaning Accessories (cloths, brushes, tools)
  - Storage & Organization solutions

### Database Schema
- **Users** with authentication and profiles
- **Categories** with hierarchical structure
- **Products** with images, variants, and inventory
- **Shopping Cart** with user sessions
- **Orders** with payment and shipping tracking
- **Reviews** and ratings system
- **Coupons** and discount management

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cleancare_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# File Upload
UPLOAD_DIR="uploads"
MAX_FILE_SIZE=5242880
```

### 3. Database Setup
```bash
# Generate Prisma client, run migrations, download sample images, and seed data
npm run setup

# Or run individually:
npm run generate     # Generate Prisma client
npm run migrate      # Run database migrations
npm run download-images  # Download sample product images
npm run seed         # Seed database with sample data
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/          # Database and upload configuration
│   ├── controllers/     # Route handlers and business logic
│   ├── middleware/      # Authentication, validation, error handling
│   ├── routes/          # API route definitions
│   └── server.ts        # Express app setup
├── uploads/             # Local file storage
│   ├── products/        # Product images
│   └── categories/      # Category images
├── scripts/             # Utility scripts
│   └── download-sample-images.js  # Download sample images
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Sample data seeding
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register     # Register new user
POST /api/auth/login        # User login
GET  /api/auth/profile      # Get user profile
PUT  /api/auth/profile      # Update profile
PUT  /api/auth/change-password  # Change password
```

### Categories
```
GET  /api/categories        # Get all categories
GET  /api/categories/:id    # Get category by ID
GET  /api/categories/:id/products  # Get category products
POST /api/categories        # Create category (Admin)
PUT  /api/categories/:id    # Update category (Admin)
DELETE /api/categories/:id  # Delete category (Admin)
```

### Products
```
GET  /api/products          # Get products with filtering
GET  /api/products/search   # Search products
GET  /api/products/featured # Get featured products
GET  /api/products/:id      # Get product by ID
GET  /api/products/slug/:slug  # Get product by slug
GET  /api/products/:id/related  # Get related products
POST /api/products          # Create product (Admin)
PUT  /api/products/:id      # Update product (Admin)
DELETE /api/products/:id    # Delete product (Admin)
```

### Shopping Cart
```
GET  /api/cart              # Get user's cart
POST /api/cart/add          # Add item to cart
PUT  /api/cart/item/:id     # Update cart item
DELETE /api/cart/item/:id   # Remove cart item
DELETE /api/cart/clear      # Clear entire cart
```

### Orders
```
GET  /api/orders            # Get user's orders
GET  /api/orders/:id        # Get order by ID
POST /api/orders            # Create new order
PUT  /api/orders/:id/cancel # Cancel order
PUT  /api/orders/:id/status # Update order status (Admin)
```

### File Upload
```
POST /api/upload/product-images  # Upload product images (Admin)
```

## 🔍 Query Parameters

### Products Filtering
```
GET /api/products?category=floor-care&minPrice=10&maxPrice=50&isEcoFriendly=true&page=1&limit=12&sortBy=price&sortOrder=asc
```

Available filters:
- `category` - Filter by category slug
- `minPrice`, `maxPrice` - Price range
- `isEcoFriendly` - Eco-friendly products only
- `isFeatured` - Featured products only
- `inStock` - In-stock products only
- `search` - Text search in name/description
- `page`, `limit` - Pagination
- `sortBy` - Sort field (price, name, createdAt, etc.)
- `sortOrder` - asc or desc

## 🔐 Authentication

### JWT Token Usage
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- `CUSTOMER` - Regular users (default)
- `ADMIN` - Admin users
- `SUPER_ADMIN` - Super admin users

## 📁 Local File Storage

### Automatic File Upload
Product images are automatically stored locally when creating/updating products:

```javascript
// Upload multiple images
POST /api/products
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "images": [file1, file2, file3]  // Files automatically stored locally
}
```

### Storage Configuration
- Images stored in `uploads/products/` folder
- Categories stored in `uploads/categories/` folder
- Automatic content-type detection
- Unique filenames with UUID
- 5MB file size limit (configurable)
- Image files only (jpg, png, gif, webp)
- Static file serving at `/uploads/*` endpoint

### File Structure
```
uploads/
├── products/           # Product images
│   ├── uuid1.jpg
│   ├── uuid2.png
│   └── ...
└── categories/         # Category images
    ├── uuid3.jpg
    └── ...
```

## 🗄️ Database Schema Highlights

### Product Schema
```sql
- id, name, slug, description
- price, originalPrice, sku
- categoryId (foreign key)
- isEcoFriendly, ecoScore, effectiveness
- stockQuantity, lowStockThreshold
- tags[], features[], ingredients[]
- images (separate table)
- variants (separate table)
```

### Category Hierarchy
```sql
- Supports nested categories (parent/child)
- Cleaning Products
  ├── Floor Care
  ├── Kitchen Cleaners
  ├── Bathroom Cleaners
  └── Eco Refills
- Household Products
  ├── Cleaning Accessories
  └── Storage & Organization
```

## 🧪 Sample Data

The seed script creates:
- **9 categories** (2 main + 7 subcategories)
- **8 sample products** across all categories
- **1 admin user** (admin@cleancare.com / admin123)
- **3 sample coupons** (CLEAN10, FREESHIP, WELCOME5)

### Sample Products Include:
- Ultra Floor Cleaner (Eco-friendly, Featured)
- Gentle Dishwash Liquid (Eco-friendly, Featured)
- Power Toilet Cleaner (High effectiveness)
- All-Purpose Surface Spray (Multi-surface)
- Eco Refill Pack (Sustainable packaging)
- Microfiber Cleaning Cloths (Accessories)

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
UPLOAD_DIR="uploads"
MAX_FILE_SIZE=5242880
```

### Build and Start
```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run generate     # Generate Prisma client
npm run seed         # Seed database with sample data
npm run studio       # Open Prisma Studio (database GUI)
npm run download-images  # Download sample product images
npm run setup        # Complete setup (generate + migrate + images + seed)
```

### Database Management
```bash
# Reset database and reseed
npx prisma migrate reset

# View database in browser
npm run studio
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]  // Validation errors if applicable
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "products": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 48,
      "pages": 4
    }
  }
}
```

## 🛡️ Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configured for frontend domain
- **Helmet.js** - Security headers
- **Input Validation** - All inputs validated and sanitized
- **Password Hashing** - bcrypt with 12 salt rounds
- **JWT Tokens** - Secure authentication
- **Role-based Access** - Admin-only endpoints protected

## 📝 License

This project is licensed under the MIT License.

---

**CleanCare Backend** - Powerful, scalable e-commerce API 🧽✨