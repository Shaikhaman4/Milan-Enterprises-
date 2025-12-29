const fs = require('fs');
const path = require('path');

console.log('🔍 CleanCare Backend Setup Checker\n');

// Check Node.js version
console.log('📋 System Information:');
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}\n`);

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
} else {
  console.log('❌ .env file missing - copy from .env.example');
}

// Check if uploads directory exists
const uploadsPath = path.join(__dirname, '..', 'uploads');
if (fs.existsSync(uploadsPath)) {
  console.log('✅ uploads directory exists');
  
  // Check subdirectories
  const productsPath = path.join(uploadsPath, 'products');
  const categoriesPath = path.join(uploadsPath, 'categories');
  
  if (fs.existsSync(productsPath)) {
    const productFiles = fs.readdirSync(productsPath).filter(f => f !== '.gitkeep');
    console.log(`✅ products directory exists (${productFiles.length} files)`);
  } else {
    console.log('❌ uploads/products directory missing');
  }
  
  if (fs.existsSync(categoriesPath)) {
    console.log('✅ categories directory exists');
  } else {
    console.log('❌ uploads/categories directory missing');
  }
} else {
  console.log('❌ uploads directory missing');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules missing - run npm install');
}

// Check if dist directory exists (for built files)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log('✅ dist directory exists (built files)');
} else {
  console.log('ℹ️  dist directory missing (will be created on build)');
}

// Check package.json
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json exists');
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log(`   Project: ${pkg.name}`);
    console.log(`   Version: ${pkg.version}`);
  } catch (e) {
    console.log('❌ package.json is invalid JSON');
  }
} else {
  console.log('❌ package.json missing');
}

console.log('\n🔧 Recommended Setup Commands:');
console.log('1. npm install');
console.log('2. cp .env.example .env');
console.log('3. Edit .env with your database credentials');
console.log('4. npm run setup');
console.log('5. npm run dev');

console.log('\n📚 For detailed setup instructions, see SETUP.md');