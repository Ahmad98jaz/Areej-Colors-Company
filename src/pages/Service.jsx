import { Link } from 'react-router-dom'
import { FaWhatsapp, FaPhone, FaCircleCheck } from 'react-icons/fa6'
import Seo from '../components/Seo'
import { img } from '../components/Gallery'
import { SITE, CATEGORIES } from '../config/site'

export default function Service({ s }) {
  const url = `${SITE.url}/${s.path}`
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: s.h1, description: s.desc, url, provider: { '@id': `${SITE.url}/#business` }, areaServed: { '@type': 'City', name: 'الرياض' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: s.name, item: url }] },
  ]
  const cta = (
    <div className="flex flex-wrap gap-4">
      <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="btn-gold"><FaWhatsapp /> اطلب استشارة مجانية</a>
      <a href={`tel:+${SITE.phones[0]}`} className="btn-gold !bg-ink !text-white"><FaPhone /> اتصل الآن</a>
    </div>
  )
  return (
    <>
      <Seo path={`/${s.path}`} title={s.title} description={s.desc} ld={ld} />
      <section className="bg-ink pb-16 pt-36 text-center text-white">
        <nav aria-label="مسار التنقل" className="mb-4 text-sm text-white/60"><Link to="/" className="hover:text-gold">الرئيسية</Link> / <span className="text-gold">{s.name}</span></nav>
        <h1 className="container-x text-3xl font-bold md:text-5xl">{s.h1}</h1>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-5">
          <div className="space-y-5 leading-loose text-black/75 md:col-span-3">{s.intro.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="md:col-span-2"><ul className="card space-y-4">{s.points.map((p) => <li key={p} className="flex gap-3"><FaCircleCheck className="mt-1 shrink-0 text-gold" />{p}</li>)}</ul><div className="mt-6">{cta}</div></div>
        </div>
      </section>

      <section className="section bg-cream !pt-16">
        <div className="container-x">
          <h2 className="section-title">{s.sub}</h2>
          <div className="grid gap-6 md:grid-cols-3">{s.items.map(([t, d]) => <article key={t} className="card"><h3 className="mb-2 text-xl font-bold text-gold">{t}</h3><p className="text-black/70">{d}</p></article>)}</div>
        </div>
      </section>

      {s.cats.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="section-title">{s.worksTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.cats.map((slug) => { const c = CATEGORIES.find((x) => x.slug === slug); return (
                <a key={slug} href="/#portfolio" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={img(slug, c.cover, true)} alt={c.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-5 text-lg font-bold text-white">{c.label}</span>
                </a>) })}
            </div>
            <div className="mt-10 text-center"><a href="/#portfolio" className="btn-gold">استعرض معرض الأعمال الكامل</a></div>
          </div>
        </section>
      )}
      <section className="bg-ink py-14 text-center text-white"><div className="container-x"><h2 className="mb-6 text-2xl font-bold">جاهزون لبدء مشروعك؟</h2><div className="flex justify-center">{cta}</div></div></section>
    </>
  )
}
