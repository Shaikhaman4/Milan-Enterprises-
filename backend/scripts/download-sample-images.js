const fs = require('fs-extra');
const https = require('https');
const path = require('path');

// Sample product images from Unsplash
const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'floor-cleaner-citrus.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'hardwood-floor-polish.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'dishwash-liquid-lavender.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'heavy-duty-degreaser.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'power-toilet-cleaner.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'all-purpose-surface-spray.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'eco-refill-pack.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'fabric-softener-concentrate.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    filename: 'microfiber-cleaning-cloths.jpg'
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath);
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function downloadSampleImages() {
  console.log('📸 Downloading sample product images...');
  
  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
  await fs.ensureDir(uploadsDir);
  
  try {
    for (const image of sampleImages) {
      const filepath = path.join(uploadsDir, image.filename);
      
      // Skip if file already exists
      if (await fs.pathExists(filepath)) {
        console.log(`⏭️  Skipped: ${image.filename} (already exists)`);
        continue;
      }
      
      await downloadImage(image.url, filepath);
    }
    
    console.log('🎉 All sample images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

// Run if called directly
if (require.main === module) {
  downloadSampleImages();
}

module.exports = { downloadSampleImages };