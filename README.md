# Pasticceria Mary Lou

Business card website for **Pasticceria Mary Lou**, a pastry shop in Scalea, Calabria.

- **Address:** Via Tommaso Campanella, 58, 87029 Scalea CS, Italia
- **Phone:** 0985 272108
- **Instagram:** [@pasticceriamarylou](https://www.instagram.com/pasticceriamarylou/)
- **Facebook:** [pasticceriamarylouscalea](https://www.facebook.com/pasticceriamarylouscalea)
- **Maps:** [Open in Google Maps](https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9)

Languages: Italian (primary) and English.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- GSAP + ScrollTrigger
- react-i18next
- GitHub Pages

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck and production build into dist/
npm run preview  # preview the production build
npm run deploy   # build and publish dist/ with gh-pages
```

## GitHub Pages

`vite.config.ts` sets `base` to `/pasticceria-marylou/`. Pushes to `main` deploy through `.github/workflows/deploy.yml`.

In the repository settings, set **Pages → Source** to **GitHub Actions**.

`public/CNAME` is a placeholder (`pasticceriamarylou.it`) for a future custom domain. Remove or replace it before the first deploy if that domain is not configured, otherwise GitHub Pages will look for it.
