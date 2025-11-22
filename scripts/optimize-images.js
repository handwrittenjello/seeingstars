import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const inputDir = join(projectRoot, 'src/assets/images/originals');
const thumbDir = join(projectRoot, 'src/assets/images/thumbs');
const fullDir = join(projectRoot, 'src/assets/images/full');

// Create output directories if they don't exist
[thumbDir, fullDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Check if originals directory exists
if (!existsSync(inputDir)) {
  console.log('⚠️  No originals directory found. Creating it...');
  mkdirSync(inputDir, { recursive: true });
  console.log('✓ Created src/assets/images/originals/');
  console.log('  Add your high-res images there and run: npm run optimize');
  process.exit(0);
}

// Process images
const files = readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png|tiff?)$/i.test(f));

if (files.length === 0) {
  console.log('⚠️  No images found in originals directory');
  console.log('  Add .jpg, .png, or .tiff files to src/assets/images/originals/');
  process.exit(0);
}

console.log(`📸 Processing ${files.length} images...\n`);

for (const file of files) {
  const input = join(inputDir, file);
  const outputName = file.replace(/\.(jpg|jpeg|png|tiff?)$/i, '.jpg');

  try {
    // Generate thumbnail (300x300, optimized for web)
    await sharp(input)
      .resize(300, 300, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85, 
        progressive: true,
        mozjpeg: true
      })
      .toFile(join(thumbDir, outputName));

    // Generate optimized full-res (max 2500px width for detail viewing)
    await sharp(input)
      .resize(2500, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 90, 
        progressive: true,
        mozjpeg: true
      })
      .toFile(join(fullDir, outputName));

    console.log(`✓ ${file}`);
  } catch (err) {
    console.error(`✗ Failed to process ${file}:`, err.message);
  }
}

console.log(`\n✅ Optimization complete!`);
console.log(`   Thumbs: ${thumbDir}`);
console.log(`   Full:   ${fullDir}`);