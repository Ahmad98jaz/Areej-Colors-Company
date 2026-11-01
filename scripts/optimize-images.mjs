// يحوّل الصور الأصلية إلى WebP (1600px + مصغّرة 640px) ويولّد src/data/gallery.json و og-image.jpg
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
const SRC = process.argv[2] || 'source-images', OUT = 'public/images'
const MAP = { bath: 'bath', living: 'living', majlis: 'majlis', kitchen: 'kitchen', bedroom: 'bedroom', Interfaces: 'facade', landscape: 'landscape' }
const SKIP = { facade: [4, 5] }
const num = (f) => parseInt(f) || 0
const manifest = {}
for (const [dir, slug] of Object.entries(MAP)) {
  const p = path.join(SRC, dir)
  if (!fs.existsSync(p)) continue
  fs.mkdirSync(`${OUT}/${slug}`, { recursive: true })
  manifest[slug] = []
  const files = fs.readdirSync(p).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort((a, b) => num(a) - num(b))
  for (const f of files) {
    const n = num(f)
    if (SKIP[slug]?.includes(n)) continue
    const img = sharp(path.join(p, f)).rotate()
    await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/${slug}/${n}.webp`)
    await img.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${OUT}/${slug}/${n}-sm.webp`)
    manifest[slug].push(n)
    console.log(slug, n)
  }
}
fs.writeFileSync('src/data/gallery.json', JSON.stringify(manifest))
await sharp(path.join(SRC, 'majlis/33.jpg')).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toFile('public/og-image.jpg')
