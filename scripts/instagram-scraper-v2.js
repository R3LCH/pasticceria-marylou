/**
 * Instagram Photo Scraper for Pasticceria Mary Lou
 * 
 * ===================================================================
 * PASTE THIS IN YOUR ZEN BROWSER CONSOLE (F12 → Console tab)
 * Make sure you're on: https://www.instagram.com/pasticceriamarylou/
 * ===================================================================
 */

(async function() {
  console.clear();
  console.log('%c🍰 Pasticceria Mary Lou Photo Extractor', 'font-size: 20px; font-weight: bold; color: #d97706;');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d97706;');
  console.log('\n📸 Starting photo extraction from Instagram...\n');

  // Wait helper
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Step 1: Scroll to load more posts
  console.log('📜 Step 1: Scrolling to load posts...');
  const initialHeight = document.body.scrollHeight;
  
  for (let i = 0; i < 5; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await wait(1500);
    console.log(`   Scroll ${i + 1}/5...`);
  }
  
  window.scrollTo(0, 0);
  await wait(1000);
  
  const finalHeight = document.body.scrollHeight;
  console.log(`✅ Loaded ${finalHeight > initialHeight ? 'more' : 'initial'} content\n`);

  // Step 2: Find all image URLs
  console.log('🔍 Step 2: Extracting image URLs...');
  
  const imageUrls = new Set();
  
  // Method 1: Find all img elements
  document.querySelectorAll('img[src*="cdninstagram"]').forEach(img => {
    const src = img.src;
    if (!src.includes('profile_pic') && !src.includes('s150x150')) {
      // Get the clean URL without size parameters
      const cleanUrl = src.split('?')[0];
      imageUrls.add(cleanUrl);
    }
  });

  // Method 2: Find all article elements (posts)
  document.querySelectorAll('article img[src*="cdninstagram"]').forEach(img => {
    const src = img.src;
    if (!src.includes('profile_pic')) {
      const cleanUrl = src.split('?')[0];
      imageUrls.add(cleanUrl);
    }
  });

  // Convert to array and take first 30 (we need 27)
  const photos = Array.from(imageUrls).slice(0, 30);
  
  console.log(`✅ Found ${photos.length} high-quality photo URLs\n`);

  if (photos.length === 0) {
    console.error('❌ No photos found! Are you on the Instagram profile page?');
    console.log('\n📝 Make sure you\'re here: https://www.instagram.com/pasticceriamarylou/');
    return;
  }

  // Step 3: Display URLs for manual download
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('%c📋 PHOTO URLs (copy these):', 'font-size: 16px; font-weight: bold; color: #16a34a;');
  console.log('\n');
  
  photos.forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Step 4: Try to download automatically
  console.log('⬇️  Step 3: Attempting automatic download...\n');
  
  let downloadCount = 0;
  
  for (let i = 0; i < Math.min(photos.length, 27); i++) {
    const url = photos[i];
    const filename = `marylou-${String(i + 1).padStart(2, '0')}.jpg`;
    
    try {
      // Fetch the image
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`⚠️  ${filename}: Failed to fetch (${response.status})`);
        continue;
      }
      
      const blob = await response.blob();
      
      // Create download link
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
      
      downloadCount++;
      console.log(`✅ ${filename}`);
      
      // Wait between downloads to avoid rate limiting
      await wait(300);
      
    } catch (error) {
      console.error(`❌ ${filename}: ${error.message}`);
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`%c✨ Download Complete!`, 'font-size: 18px; font-weight: bold; color: #16a34a;');
  console.log(`\n📊 Downloaded: ${downloadCount} photos`);
  console.log(`📁 Location: Check your Downloads folder`);
  console.log(`📝 Files: marylou-01.jpg through marylou-${String(downloadCount).padStart(2, '0')}.jpg`);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('%c📝 Next Steps:', 'font-size: 14px; font-weight: bold;');
  console.log('\n1. Go to your Downloads folder');
  console.log('2. Review the photos');
  console.log('3. Create folder: pasticceria-marylou/public/images/');
  console.log('4. Move the photos there');
  console.log('5. Follow PHOTO-INTEGRATION-GUIDE.md');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Return the URLs array for easy copy-paste
  console.log('\n💡 TIP: Run this to copy all URLs to clipboard:\n');
  console.log('%ccopy(photoUrls);', 'background: #f3f4f6; padding: 8px; border-radius: 4px; font-family: monospace;');
  
  window.photoUrls = photos;
  
  return {
    count: downloadCount,
    total: photos.length,
    urls: photos
  };
})();
