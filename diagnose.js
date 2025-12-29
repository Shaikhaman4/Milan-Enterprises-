const fs = require('fs');
const path = require('path');

console.log('🔍 CleanCare Project Diagnostic Tool\n');

// Check project structure
console.log('📁 Project Structure:');

const checkPath = (relativePath, description) => {
  const fullPath = path.join(__dirname, relativePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}: ${relativePath}`);
    return true;
  } else {
    console.log(`❌ ${description}: ${relativePath} (missing)`);
    return false;
  }
};

// Frontend checks
console.log('\n🎨 Frontend:');
checkPath('package.json', 'Frontend package.json');
checkPath('next.config.js', 'Next.js config');
checkPath('tailwind.config.js', 'Tailwind config');
checkPath('app', 'App directory');
checkPath('components', 'Components directory');

// Backend checks
console.log('\n🔧 Backend:');
checkPath('backend/package.json', 'Backend package.json');
checkPath('backend/src', 'Backend source');
checkPath('backend/prisma', 'Prisma directory');
checkPath('backend/.env.example', 'Environment template');

const hasBackendEnv = checkPath('backend/.env', 'Environment file');
const hasUploads = checkPath('backend/uploads', 'Uploads directory');

// Node modules checks
console.log('\n📦 Dependencies:');
checkPath('node_modules', 'Frontend node_modules');
checkPath('backend/node_modules', 'Backend node_modules');

// Common issues and solutions
console.log('\n🚨 Common Issues & Solutions:');

if (!hasBackendEnv) {
  console.log('❗ Missing .env file:');
  console.log('   cd backend && cp .env.example .env');
  console.log('   Then edit .env with your database credentials');
}

if (!hasUploads) {
  console.log('❗ Missing uploads directory:');
  console.log('   cd backend && mkdir -p uploads/products uploads/categories');
}

console.log('\n🔧 Setup Commands:');
console.log('Frontend:');
console.log('  npm install');
console.log('  npm run dev');
console.log('\nBackend:');
console.log('  cd backend');
console.log('  npm install');
console.log('  cp .env.example .env  # Edit with your DB credentials');
console.log('  npm run setup');
console.log('  npm run dev');

console.log('\n📋 System Info:');
console.log(`Node.js: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Current directory: ${__dirname}`);

console.log('\n📚 For detailed setup, see SETUP.md');
console.log('💡 If you\'re still having issues, please share the specific error message!');