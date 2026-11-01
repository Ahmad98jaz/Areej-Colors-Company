import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaStar, FaChevronDown, FaCouch, FaHouse, FaHelmetSafety, FaScrewdriverWrench, FaComments, FaCircleCheck, FaArrowLeft } from 'react-icons/fa6'
import Seo from '../components/Seo'
import Gallery, { img } from '../components/Gallery'
import ContactForm from '../components/ContactForm'
import { Social } from '../components/Layout'
import { SITE, SERVICES, CATEGORIES, FAQ, TESTIMONIALS } from '../config/site'

const ICON = { interior: FaCouch, exterior: FaHouse, supervision: FaHelmetSafety, execution: FaScrewdriverWrench }
const HERO = [['majlis', 33], ['living', 3], ['kitchen', 11]]
const delay = (i) => ({ transitionDelay: `${i * 90}ms` })

export default function Home() {
  const [slide, setSlide] = useState(0), [open, setOpen] = useState(null)
  useEffect(() => { const t = setInterval(() => setSlide((s) => (s + 1) % HERO.length), 5000); return () => clearInterval(t) }, [])
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
  return (
    <>
      <Seo path="/" title="أريج الألوان | تصميم ديكور داخلي وخارجي في الرياض"
        description="مكتب أريج الألوان للتصميم الداخلي والخارجي والإشراف الهندسي في الرياض. نصمم مجالس، غرف نوم، مطابخ، حمامات، وواجهات بأعلى معايير الجودة. استشارة مجانية." ld={[faqLd]} />

      <section id="home" className="relative grid min-h-screen place-items-center overflow-hidden bg-ink">
        {HERO.map(([s, n], i) => (
          <img key={s} src={img(s, n)} alt="" aria-hidden="true" fetchpriority={i === 0 ? 'high' : 'low'} loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
        <div className="container-x relative py-32 text-center text-white">
          <p className="mb-4 font-bold tracking-widest text-gold">تصميم · تنفيذ · إشراف هندسي</p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-snug md:text-6xl">شركة أريج الألوان للتصميم الداخلي والخارجي في الرياض</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">ريادة في تصميم المجالس، غرف النوم، المطابخ، الواجهات المعمارية والإشراف الهندسي المتكامل — استشارة مجانية</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#portfolio" className="btn-gold">استعرض أعمالنا</a>
            <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="btn-outline"><FaWhatsapp /> استشارة مجانية</a>
          </div>
        </div>
      </section>


      <section id="services" className="section">
        <div className="container-x">
          <h2 className="section-title">خدماتنا</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => { const I = ICON[s.key]; return (
              <article key={s.key} className="card reveal" style={delay(i)}>
                <I className="mb-5 text-4xl text-gold" />
                <h3 className="mb-2 text-xl font-bold">{s.name}</h3>
                <p className="mb-5 text-black/65">{s.card}</p>
                <Link to={`/${s.path}`} className="inline-flex items-center gap-2 font-bold text-gold hover:gap-3 transition-all">اقرأ المزيد <FaArrowLeft /></Link>
              </article>) })}
            <article className="card reveal" style={delay(4)}>
              <FaComments className="mb-5 text-4xl text-gold" />
              <h3 className="mb-2 text-xl font-bold">استشارة مجانية</h3>
              <p className="text-black/65">يمكنك زيارة مكتبنا وطلب استشارة مجانية واستعراض الأعمال.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section bg-ink">
        <div className="container-x">
          <h2 className="section-title text-white">معرض أعمالنا</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <button key={c.slug} onClick={() => setOpen(c.slug)} className={`group reveal relative aspect-[4/3] overflow-hidden rounded-2xl ${i === 2 ? 'lg:col-span-2 lg:row-span-1' : ''}`} style={delay(i % 4)} aria-label={`عرض صور ${c.label}`}>
                <img src={img(c.slug, c.cover, true)} alt={c.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-5 text-lg font-bold text-white">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {open && <Gallery slug={open} onClose={() => setOpen(null)} />}

      <section id="testimonials" className="section bg-cream">
        <div className="container-x">
          <h2 className="section-title">آراء عملائنا</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="card reveal" style={delay(i)}>
                <div className="mb-4 flex gap-1 text-gold" aria-label="5 من 5">{[...Array(5)].map((_, k) => <FaStar key={k} />)}</div>
                <blockquote className="leading-loose text-black/75">“{t}”</blockquote>
                <figcaption className="mt-5 font-bold">عميل <span className="font-normal text-black/50">· الرياض</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container-x max-w-3xl">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="faq reveal rounded-xl border border-black/10 bg-white px-6 py-4 open:border-gold">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold">{q}<FaChevronDown className="shrink-0 text-gold transition" /></summary>
                <p className="mt-3 leading-loose text-black/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-cream">
        <div className="container-x">
          <h2 className="section-title">تواصل معنا</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="reveal"><ContactForm /><div className="mt-6 flex justify-center"><Social /></div></div>
            <div className="reveal min-h-80 overflow-hidden rounded-2xl shadow-lux">
              <iframe title="موقع مكتب أريج الألوان على الخريطة" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-80 w-full border-0"
                src={SITE.mapEmbed} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
