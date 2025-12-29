import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  console.log('📁 Creating categories...');
  
  // Main categories
  const cleaningCategory = await prisma.category.create({
    data: {
      name: 'Cleaning Products',
      slug: 'cleaning-products',
      description: 'Professional-grade cleaning solutions for every surface and need',
      sortOrder: 1,
    },
  });

  const householdCategory = await prisma.category.create({
    data: {
      name: 'Household Products',
      slug: 'household-products',
      description: 'Essential household items and accessories for daily living',
      sortOrder: 2,
    },
  });

  // Cleaning subcategories
  const floorCareCategory = await prisma.category.create({
    data: {
      name: 'Floor Care',
      slug: 'floor-care',
      description: 'Specialized cleaners for all types of flooring',
      parentId: cleaningCategory.id,
      sortOrder: 1,
    },
  });

  const kitchenCategory = await prisma.category.create({
    data: {
      name: 'Kitchen Cleaners',
      slug: 'kitchen-cleaners',
      description: 'Powerful degreasers and dishwashing solutions',
      parentId: cleaningCategory.id,
      sortOrder: 2,
    },
  });

  const bathroomCategory = await prisma.category.create({
    data: {
      name: 'Bathroom Cleaners',
      slug: 'bathroom-cleaners',
      description: 'Disinfectants and specialized bathroom cleaning products',
      parentId: cleaningCategory.id,
      sortOrder: 3,
    },
  });

  const laundryCategory = await prisma.category.create({
    data: {
      name: 'Laundry Care',
      slug: 'laundry-care',
      description: 'Detergents, fabric softeners, and stain removers',
      parentId: cleaningCategory.id,
      sortOrder: 4,
    },
  });

  const multiSurfaceCategory = await prisma.category.create({
    data: {
      name: 'Multi-Surface',
      slug: 'multi-surface',
      description: 'Versatile cleaners for multiple surfaces',
      parentId: cleaningCategory.id,
      sortOrder: 5,
    },
  });

  const ecoRefillsCategory = await prisma.category.create({
    data: {
      name: 'Eco Refills',
      slug: 'eco-refills',
      description: 'Sustainable refill packs to reduce plastic waste',
      parentId: cleaningCategory.id,
      sortOrder: 6,
    },
  });

  // Household subcategories
  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Cleaning Accessories',
      slug: 'cleaning-accessories',
      description: 'Tools and accessories to enhance your cleaning routine',
      parentId: householdCategory.id,
      sortOrder: 1,
    },
  });

  const storageCategory = await prisma.category.create({
    data: {
      name: 'Storage & Organization',
      slug: 'storage-organization',
      description: 'Solutions to keep your home organized and tidy',
      parentId: householdCategory.id,
      sortOrder: 2,
    },
  });

  // Create admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@cleancare.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
    },
  });

  // Create sample products
  console.log('🧽 Creating sample products...');

  // Floor Care Products
  await prisma.product.create({
    data: {
      name: 'Ultra Floor Cleaner - Citrus Fresh',
      slug: 'ultra-floor-cleaner-citrus',
      description: 'Our most powerful floor cleaner with a refreshing citrus scent. Safe for all floor types including hardwood, tile, laminate, and vinyl. The concentrated formula provides streak-free cleaning while leaving a pleasant, long-lasting fragrance.',
      shortDescription: 'Powerful, streak-free floor cleaner with citrus fragrance',
      price: 12.99,
      originalPrice: 15.99,
      sku: 'CC-FC-001',
      categoryId: floorCareCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      isFeatured: true,
      ecoScore: 95,
      effectiveness: 98,
      stockQuantity: 150,
      tags: JSON.stringify(['floor cleaner', 'citrus', 'streak-free', 'concentrated']),
      features: JSON.stringify(['Streak-free shine', 'Pleasant citrus fragrance', 'Safe for pets', 'Concentrated formula']),
      ingredients: JSON.stringify(['Plant-based surfactants', 'Natural citrus oils', 'Biodegradable enzymes']),
      instructions: 'Dilute 1:10 with water. Mop as usual. No rinsing required.',
      fragrance: 'Citrus Fresh',
      size: '32 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/floor-cleaner-citrus.jpg',
            altText: 'Ultra Floor Cleaner - Citrus Fresh',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Hardwood Floor Polish',
      slug: 'hardwood-floor-polish',
      description: 'Specially formulated for hardwood floors, this polish restores natural shine while providing protection against daily wear. Contains natural waxes and oils that nourish the wood.',
      shortDescription: 'Restores shine and protects hardwood floors',
      price: 16.99,
      sku: 'CC-FC-002',
      categoryId: floorCareCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      ecoScore: 92,
      effectiveness: 96,
      stockQuantity: 75,
      tags: JSON.stringify(['hardwood', 'polish', 'protection', 'natural']),
      features: JSON.stringify(['Restores natural shine', 'Protective coating', 'Natural waxes', 'Long-lasting']),
      ingredients: JSON.stringify(['Carnauba wax', 'Natural oils', 'Plant-based cleaners']),
      fragrance: 'Wood Fresh',
      size: '24 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/hardwood-floor-polish.jpg',
            altText: 'Hardwood Floor Polish',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Kitchen Products
  await prisma.product.create({
    data: {
      name: 'Gentle Dishwash Liquid - Lavender',
      slug: 'gentle-dishwash-liquid-lavender',
      description: 'Ultra-gentle on hands yet tough on grease. Our plant-based formula cuts through the toughest food residues while being kind to your skin. Infused with natural lavender for a calming scent.',
      shortDescription: 'Gentle on hands, tough on grease dishwashing liquid',
      price: 8.99,
      originalPrice: 10.99,
      sku: 'CC-KT-001',
      categoryId: kitchenCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      isFeatured: true,
      ecoScore: 94,
      effectiveness: 97,
      stockQuantity: 200,
      tags: JSON.stringify(['dishwash', 'gentle', 'lavender', 'grease-cutting']),
      features: JSON.stringify(['Gentle on hands', 'Cuts through grease', 'Biodegradable', 'Natural lavender scent']),
      ingredients: JSON.stringify(['Plant-based surfactants', 'Lavender essential oil', 'Aloe vera extract']),
      fragrance: 'Lavender',
      size: '25 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/dishwash-liquid-lavender.jpg',
            altText: 'Gentle Dishwash Liquid - Lavender',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Heavy Duty Degreaser',
      slug: 'heavy-duty-degreaser',
      description: 'Professional-strength degreaser for the toughest kitchen messes. Perfect for stovetops, ovens, range hoods, and commercial kitchens. Fast-acting formula breaks down grease and grime in minutes.',
      shortDescription: 'Professional-strength degreaser for tough kitchen messes',
      price: 18.99,
      originalPrice: 22.99,
      sku: 'CC-KT-002',
      categoryId: kitchenCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: false,
      ecoScore: 78,
      effectiveness: 99,
      stockQuantity: 85,
      tags: JSON.stringify(['degreaser', 'heavy-duty', 'professional', 'fast-acting']),
      features: JSON.stringify(['Industrial strength', 'Fast acting', 'Professional grade', 'Versatile use']),
      ingredients: JSON.stringify(['Alkaline cleaners', 'Surfactants', 'Degreasers']),
      warnings: 'Use in well-ventilated area. Wear gloves.',
      fragrance: 'Unscented',
      size: '32 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/heavy-duty-degreaser.jpg',
            altText: 'Heavy Duty Degreaser',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Bathroom Products
  await prisma.product.create({
    data: {
      name: 'Power Toilet Cleaner',
      slug: 'power-toilet-cleaner',
      description: 'Maximum strength toilet bowl cleaner that removes tough stains, mineral deposits, and bacteria. The angled bottle design reaches under the rim for complete coverage.',
      shortDescription: 'Maximum strength toilet bowl cleaner',
      price: 9.99,
      originalPrice: 12.99,
      sku: 'CC-BT-001',
      categoryId: bathroomCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: false,
      isFeatured: true,
      ecoScore: 82,
      effectiveness: 99,
      stockQuantity: 120,
      tags: JSON.stringify(['toilet cleaner', 'disinfectant', 'stain remover', 'antibacterial']),
      features: JSON.stringify(['Removes tough stains', 'Kills 99.9% of germs', 'Angled bottle', 'Fresh scent']),
      ingredients: JSON.stringify(['Hydrochloric acid', 'Surfactants', 'Disinfectants']),
      warnings: 'Do not mix with other chemicals. Use in ventilated area.',
      fragrance: 'Ocean Fresh',
      size: '24 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/power-toilet-cleaner.jpg',
            altText: 'Power Toilet Cleaner',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Multi-Surface Products
  await prisma.product.create({
    data: {
      name: 'All-Purpose Surface Spray',
      slug: 'all-purpose-surface-spray',
      description: 'One spray for all your cleaning needs. Safe on countertops, appliances, glass, and most surfaces. Kills 99.9% of germs while leaving surfaces streak-free and fresh.',
      shortDescription: 'Versatile cleaner for all surfaces',
      price: 11.99,
      originalPrice: 13.99,
      sku: 'CC-MS-001',
      categoryId: multiSurfaceCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      isFeatured: true,
      ecoScore: 91,
      effectiveness: 95,
      stockQuantity: 180,
      tags: JSON.stringify(['all-purpose', 'disinfectant', 'multi-surface', 'streak-free']),
      features: JSON.stringify(['Kills 99.9% germs', 'Natural ingredients', 'Multiple surfaces', 'Streak-free finish']),
      ingredients: JSON.stringify(['Plant-based cleaners', 'Natural disinfectants', 'Essential oils']),
      fragrance: 'Fresh Mint',
      size: '28 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/all-purpose-surface-spray.jpg',
            altText: 'All-Purpose Surface Spray',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Eco Refills
  await prisma.product.create({
    data: {
      name: 'Eco Refill Pack - Multi-Surface',
      slug: 'eco-refill-pack-multi-surface',
      description: 'Sustainable refill pack for our All-Purpose Surface Spray. Reduces plastic waste by 75% compared to buying new bottles. Each pack makes 3 full bottles of cleaner.',
      shortDescription: 'Sustainable refill pack reduces plastic waste',
      price: 19.99,
      originalPrice: 24.99,
      sku: 'CC-RF-001',
      categoryId: ecoRefillsCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      isFeatured: true,
      ecoScore: 98,
      effectiveness: 95,
      stockQuantity: 90,
      tags: JSON.stringify(['refill', 'eco-friendly', 'sustainable', 'concentrated']),
      features: JSON.stringify(['3-month supply', 'Reduces plastic waste by 75%', 'Concentrated formula', 'Easy mixing']),
      ingredients: JSON.stringify(['Concentrated plant-based cleaners', 'Natural preservatives']),
      instructions: 'Mix one packet with 28 fl oz of water in your existing spray bottle.',
      size: '3 packets',
      images: {
        create: [
          {
            url: '/uploads/products/eco-refill-pack.jpg',
            altText: 'Eco Refill Pack - Multi-Surface',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Laundry Products
  await prisma.product.create({
    data: {
      name: 'Fabric Softener Concentrate',
      slug: 'fabric-softener-concentrate',
      description: 'Ultra-concentrated fabric softener that makes clothes soft, reduces static, and leaves a long-lasting fresh scent. Hypoallergenic formula is gentle on sensitive skin.',
      shortDescription: 'Ultra-concentrated fabric softener',
      price: 14.99,
      sku: 'CC-LD-001',
      categoryId: laundryCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      ecoScore: 89,
      effectiveness: 93,
      stockQuantity: 110,
      tags: JSON.stringify(['fabric softener', 'concentrated', 'hypoallergenic', 'static-free']),
      features: JSON.stringify(['Long-lasting freshness', 'Hypoallergenic', 'Concentrated formula', 'Reduces static']),
      ingredients: JSON.stringify(['Plant-based softening agents', 'Natural fragrance', 'Biodegradable conditioners']),
      fragrance: 'Spring Breeze',
      size: '40 fl oz',
      images: {
        create: [
          {
            url: '/uploads/products/fabric-softener-concentrate.jpg',
            altText: 'Fabric Softener Concentrate',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Household Accessories
  await prisma.product.create({
    data: {
      name: 'Microfiber Cleaning Cloths Set',
      slug: 'microfiber-cleaning-cloths-set',
      description: 'Premium microfiber cloths that trap dirt and dust without chemicals. Lint-free, streak-free cleaning for all surfaces. Machine washable and reusable up to 500 times.',
      shortDescription: 'Premium microfiber cloths for chemical-free cleaning',
      price: 12.99,
      sku: 'CC-AC-001',
      categoryId: accessoriesCategory.id,
      brand: 'CleanCare',
      isEcoFriendly: true,
      ecoScore: 95,
      effectiveness: 92,
      stockQuantity: 200,
      tags: JSON.stringify(['microfiber', 'reusable', 'lint-free', 'chemical-free']),
      features: JSON.stringify(['Reusable up to 500 times', 'Lint-free cleaning', 'Machine washable', 'Chemical-free']),
      size: '6-pack (12" x 12")',
      images: {
        create: [
          {
            url: '/uploads/products/microfiber-cleaning-cloths.jpg',
            altText: 'Microfiber Cleaning Cloths Set',
            isMain: true,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  // Create coupons
  console.log('🎫 Creating sample coupons...');
  
  await prisma.coupon.create({
    data: {
      code: 'CLEAN10',
      type: 'PERCENTAGE',
      value: 10,
      minAmount: 25,
      maxDiscount: 50,
      usageLimit: 1000,
      isActive: true,
      expiresAt: new Date('2024-12-31'),
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'FREESHIP',
      type: 'FREE_SHIPPING',
      value: 0,
      minAmount: 30,
      usageLimit: 500,
      isActive: true,
      expiresAt: new Date('2024-12-31'),
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'WELCOME5',
      type: 'FIXED_AMOUNT',
      value: 5,
      minAmount: 20,
      usageLimit: 100,
      isActive: true,
      expiresAt: new Date('2024-12-31'),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${await prisma.category.count()} categories`);
  console.log(`   - ${await prisma.product.count()} products`);
  console.log(`   - ${await prisma.user.count()} users`);
  console.log(`   - ${await prisma.coupon.count()} coupons`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });