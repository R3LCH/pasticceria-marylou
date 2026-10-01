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

The favicon uses the existing Mary Lou logo in cream on a black square.
`public/favicon.png` is linked through Vite's `%BASE_URL%` so it works both
under GitHub Pages' subpath and at the IONOS domain root; `favicon.ico` is
provided for browsers that request it by convention.

## IONOS managed webspace

The client's hosting account uses SFTP/SSH host
`access-5021551119.webspace-host.com`, port `22`, user `su5371`. Mary Lou is
uploaded to `/public/marylou` in SFTP (`/home/www/public/marylou` in SSH).
This is a managed webspace, not a VPS; IONOS manages the OS and SSH service.
An earlier upload remains in a separate personal hosting account; do not
confuse the two when configuring the domain or updating files.

Build the portable site without the GitHub Pages path:

```bash
npm run build -- --base=./
```

Upload the contents of `dist/` to the site's directory, excluding `CNAME`, and
upload `deploy/ionos.htaccess` as `.htaccess` alongside `index.html`. Upload only
the static build, not repository sources, credentials, or `node_modules`.
Keep directories at `0755` and public files at `0644`; recovery archives outside
`public` use directory `0700` and file `0600`.

The client hosting account has a recovery archive at
`/backups/marylou-20261001T180956Z.tar.gz`, outside the web root. This is a
manual, same-provider copy, not an automated or off-site backup. Keep a fresh
private archive before replacing a deployed release.

The Apache configuration disables directory listing and access to hidden and
service files, and sets CSP, anti-framing, MIME-sniffing, referrer, permissions,
and short-lived HSTS headers. CSP permits Google Fonts, the Google Maps iframe,
and inline styles required by GSAP. `.htaccess` also redirects HTTP and `www`
to `https://pasticceriamarylou.it/`. Back up and test the configuration before
changing it: a bad rule can take the site offline.

### Live domain

`pasticceriamarylou.it` and the client hosting are in the same IONOS account.
The site lives in `/public/marylou`; the domain is connected to this directory.
IONOS manages its SSL Starter Wildcard certificate. On 2026-10-01, HTTPS on
the bare hostname served the site; HTTP and both `www` variants redirected to
HTTPS on the bare hostname. HTML, JS, CSS, images, Italian locale data and
security headers were retrieved from the live host; access to `.htaccess` and
`.env` and directory listing was denied. Four sampled live assets matched
local build bytes. HSTS uses `max-age=86400` without `includeSubDomains` while
the new hosting is monitored.

The first upload of 32 files was verified by SFTP readback. IONOS web hosting
must assign the domain to the directory containing `index.html`; DNS records
for the website are assigned by IONOS when connected to webspace. Keep
MX/SPF/DKIM/DMARC/autodiscover mail records intact and do not point DNS to the
SFTP/SSH IP. The SFTP hostname is not a website URL. For future deployments,
upload a portable build (`npm run build -- --base=./`) and the matching
`deploy/ionos.htaccess`, then verify both hostnames and static resources.

IONOS instructions: https://www.ionos.com/help/domains/connecting-a-domain-to-your-webspace/connecting-a-domain-to-a-webspace-directory/

Passwords remain in the local Secret Service and are never stored in the
repository or uploaded. For SSH, verify the server fingerprint independently
before trusting it on another machine. The first connection observed
`ssh-ed25519 SHA256:1gx2w8Rtv3wCgi7Jh8myf/KVd72cRQbow03UP8P095Q`.
