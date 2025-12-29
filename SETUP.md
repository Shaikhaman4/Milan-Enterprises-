# 🚀 CleanCare E-Commerce Setup Guide

Complete setup instructions for the CleanCare e-commerce platform with frontend and backend.

## 📋 Prerequisites

- **Node.js 18+** and npm/yarn
- **PostgreSQL** database
- **Git** for version control

## 🏗️ Project Structure

```
cleancare-ecommerce/
├── frontend/                 # Next.js 14 frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── store/              # Zustand state management
│   └── public/             # Static assets
└── backend/                 # Node.js/Express backend
    ├── src/                # TypeScript source code
    ├── uploads/            # Local file storage
    ├── prisma/             # Database schema & migrations
    └── scripts/            # Utility scripts
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
# Database (Update with your PostgreSQL credentials)
DATABASE_URL="postgresql://username:password@localhost:5432/cleancare_db"

# JWT Secret (Generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# Server Configuration
PORT=5000
NODE_ENV="development"

# File Upload Settings
UPLOAD_DIR="uploads"
MAX_FILE_SIZE=5242880

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Complete setup (recommended)
npm run setup

# This runs:
# - npm run generate     (Generate Prisma client)
# - npm run migrate      (Create database tables)
# - npm run download-images (Download sample product images)
# - npm run seed         (Add sample data)
```

### 5. Start Backend Server
```bash
npm run dev
```

✅ **Backend should now be running on http://localhost:5000**

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
# From project root
cd ../  # if you're in backend directory
# or
cd frontend  # if you have separate frontend directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

✅ **Frontend should now be running on http://localhost:3000**

## 🗄️ Database Information

### Sample Data Created:
- **Categories:** 9 categories (2 main + 7 subcategories)
- **Products:** 8 sample products with images and details
- **Admin User:** admin@cleancare.com / admin123
- **Coupons:** CLEAN10 (10% off), FREESHIP, WELCOME5 ($5 off)

### Database Management:
```bash
# View database in browser
npm run studio

# Reset database (if needed)
npx prisma migrate reset

# Re-run setup after reset
npm run setup
```

## 📸 Image Storage

### Local Storage Structure:
```
backend/uploads/
├── products/           # Product images
│   ├── floor-cleaner-citrus.jpg
│   ├── dishwash-liquid-lavender.jpg
│   └── ...
└── categories/         # Category images
    └── (category images)
```

### Image URLs:
- **Products:** `http://localhost:5000/uploads/products/filename.jpg`
- **Categories:** `http://localhost:5000/uploads/categories/filename.jpg`

## 🔐 Authentication & Testing

### Admin Account:
- **Email:** admin@cleancare.com
- **Password:** admin123
- **Role:** SUPER_ADMIN

### Test Coupons:
- **CLEAN10** - 10% off orders over $25
- **FREESHIP** - Free shipping over $30
- **WELCOME5** - $5 off orders over $20

## 🧪 Testing the Setup

### 1. Test Backend API:
```bash
# Health check
curl http://localhost:5000/health

# Get categories
curl http://localhost:5000/api/categories

# Get products
curl http://localhost:5000/api/products
```

### 2. Test Frontend:
- Visit http://localhost:3000
- Browse products and categories
- Add items to cart
- Test search functionality

### 3. Test Admin Features:
- Login with admin credentials
- Upload product images via API
- Manage products and categories

## 🚀 Production Deployment

### Backend Deployment:
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production:
```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
FRONTEND_URL="https://your-domain.com"
```

### Frontend Deployment:
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Troubleshooting

### Common Issues:

**1. Database Connection Error:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

**2. Images Not Loading:**
- Check uploads directory exists
- Run `npm run download-images`
- Verify file permissions

**3. Port Already in Use:**
- Change PORT in .env file
- Kill existing processes: `lsof -ti:5000 | xargs kill -9`

**4. Prisma Client Error:**
- Run `npm run generate`
- Delete node_modules and reinstall

### Reset Everything:
```bash
# Backend reset
cd backend
rm -rf node_modules
npm install
npx prisma migrate reset
npm run setup

# Frontend reset
cd ../
rm -rf node_modules
npm install
```

## 📚 API Documentation

### Key Endpoints:
- **GET /api/products** - List products with filtering
- **GET /api/categories** - List categories
- **POST /api/auth/login** - User authentication
- **POST /api/cart/add** - Add to cart
- **POST /api/orders** - Create order

### Authentication:
Include JWT token in headers:
```
Authorization: Bearer <your-jwt-token>
```

## 🎯 Next Steps

After setup, you can:
1. **Customize Products** - Add your own products and images
2. **Configure Payment** - Integrate Stripe/PayPal
3. **Setup Email** - Configure SMTP for notifications
4. **Add Analytics** - Integrate Google Analytics
5. **Deploy** - Deploy to production servers

## 🆘 Support

If you encounter issues:
1. Check this setup guide
2. Review error logs in terminal
3. Check database connection
4. Verify environment variables
5. Ensure all dependencies are installed

---

**🎉 You're all set! Your CleanCare e-commerce platform should now be running successfully!**