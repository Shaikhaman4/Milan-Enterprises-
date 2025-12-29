# Milan Enterprises - Deployment Guide

## Free Deployment on Vercel

This project is ready to be deployed on Vercel for free. Follow these steps:

### Prerequisites
1. Create a GitHub account (if you don't have one): https://github.com
2. Create a Vercel account: https://vercel.com (sign up with GitHub)

### Deployment Steps

#### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit - Milan Enterprises website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/milan-enterprises.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Environment Variables
The following environment variables are automatically configured:
- `JWT_SECRET`: For authentication

### Features Included
- ✅ Responsive design (mobile & desktop)
- ✅ Admin authentication system
- ✅ Product catalog with variants
- ✅ Shopping cart functionality
- ✅ WhatsApp order integration
- ✅ Mobile navigation menu
- ✅ Product management (admin)

### Admin Access
- Email: admin@cleancare.com
- Password: admin123

### Products Included
1. Milan Washing Powder - 1KG (₹35)
2. Milan Bleach Aala Liquid - 1L/5L (₹25/₹100)
3. Milan Dhamaka Liquid Detergent - 1L (₹50)
4. Milan Top Floor Cleaner - 1L (₹60)
5. Milan Top Super Shine Liquid Soap - 1L (₹40)
6. Milan Top Super Shine Liquid Soap - 5L (₹150)

### Post-Deployment
After deployment, your website will be available at:
- https://your-project-name.vercel.app

### Custom Domain (Optional)
You can add a custom domain in Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

### Support
For any issues, check the Vercel documentation: https://vercel.com/docs