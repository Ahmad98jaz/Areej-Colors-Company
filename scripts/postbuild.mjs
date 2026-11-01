import fs from 'node:fs'
import { SITE, SERVICES, ABOUT } from '../src/config/site.js'
const d = 'dist', today = new Date().toISOString().slice(0, 10)
// بعض نسخ SSG تُخرج x.html.html: نحافظ على نفس روابط الموقع القديم (x.html)
for (const s of [...SERVICES, ABOUT]) { const a = `${d}/${s.path}.html`; if (fs.existsSync(a)) fs.renameSync(a, `${d}/${s.path}`) }
const urls = [['/', 1, 'weekly'], ['/' + ABOUT.path, 0.7, 'monthly'], ...SERVICES.map((s) => ['/' + s.path, 0.8, 'monthly'])]
fs.writeFileSync(`${d}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, p, c]) => `<url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod><changefreq>${c}</changefreq><priority>${p}</priority></url>`).join('\n')}\n</urlset>\n`)
fs.writeFileSync(`${d}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)
