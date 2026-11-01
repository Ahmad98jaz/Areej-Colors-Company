import { Link } from 'react-router-dom'
import { FaWhatsapp, FaPhone, FaCircleCheck } from 'react-icons/fa6'
import Seo from '../components/Seo'
import { img } from '../components/Gallery'
import { SITE, ABOUT } from '../config/site'

export default function About() {
  const url = `${SITE.url}/${ABOUT.path}`
  const ld = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: ABOUT.name, item: url }] }]
  return (
    <>
      <Seo path={`/${ABOUT.path}`} title={ABOUT.title} description={ABOUT.desc} ld={ld} />
      <section className="bg-ink pb-16 pt-36 text-center text-white">
        <nav aria-label="مسار التنقل" className="mb-4 text-sm text-white/60"><Link to="/" className="hover:text-gold">الرئيسية</Link> / <span className="text-gold">{ABOUT.name}</span></nav>
        <h1 className="container-x text-3xl font-bold md:text-5xl">من نحن</h1>
      </section>
      <section className="section">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold text-gold">شركة أريج الألوان — شريكك في التصميم الداخلي بالرياض</h2>
            <p className="mb-6 leading-loose text-black/70">مكتب أريج الألوان هو كيان هندسي متخصص في خلق فضاءات سكنية وتجارية تجمع بين الفن الخالص والوظيفة العملية، لتعكس ذوقكم الرفيع.</p>
            <ul className="mb-8 space-y-3">
              {['دقة متناهية في المواعيد والتنفيذ.', 'ابتكار هندسي يناسب الميزانية والمساحة.', 'إشراف ميداني يضمن أعلى جودة للمواد.'].map((t) => <li key={t} className="flex items-center gap-3"><FaCircleCheck className="text-gold" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href={SITE.wa} target="_blank" rel="noopener noreferrer" className="btn-gold"><FaWhatsapp /> اطلب استشارة مجانية</a>
              <a href={`tel:+${SITE.phones[0]}`} className="btn-gold !bg-ink !text-white"><FaPhone /> اتصل الآن</a>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lux">
            <img src={img('living', 1)} alt="شركة أريج الألوان للتصميم الداخلي في الرياض" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  )
}
