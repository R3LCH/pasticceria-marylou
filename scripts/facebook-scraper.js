/**
 * Facebook Photo Scraper for Pasticceria Mary Lou
 * 
 * ===================================================================
 * PASTE THIS IN YOUR ZEN BROWSER CONSOLE (F12 → Console tab)
 * Make sure you're on: https://www.facebook.com/pasticceriamarylouscalea/photos
 * ===================================================================
 */

(async function() {
  console.clear();
  console.log('%c🍰 Pasticceria Mary Lou Photo Extractor (Facebook)', 'font-size: 20px; font-weight: bold; color: #1877f2;');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #1877f2;');
  console.log('\n📸 Starting photo extraction from Facebook...\n');

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Step 1: Scroll to load photos
  console.log('📜 Step 1: Scrolling to load photos...');
  
  for (let i = 0; i < 5; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await wait(2000);
    console.log(`   Scroll ${i + 1}/5...`);
  }
  
  window.scrollTo(0, 0);
  await wait(1000);
  console.log('✅ Content loaded\n');

  // Step 2: Find all photo URLs
  console.log('🔍 Step 2: Extracting photo URLs...');
  
  const imageUrls = new Set();
  
  // Method 1: Find all img elements from Facebook CDN
  document.querySelectorAll('img[src*="fbcdn"]').forEach(img => {
    const src = img.src;
    // Filter for actual photos (not profile pics, icons, etc.)
    if (src.includes('fbcdn.net') && 
        !src.includes('/p50x50/') && 
        !src.includes('/s50x50/') &&
        !src.includes('profile') &&
        img.naturalWidth > 200) {  // Only photos larger than 200px
      imageUrls.add(src);
    }
  });

  // Method 2: Find images in photo grid/album view
  document.querySelectorAll('a[href*="/photo"] img, a[href*="/photos/"] img').forEach(img => {
    const src = img.src;
    if (src.includes('fbcdn.net') && img.naturalWidth > 200) {
      imageUrls.add(src);
    }
  });

  const photos = Array.from(imageUrls).slice(0, 30);
  
  console.log(`✅ Found ${photos.length} photo URLs\n`);

  if (photos.length === 0) {
    console.error('❌ No photos found!');
    console.log('\n📝 Make sure you\'re on the Photos tab:');
    console.log('   https://www.facebook.com/pasticceriamarylouscalea/photos');
    console.log('\n💡 Or try the Posts tab and scroll through posts with photos');
    return;
  }

  // Step 3: Display URLs
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('%c📋 PHOTO URLs:', 'font-size: 16px; font-weight: bold; color: #16a34a;');
  console.log('\n');
  
  photos.forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Step 4: Download
  console.log('⬇️  Step 3: Attempting download...\n');
  
  let downloadCount = 0;
  
  for (let i = 0; i < Math.min(photos.length, 27); i++) {
    const url = photos[i];
    const filename = `marylou-fb-${String(i + 1).padStart(2, '0')}.jpg`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`⚠️  ${filename}: Failed (${response.status})`);
        continue;
      }
      
      const blob = await response.blob();
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
      
      await wait(300);
      
    } catch (error) {
      console.error(`❌ ${filename}: ${error.message}`);
    }
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`%c✨ Download Complete!`, 'font-size: 18px; font-weight: bold; color: #16a34a;');
  console.log(`\n📊 Downloaded: ${downloadCount} photos`);
  console.log(`📁 Location: Downloads folder`);
  console.log(`📝 Files: marylou-fb-01.jpg through marylou-fb-${String(downloadCount).padStart(2, '0')}.jpg`);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('%c📝 Next Steps:', 'font-size: 14px; font-weight: bold;');
  console.log('\n1. Check Downloads folder');
  console.log('2. Combine with Instagram photos');
  console.log('3. Select best 27 total');
  console.log('4. Move to pasticceria-marylou/public/images/');
  console.log('5. Follow PHOTO-INTEGRATION-GUIDE.md');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('\n💡 Copy URLs to clipboard:\n');
  console.log('%ccopy(photoUrls);', 'background: #f3f4f6; padding: 8px; border-radius: 4px; font-family: monospace;');
  
  window.photoUrls = photos;
  
  return {
    count: downloadCount,
    total: photos.length,
    urls: photos
  };
})();
