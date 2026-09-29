# Deployment & Hosting Guide

## Current Deployment

### GitHub Pages (Active)
**Live URL:** https://r3lch.github.io/pasticceria-marylou/

**Automatic Deployment:**
- Every `git push` to `main` branch triggers automatic rebuild
- Deploy workflow: `.github/workflows/deploy.yml`
- Build time: ~2 minutes
- Status: https://github.com/R3LCH/pasticceria-marylou/actions

**Custom Domain Setup (Optional):**
The site is configured for custom domain: `pasticceriamarylou.it`

To activate:
1. Buy domain (e.g., pasticceriamarylou.it)
2. Add DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: r3lch.github.io
   ```
3. In GitHub repo settings → Pages → Custom domain, enter: `pasticceriamarylou.it`
4. Wait 24-48 hours for DNS propagation

## Alternative Hosting Options

### Option 1: Netlify (Recommended for Custom Domain)

**Advantages:**
- Free tier with custom domain
- Faster build times
- Better analytics
- Form handling
- Serverless functions

**Setup:**
1. Create account: https://netlify.com
2. Connect GitHub repo: `R3LCH/pasticceria-marylou`
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)
4. Environment variables: (none needed)
5. Deploy!

**Custom Domain on Netlify:**
- Add domain in Netlify dashboard
- Follow DNS instructions (simpler than GitHub Pages)
- Automatic HTTPS

### Option 2: Vercel

**Advantages:**
- Zero-config deployment
- Excellent performance
- Free SSL
- Analytics

**Setup:**
1. Create account: https://vercel.com
2. Import Git repository: `R3LCH/pasticceria-marylou`
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

### Option 3: Cloudflare Pages

**Advantages:**
- Fast global CDN
- Free unlimited bandwidth
- DDoS protection

**Setup:**
1. Create account: https://pages.cloudflare.com
2. Connect GitHub
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

### Option 4: Traditional Hosting (cPanel/FTP)

For traditional web hosting (e.g., Aruba, SiteGround, HostGator):

**Build locally:**
```bash
cd pasticceria-marylou
npm install
npm run build
```

**Upload:**
1. Contents of `dist/` folder → public_html (or www, httpdocs)
2. Ensure `.htaccess` for SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

**Important for custom hosting:**
If deploying to domain root (not subfolder), update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/', // Change from '/pasticceria-marylou/'
  plugins: [react()],
})
```
Then rebuild: `npm run build`

## SEO & Meta Tags

The site is ready for SEO. Update `index.html`:

```html
<title>Pasticceria Mary Lou - Scalea | Dolci Artigianali e Caffè</title>
<meta name="description" content="Pasticceria artigianale a Scalea, Calabria. Dolci freschi, cornetti, torte su ordinazione e caffè italiano. Via Tommaso Campanella 58." />
<meta property="og:title" content="Pasticceria Mary Lou - Scalea" />
<meta property="og:description" content="Pasticceria artigianale a Scalea. Dolci freschi, cornetti, torte su ordinazione." />
<meta property="og:image" content="https://r3lch.github.io/pasticceria-marylou/og-image.jpg" />
<meta property="og:url" content="https://r3lch.github.io/pasticceria-marylou/" />
```

Add `public/og-image.jpg` (1200×630px) - best product photo for social sharing.

## Analytics Setup

### Google Analytics
1. Create property: https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel (for ads)
1. Create pixel: https://business.facebook.com
2. Get Pixel ID
3. Add to `index.html` before `</head>`:
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

## Performance Optimization

Already optimized:
- ✅ Vite code splitting
- ✅ CSS minification
- ✅ Asset compression (gzip)
- ✅ Google Fonts preconnect
- ✅ Lazy loading (GSAP ScrollTrigger)

**Further optimization:**
1. Compress images (tinypng.com) before adding to `public/images/`
2. Use WebP format for photos
3. Add `loading="lazy"` to `<img>` tags outside viewport

## Maintenance

**Update content:**
1. Edit translation files: `public/locales/it/translation.json`, `public/locales/en/translation.json`
2. Commit: `git commit -am "Update content"`
3. Push: `git push` (auto-deploys)

**Update photos:**
1. Replace files in `public/images/`
2. Commit and push (see PHOTO-INTEGRATION-GUIDE.md)

**Check deployment status:**
- GitHub Actions: https://github.com/R3LCH/pasticceria-marylou/actions
- Live site: https://r3lch.github.io/pasticceria-marylou/

## Troubleshooting

**Build fails:**
```bash
npm install
npm run build
```
Check error messages. Common issues:
- Missing dependencies: `npm install`
- TypeScript errors: check files in `src/`
- Vite config: ensure `base` path is correct

**Site doesn't load:**
- Check GitHub Actions for deployment status
- Verify GitHub Pages is enabled in repo settings
- Clear browser cache

**Photos don't show:**
- Verify files exist in `public/images/`
- Check paths in component files (case-sensitive)
- Rebuild: `npm run build && git push`

**WhatsApp/phone links don't work:**
- Verify numbers in `src/constants/contact.ts`
- Test on mobile device (desktop may not have WhatsApp)

## Support

**Repository:** https://github.com/R3LCH/pasticceria-marylou
**Documentation:** 
- README.md (development)
- PHOTO-INTEGRATION-GUIDE.md (photos)
- This file (deployment)

For technical issues, create GitHub issue: https://github.com/R3LCH/pasticceria-marylou/issues
