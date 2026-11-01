import { useEffect, useState } from 'react'
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import gallery from '../data/gallery.json'
import { CATEGORIES } from '../config/site'

export const img = (slug, n, sm) => `/images/${slug}/${n}${sm ? '-sm' : ''}.webp`

export default function Gallery({ slug, onClose }) {
  const cat = CATEGORIES.find((c) => c.slug === slug), list = gallery[slug] || []
  const [i, setI] = useState(null)
  const step = (d) => setI((x) => (x + d + list.length) % list.length)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const k = (e) => {
      if (e.key === 'Escape') i === null ? onClose() : setI(null)
      if (i !== null && e.key === 'ArrowLeft') step(1)
      if (i !== null && e.key === 'ArrowRight') step(-1)
    }
    window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k) }
  }, [i])
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/95 p-5" role="dialog" aria-modal="true" aria-label={cat.title}>
      <button onClick={onClose} aria-label="إغلاق" className="fixed left-5 top-5 z-10 text-3xl text-white hover:text-gold"><FaXmark /></button>
      <h2 className="mb-8 mt-6 text-center text-2xl font-bold text-gold">{cat.title}</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3">
        {list.map((n, k) => (
          <button key={n} onClick={() => setI(k)} className="aspect-square overflow-hidden rounded-xl">
            <img src={img(slug, n, true)} alt={`${cat.alt} في الرياض - أريج الألوان (${k + 1})`} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
      {i !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={() => setI(null)}>
          <button onClick={() => setI(null)} aria-label="إغلاق" className="absolute left-5 top-5 text-3xl text-white"><FaXmark /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="السابق" className="absolute right-4 text-3xl text-white hover:text-gold"><FaChevronRight /></button>
          <img src={img(slug, list[i])} alt={`${cat.alt} في الرياض - أريج الألوان (${i + 1})`} onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-[90vw] rounded-lg object-contain" />
          <button onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="التالي" className="absolute left-4 text-3xl text-white hover:text-gold"><FaChevronLeft /></button>
          <span className="absolute bottom-5 text-sm text-white/70">{i + 1} / {list.length}</span>
        </div>
      )}
    </div>
  )
}
