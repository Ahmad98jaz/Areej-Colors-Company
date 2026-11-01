import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaTiktok, FaSnapchat, FaFacebookF, FaPhone, FaBars, FaXmark, FaLocationDot, FaEnvelope } from 'react-icons/fa6'
import { SITE, SERVICES } from '../config/site'

const NAV = [['/', 'الرئيسية'], ['about.html', 'من نحن'], ['services', 'خدماتنا'], ['portfolio', 'أعمالنا'], ['testimonials', 'آراء العملاء'], ['faq', 'الأسئلة الشائعة'], ['contact', 'تواصل معنا']]

export function Social() {
  const L = [[SITE.wa, FaWhatsapp, 'واتساب'], [SITE.social.instagram, FaInstagram, 'انستغرام'], [SITE.social.facebook, FaFacebookF, 'فيسبوك'], [SITE.social.tiktok, FaTiktok, 'تيك توك'], [SITE.social.snapchat, FaSnapchat, 'سناب شات']]
  return (
    <div className="flex gap-3">
      {L.map(([h, I, l]) => (
        <a key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-ink"><I /></a>
      ))}
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false), [solid, setSolid] = useState(false), { pathname } = useLocation()
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    setOpen(false)
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid || open ? 'bg-ink/95 py-2 shadow-lux backdrop-blur' : 'py-4'}`}>
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <img src="/logo.png" alt="شعار أريج الألوان" width="40" height="40" className="h-10 w-10 object-contain" />أريج <span className="text-gold">الألوان</span>
          </Link>
          <nav aria-label="القائمة الرئيسية" className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col bg-ink/95 p-5 lg:static lg:flex lg:flex-row lg:bg-transparent lg:p-0`}>
            {NAV.map(([id, t]) => <a key={id} href={id === '/' ? '/' : id.endsWith('.html') ? `/${id}` : `/#${id}`} className="px-3 py-2 text-white/85 transition hover:text-gold">{t}</a>)}
          </nav>
          <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !px-5 !py-2 text-sm sm:inline-flex"><FaWhatsapp /> اطلب استشارة</a>
          <button className="text-2xl text-white lg:hidden" aria-label="القائمة" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <FaXmark /> : <FaBars />}</button>
        </div>
      </header>

      <main className="pb-14 md:pb-0"><Outlet /></main>

      <footer className="bg-ink pb-20 pt-16 text-white/75 md:pb-8">
        <div className="container-x grid gap-10 md:grid-cols-3">
          <div><h3 className="mb-4 text-xl font-bold text-gold">أريج الألوان</h3><p className="mb-5">نصمم لك الفخامة وننفذها بأعلى معايير الجودة لتعكس ذوقكم الرفيع.</p><Social /></div>
          <div><h3 className="mb-4 text-xl font-bold text-gold">روابط سريعة</h3><ul className="space-y-2">
            {NAV.slice(0, 4).map(([id, t]) => <li key={id}><a href={id === '/' ? '/' : id.endsWith('.html') ? `/${id}` : `/#${id}`} className="hover:text-gold">{t}</a></li>)}
            {SERVICES.map((s) => <li key={s.key}><Link to={`/${s.path}`} className="hover:text-gold">{s.name}</Link></li>)}
          </ul></div>
          <div><h3 className="mb-4 text-xl font-bold text-gold">اتصل بنا</h3><ul className="space-y-3">
            {SITE.phones.map((p) => <li key={p} className="flex items-center gap-2"><FaPhone className="text-gold" /><a href={`tel:+${p}`} dir="ltr" className="hover:text-gold">+{p}</a></li>)}
            <li className="flex items-center gap-2"><FaEnvelope className="text-gold" />{SITE.email}</li>
            <li className="flex items-center gap-2"><FaLocationDot className="text-gold" />{SITE.address}</li>
          </ul></div>
        </div>
        <p className="mt-12 text-center text-sm">© {new Date().getFullYear()} {SITE.legal}</p>
      </footer>

      <a href={SITE.wa} target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا على واتساب" className="fixed bottom-20 left-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-3xl text-white shadow-lux transition hover:scale-110 md:bottom-6"><FaWhatsapp /></a>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 md:hidden">
        <a href={`tel:+${SITE.phones[0]}`} className="flex items-center justify-center gap-2 bg-ink py-3 font-bold text-white"><FaPhone className="text-gold" /> اتصل الآن</a>
        <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25d366] py-3 font-bold text-white"><FaWhatsapp /> واتساب</a>
      </div>
    </>
  )
}
