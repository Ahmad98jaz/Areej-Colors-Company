# Areej Colors — Interior Design Website

A responsive, Arabic-first (RTL) website for **Areej Colors**, an interior and exterior design office in Riyadh. Built with React, Tailwind CSS and SCSS, and **prerendered to static HTML** so every page is fully readable by search engines.

**Live site:** https://design.areejcolors.sa

## Features

- Home page with hero slider, services, portfolio, testimonials, FAQ and contact sections
- Standalone pages: About, Interior Design, Exterior Design, Engineering Supervision, Execution
- Portfolio gallery with 7 categories and a keyboard-friendly lightbox
- Contact form that builds a WhatsApp message (with optional image sharing on supported devices)
- Floating WhatsApp button and a sticky call/WhatsApp bar on mobile
- Fully responsive, RTL layout with the self-hosted Cairo font

## SEO

- Static prerendering: each route is generated as its own HTML file at build time
- Per-page `<title>`, meta description, canonical URL, Open Graph and Twitter tags
- JSON-LD structured data: `InteriorDesigner` / `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`
- `sitemap.xml` and `robots.txt` generated automatically on every build
- Original `.html` page URLs preserved, plus `.htaccess` rules for HTTPS, non-www redirect, compression and caching

## Performance

- Images converted to WebP (1600px full size + 640px thumbnails), reducing ~240 MB of originals to ~37 MB
- Lazy loading for below-the-fold images; the hero image loads with high priority
- Scroll animations that never hide content from crawlers when JavaScript is unavailable

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 18, React Router |
| Build / SSG | Vite, vite-react-ssg |
| Styling | Tailwind CSS 3, SCSS (Sass) |
| Icons | react-icons |
| Images | sharp (build script) |

## Project Structure

```
src/
  components/   Layout, Gallery, ContactForm, Seo
  pages/        Home, About, Service
  config/       site.js — all site content and settings
  styles/       main.scss
  data/         gallery.json (generated)
scripts/
  optimize-images.mjs   WebP conversion + gallery manifest
  postbuild.mjs         sitemap.xml, robots.txt, file naming
public/                 images, logo, .htaccess, verification files
```

## Getting Started

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # preview the production build
```

> In development, open the site at the root URL (`http://localhost:5173/`). Direct visits to `.html` pages work on the built site.

## Configuration

Contact details, services, FAQ, testimonials, the Google Maps embed and the site URL all live in `src/config/site.js`. Update that file and rebuild.

## Images

Original photos are not stored in the repo. To add new ones, place the source folders in `source-images/` and run:

```bash
npm run images
```

## Deployment (cPanel)

1. Run `npm run build`
2. Upload the contents of `dist/` (including `.htaccess`) to the site's document root
3. Submit `sitemap.xml` in Google Search Console

## Author

**Ahmad Khashan Jazieh** · [GitHub](https://github.com/Ahmad98jaz)
