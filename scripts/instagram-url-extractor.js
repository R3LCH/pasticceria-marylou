/**
 * Instagram Photo URL Extractor for Pasticceria Mary Lou
 * 
 * This extracts URLs - you'll download them with a different method
 * 
 * PASTE IN ZEN BROWSER CONSOLE (F12 → Console)
 * On: https://www.instagram.com/pasticceriamarylou/
 */

(async function() {
  console.clear();
  console.log('%c🍰 Pasticceria Mary Lou - Instagram URL Extractor', 'font-size: 18px; font-weight: bold; color: #d97706;');
  
  // Scroll to load posts
  console.log('\n📜 Scrolling to load posts...');
  for (let i = 0; i < 5; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 1500));
  }
  window.scrollTo(0, 0);
  console.log('✅ Loaded\n');
  
  // Extract image URLs
  const urls = [];
  document.querySelectorAll('img[src*="cdninstagram"]').forEach(img => {
    const src = img.src;
    if (!src.includes('profile_pic') && !src.includes('s150x150') && !src.includes('s320x320')) {
      // Get highest quality version
      const cleanUrl = src
        .replace(/\/s\d+x\d+\//, '/')
        .replace(/\/c\d+\.\d+\.\d+\.\d+\//, '/')
        .split('?')[0];
      
      if (!urls.includes(cleanUrl)) {
        urls.push(cleanUrl);
      }
    }
  });
  
  console.log(`%c✅ Found ${urls.length} photo URLs`, 'font-size: 14px; font-weight: bold; color: #16a34a;');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Create a downloadable text file with URLs
  const urlText = urls.slice(0, 30).join('\n');
  const blob = new Blob([urlText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'instagram-urls.txt';
  a.click();
  
  console.log('📄 Downloaded: instagram-urls.txt to your Downloads folder');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Also copy to clipboard
  navigator.clipboard.writeText(urlText).then(() => {
    console.log('📋 URLs also copied to clipboard!');
  });
  
  // Display URLs
  console.log('%cPhoto URLs:', 'font-weight: bold;');
  urls.slice(0, 30).forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('%c📝 Next: Download photos using wget/curl', 'font-size: 14px; font-weight: bold;');
  console.log('\nSee instructions below...\n');
  
  window.instagramUrls = urls.slice(0, 30);
  
  return { count: urls.length, urls: window.instagramUrls };
})();
