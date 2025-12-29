# CleanCare E-Commerce Website

A modern, eco-friendly cleaning products e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core E-Commerce Features
- **Product Catalog** with smart filtering and search
- **Shopping Cart** with persistent storage
- **User Authentication** (login/signup)
- **Guest Checkout** option
- **Coupon & Discount System**
- **Order Management**
- **Wishlist Functionality**
- **Product Reviews & Ratings**
- **Mobile-First Responsive Design**

### Unique Creative Elements
- **Animated Clean Meter** - Visual effectiveness indicator
- **Before/After Cleaning Slider** on product pages
- **Eco-Score Badge** for environmental impact
- **Fragrance Preview Cards** with micro-animations
- **Refill Subscription Model**
- **Story-based About Us** page

### Design & UX
- **Clean Typography** (Inter/Poppins fonts)
- **Minimal Pastel Color Palette** (white, green, aqua, soft blue)
- **Smooth Animations** with Framer Motion
- **Skeleton Loading States**
- **Accessibility-Friendly** (ARIA labels, proper contrast)
- **Micro-interactions** on hover and interactions

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Icons**: Heroicons
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cleancare-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
cleancare-ecommerce/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── products/         # Products pages
│   ├── cart/            # Shopping cart
│   └── about/           # About us page
├── components/           # Reusable components
│   ├── ui/              # UI components
│   ├── layout/          # Layout components
│   ├── home/            # Home page sections
│   ├── products/        # Product-related components
│   ├── cart/            # Cart components
│   └── about/           # About page components
├── store/               # State management
│   └── cartStore.ts     # Shopping cart store
├── public/              # Static assets
└── tailwind.config.js   # Tailwind configuration
```

## 🎨 Design System

### Colors
- **Primary**: Teal/Aqua shades (#14b8a6, #0d9488)
- **Clean Palette**: 
  - White: #ffffff
  - Mint: #f0fdfa
  - Aqua: #a7f3d0
  - Blue: #bfdbfe
  - Green: #86efac

### Typography
- **Display Font**: Poppins (headings, brand)
- **Body Font**: Inter (body text, UI)

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Primary (teal) and Secondary (white with teal border)
- **Inputs**: Clean, focused states with teal accents

## 🛍️ Key Features Implementation

### Shopping Cart
- Persistent storage using Zustand with localStorage
- Add/remove items with animations
- Quantity controls
- Coupon code system
- Free shipping threshold

### Product Catalog
- Advanced filtering (category, price, features, rating)
- Search functionality with suggestions
- Sort options (price, rating, eco-score, etc.)
- Product cards with hover effects

### Unique Elements
- **Clean Meter**: Animated progress bar showing cleaning effectiveness
- **Eco Score Badge**: Environmental impact indicator
- **Fragrance Preview**: Interactive scent selection
- **Before/After Slider**: Visual cleaning results

## 🌱 Sustainability Features

- **Eco-Score System**: Rate products on environmental impact
- **Refill Program**: Subscription model for eco-friendly refills
- **Impact Tracking**: Show water saved, plastic reduced
- **Product Management**: Easy-to-use admin interface for inventory

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet**: Adapted layouts for medium screens
- **Desktop**: Full-featured experience with hover states
- **Touch-Friendly**: Large tap targets, swipe gestures

## ⚡ Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Automatic route-based code splitting
- **Skeleton Loading**: Smooth loading states

## 🔧 Customization

### Adding New Products
1. Update the products array in `components/products/ProductsGrid.tsx`
2. Add product images to the `public/images` directory
3. Update product types in TypeScript interfaces

### Modifying Colors
1. Edit `tailwind.config.js` to change the color palette
2. Update CSS custom properties in `app/globals.css`
3. Modify component color classes as needed

### Adding New Pages
1. Create new route in the `app/` directory
2. Add navigation links in `components/layout/Header.tsx`
3. Update footer links in `components/layout/Footer.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS Amplify**: Connect GitHub repository
- **Docker**: Use the included Dockerfile

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Future Enhancements

- **Backend Integration**: Connect to real API/database
- **Payment Gateway**: Stripe/PayPal integration
- **User Accounts**: Full authentication system
- **Admin Dashboard**: Product and order management
- **Email Notifications**: Order confirmations, shipping updates
- **Reviews System**: Customer product reviews
- **Inventory Management**: Stock tracking
- **Analytics**: User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce best practices
- **Icons**: Heroicons by Tailwind Labs
- **Images**: Unsplash for placeholder images
- **Animations**: Framer Motion community examples

## 📞 Support

For support, email support@cleancare.com or join our Slack channel.

---

**CleanCare** - Powerful Clean. Gentle Care. 🌿✨