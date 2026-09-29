/**
 * Instagram Photo Downloader for Pasticceria Mary Lou
 * 
 * INSTRUCTIONS:
 * 1. Open https://www.instagram.com/pasticceriamarylou/ in your Zen Browser (logged in)
 * 2. Open DevTools (F12)
 * 3. Go to Console tab
 * 4. Paste this entire script and press Enter
 * 5. It will download 27 high-quality photos automatically
 * 
 * Photos will be saved to your Downloads folder
 */

(async function downloadInstagramPhotos() {
  console.log('🍰 Pasticceria Mary Lou - Instagram Photo Downloader');
  console.log('Starting download process...\n');

  // Helper to download a single photo
  async function downloadPhoto(url, filename) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
      
      console.log(`✅ Downloaded: ${filename}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed: ${filename}`, error);
      return false;
    }
  }

  // Helper to wait between downloads
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all posts from the page
  const posts = [];
  
  // Method 1: Try to find image elements
  const images = document.querySelectorAll('img[src*="cdninstagram"]');
  console.log(`Found ${images.length} images on page`);
  
  images.forEach((img, index) => {
    const src = img.src;
    // Get the highest quality version
    const highQualitySrc = src
      .replace(/\/(s\d+x\d+|c\d+\.\d+\.\d+\.\d+)\//, '/') // Remove size modifiers
      .replace(/\?.*$/, ''); // Remove query params
    
    if (src.includes('cdninstagram.com') && !src.includes('profile_pic')) {
      posts.push({
        url: highQualitySrc,
        filename: `marylou-${String(index + 1).padStart(2, '0')}.jpg`
      });
    }
  });

  console.log(`\n📸 Found ${posts.length} photos to download`);
  
  if (posts.length === 0) {
    console.log('\n⚠️  No photos found. Make sure you\'re on https://www.instagram.com/pasticceriamarylou/');
    console.log('Try scrolling down to load more posts, then run this script again.');
    return;
  }

  // Limit to 27 photos for our site
  const photosToDownload = posts.slice(0, 27);
  console.log(`\n🚀 Downloading ${photosToDownload.length} photos...`);
  console.log('Check your Downloads folder\n');

  // Download photos with delay to avoid rate limiting
  for (let i = 0; i < photosToDownload.length; i++) {
    const photo = photosToDownload[i];
    await downloadPhoto(photo.url, photo.filename);
    
    // Wait 500ms between downloads
    if (i < photosToDownload.length - 1) {
      await wait(500);
    }
  }

  console.log(`\n✨ Download complete!`);
  console.log(`\n📁 Photos saved to your Downloads folder as marylou-01.jpg through marylou-${photosToDownload.length}.jpg`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Create folder: pasticceria-marylou/public/images/`);
  console.log(`2. Move downloaded photos there`);
  console.log(`3. Follow PHOTO-INTEGRATION-GUIDE.md to update components`);

})();

/*
 * ALTERNATIVE METHOD: Manual photo collection
 * 
 * If the above script doesn't work:
 * 
 * 1. Go to https://www.instagram.com/pasticceriamarylou/
 * 2. Click each post
 * 3. Right-click the photo → "Save Image As..."
 * 4. Save as marylou-01.jpg, marylou-02.jpg, etc.
 * 5. Collect 27 unique, high-quality photos
 * 
 * Photo requirements:
 * - 1 hero (landscape, 1920x1080 preferred)
 * - 1 chi-siamo interior/atmosphere shot
 * - 6 dolci (pastries, cornetti, display)
 * - 2 produzione (fresh baking)
 * - 3 torte (cakes only)
 * - 12 gallery (mix across categories)
 * 
 * NO DUPLICATES across sections!
 */
