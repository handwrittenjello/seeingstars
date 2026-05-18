import { readdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const thumbDir = join(projectRoot, 'src/assets/images/thumbs');
const fullDir = join(projectRoot, 'src/assets/images/full');
const jsonPath = join(projectRoot, 'public/data/gallery.json');

// Load existing gallery.json if it exists
function loadExistingData() {
  if (existsSync(jsonPath)) {
    try {
      const content = readFileSync(jsonPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn('⚠️  Existing gallery.json is invalid, creating new one');
      return { images: [], videos: [] };
    }
  }
  return { images: [], videos: [] };
}

// Extract object name from filename (tries to parse common naming patterns)
function guessObjectName(filename) {
  const name = basename(filename, '.jpg');
  
  // Common patterns: m31, ngc7000, ic434, etc.
  const messierMatch = name.match(/m(\d+)/i);
  if (messierMatch) return `M${messierMatch[1]}`;
  
  const ngcMatch = name.match(/ngc[\s-_]?(\d+)/i);
  if (ngcMatch) return `NGC ${ngcMatch[1]}`;
  
  const icMatch = name.match(/ic[\s-_]?(\d+)/i);
  if (icMatch) return `IC ${icMatch[1]}`;
  
  // Convert kebab/snake case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Main function
function generateGalleryJson() {
  console.log('🔍 Scanning for images...\n');
  
  // Check if directories exist
  if (!existsSync(thumbDir)) {
    console.error('❌ Thumbs directory not found:', thumbDir);
    console.log('   Run: npm run optimize');
    process.exit(1);
  }
  
  if (!existsSync(fullDir)) {
    console.error('❌ Full directory not found:', fullDir);
    console.log('   Run: npm run optimize');
    process.exit(1);
  }
  
  // Get all image files
  const thumbFiles = readdirSync(thumbDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();
  
  const fullFiles = readdirSync(fullDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();
  
  if (thumbFiles.length === 0) {
    console.error('❌ No images found in thumbs directory');
    console.log('   Add images to src/assets/images/originals/ and run: npm run optimize');
    process.exit(1);
  }
  
  console.log(`Found ${thumbFiles.length} thumbnail(s)`);
  console.log(`Found ${fullFiles.length} full-size image(s)\n`);
  
  // Load existing data
  const existingData = loadExistingData();
  const existingImages = existingData.images || [];
  const existingVideos = existingData.videos || [];
  
  // Create a map of existing entries by filename
  const existingMap = new Map();
  existingImages.forEach(img => {
    const filename = basename(img.thumb);
    existingMap.set(filename, img);
  });
  
  // Process images
  const newImages = [];
  const updatedCount = { existing: 0, new: 0 };
  
  thumbFiles.forEach(thumbFile => {
    const fullFile = thumbFile; // Should match after optimization
    const fullPath = join(fullDir, fullFile);
    
    // Check if full-size version exists
    if (!existsSync(fullPath)) {
      console.warn(`⚠️  Missing full-size for: ${thumbFile}`);
      return;
    }
    
    // Check if this image already exists in JSON
    if (existingMap.has(thumbFile)) {
      // Keep existing entry (preserves user's manual edits)
      const existing = existingMap.get(thumbFile);
      newImages.push(existing);
      updatedCount.existing++;
      console.log(`✓ Kept existing: ${existing.title}`);
    } else {
      // Create new entry with smart placeholders
      const objectName = guessObjectName(thumbFile);

      const newEntry = {
        thumb: `/assets/images/thumbs/${thumbFile}`,
        full: `/assets/images/full/${fullFile}`,
        title: objectName,
        subtitle: `[UPDATE: Add catalog number & distance]`
      };

      newImages.push(newEntry);
      updatedCount.new++;
      console.log(`+ Added new: ${objectName} → ${thumbFile}`);
    }
  });
  
  // Build final data structure
  const galleryData = {
    images: newImages,
    videos: existingVideos // Preserve existing videos
  };
  
  // Write to JSON file
  const jsonContent = JSON.stringify(galleryData, null, 2);
  writeFileSync(jsonPath, jsonContent, 'utf8');
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Gallery JSON generated successfully!');
  console.log('='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   - Existing entries preserved: ${updatedCount.existing}`);
  console.log(`   - New entries added: ${updatedCount.new}`);
  console.log(`   - Total images: ${newImages.length}`);
  console.log(`   - Videos: ${existingVideos.length}`);
  console.log('\n📝 Next steps:');
  console.log(`   1. Open: ${jsonPath}`);
  console.log(`   2. Search for "[UPDATE:" and fill in the subtitle`);
  console.log(`   3. Run: npm run dev (to preview changes)\n`);
}

// Run the generator
try {
  generateGalleryJson();
} catch (error) {
  console.error('❌ Error generating gallery JSON:', error);
  process.exit(1);
}