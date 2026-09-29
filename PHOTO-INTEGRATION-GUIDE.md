# Photo Integration Guide

## Overview
The website is built with placeholder images (`picsum.photos`). Replace them with real photos from your Instagram and Facebook accounts.

## Where Photos Are Used

### 1. Hero Section (`src/components/sections/Hero.tsx`)
- **What:** Large hero image (full viewport)
- **Current:** `https://picsum.photos/1920/1080?random=1`
- **Recommended:** Beautiful wide shot of your best pastries, croissants, or the display counter
- **Size:** 1920×1080px (landscape)

### 2. Chi Siamo (`src/components/sections/ChiSiamo.tsx`)
- **What:** Small image showing the pasticceria atmosphere
- **Current:** `https://picsum.photos/800/600?random=2`
- **Recommended:** Interior photo, bar area, or your working space
- **Size:** 800×600px
- **CRITICAL:** Must be different from all other sections

### 3. I Nostri Dolci (`src/components/sections/Dolci.tsx`)
- **What:** Grid of 6 product photos
- **Current:** `https://picsum.photos/800/600?random=3,4,5,6,7,8`
- **Recommended:** 
  - Cornetti
  - Pastries display
  - Individual dolci
  - Colazione setup
  - Vitrina shot
  - Special pastries
- **Size:** 800×600px each
- **CRITICAL:** Each photo unique, not used anywhere else

### 4. Produzione Fresca (`src/components/sections/ProduzioneFresca.tsx`)
- **What:** 2 fresh production photos
- **Current:** `https://picsum.photos/800/600?random=9,10`
- **Recommended:**
  - Fresh cornetti coming out
  - Morning production
- **Size:** 800×600px each
- **CRITICAL:** Different from Hero, Chi Siamo, and Dolci photos

### 5. Torte su Ordinazione (`src/components/sections/Torte.tsx`)
- **What:** 3 custom cake photos
- **Current:** `https://picsum.photos/800/600?random=11,12,13`
- **Recommended:**
  - Birthday cake
  - Special occasion cake
  - Custom decorated cake
- **Size:** 800×600px each
- **CRITICAL:** Must be cakes only, not used in Gallery

### 6. Gallery (`src/components/sections/Gallery.tsx`)
- **What:** 12 photos across 4 categories
- **Current:** `https://picsum.photos/800/600?random=14-25`
- **Categories:**
  - **Dolci** (3 photos)
  - **Torte** (3 photos)
  - **Colazione** (3 photos)
  - **Pasticceria** (3 photos)
- **Size:** 800×600px each
- **CRITICAL:** All 12 photos must be unique and NOT used in any other section

## Photo Sources

### Instagram
- Profile: https://www.instagram.com/pasticceriamarylou/
- Download your best photos from recent posts

### Facebook
- Page: https://www.facebook.com/pasticceriamarylouscalea/?locale=it_IT
- Use photo albums and posts

### Google Maps
- Business: https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9
- Download customer photos if appropriate

## How to Replace Photos

### Option 1: Direct Replacement (Simple)
1. Prepare 27 unique photos (see breakdown above)
2. Name them descriptively:
   ```
   hero.jpg
   chi-siamo.jpg
   dolci-1.jpg, dolci-2.jpg, ..., dolci-6.jpg
   produzione-1.jpg, produzione-2.jpg
   torte-1.jpg, torte-2.jpg, torte-3.jpg
   gallery-dolci-1.jpg, gallery-dolci-2.jpg, gallery-dolci-3.jpg
   gallery-torte-1.jpg, gallery-torte-2.jpg, gallery-torte-3.jpg
   gallery-colazione-1.jpg, gallery-colazione-2.jpg, gallery-colazione-3.jpg
   gallery-pasticceria-1.jpg, gallery-pasticceria-2.jpg, gallery-pasticceria-3.jpg
   ```
3. Create folder: `public/images/`
4. Copy all photos there
5. Edit each component file and replace `picsum.photos` URLs with `/pasticceria-marylou/images/[filename].jpg`

### Option 2: Using Instagram CDN (Advanced)
Real Instagram photo URLs were captured:
```
https://scontent-arn2-1.cdninstagram.com/v/t51.71878-15/491456633_1721174565105136_5664471470032977571_n.jpg?...
https://scontent-arn2-1.cdninstagram.com/v/t51.71878-15/605476256_2116083925834792_3963758337563373893_n.jpg?...
https://scontent-arn2-1.cdninstagram.com/v/t51.71878-15/645704703_2417306748699327_2749943294010232656_n.jpg?...
https://scontent-arn2-1.cdninstagram.com/v/t51.75761-15/497374153_17931391154045784_7262271997489173008_n.jpg?...
```

**Warning:** Instagram CDN URLs expire and require authentication parameters. Only use for temporary testing.

## Photo Requirements

### Technical
- **Format:** JPEG or WebP
- **Size:** 800×600px minimum (1920×1080 for hero)
- **Quality:** High quality, well-lit, sharp focus
- **Optimization:** Compress before upload (use tinypng.com or similar)

### Content
- **No duplicates:** Each photo used only once across entire site
- **Professional:** Good lighting, clean composition
- **Appetizing:** Products look fresh and attractive
- **Authentic:** Real Pasticceria Mary Lou products only

## Verification Checklist

Before deployment:
- [ ] 27 unique photos prepared
- [ ] All photos properly sized and compressed
- [ ] Hero image is landscape (1920×1080)
- [ ] No photo appears twice on the site
- [ ] All images placed in `public/images/`
- [ ] All component files updated with new paths
- [ ] Build succeeds: `npm run build`
- [ ] Preview looks correct: `npm run preview`
- [ ] Deploy: `git push` (auto-deploys to GitHub Pages)

## Current Site Status

**Live URL:** https://r3lch.github.io/pasticceria-marylou/

The site is fully functional with placeholder images. Once you replace the photos, simply:
1. Commit changes: `git add . && git commit -m "Add real photos"`
2. Push: `git push`
3. GitHub Pages will automatically rebuild and deploy in ~2 minutes

## Need Help?

The website is production-ready except for photos. All functionality works:
- ✅ Language switching (IT/EN)
- ✅ Mobile responsive
- ✅ WhatsApp/Call buttons
- ✅ Google Maps integration
- ✅ Smooth animations
- ✅ Gallery with category filters

Contact your developer if you need assistance with photo integration.
