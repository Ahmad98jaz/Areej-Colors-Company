import { useState } from 'react'
import { FaWhatsapp, FaCamera } from 'react-icons/fa6'
import { SITE } from '../config/site'

export default function ContactForm() {
  const [f, setF] = useState({ name: '', phone: '', service: '', msg: '' })
  const [files, setFiles] = useState([]), [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    if (!f.name.trim() || !f.phone.trim()) return setErr('الرجاء إدخال الاسم الكامل ورقم الجوال')
    setErr('')
    const t = `مرحباً، أريد التواصل معكم 🏡\n\n👤 الاسم: ${f.name}\n📞 الجوال: ${f.phone}\n` + (f.service ? `🛠️ الخدمة: ${f.service}\n` : '') + (f.msg ? `📝 التفاصيل: ${f.msg}\n` : '') + (files.length ? `📎 سيتم إرفاق ${files.length} صورة\n` : '')
    if (files.length && navigator.canShare?.({ files })) { try { await navigator.share({ text: t, files }); return } catch {} }
    window.open(`${SITE.wa}?text=${encodeURIComponent(t)}`, '_blank', 'noopener')
  }
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input className="field" aria-label="الاسم الكامل" placeholder="الاسم الكامل" value={f.name} onChange={set('name')} required />
      <input className="field" aria-label="رقم الجوال" placeholder="رقم الجوال" type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} required />
      <select className="field" aria-label="نوع الخدمة" value={f.service} onChange={set('service')}>
        <option value="">نوع الخدمة المطلوبة</option>
        {['تصميم داخلي', 'تصميم خارجي', 'إشراف هندسي', 'تنفيذ'].map((s) => <option key={s}>{s}</option>)}
      </select>
      <textarea className="field min-h-28" aria-label="تفاصيل المشروع" placeholder="تفاصيل المشروع..." value={f.msg} onChange={set('msg')} />
      <label className="field flex cursor-pointer items-center gap-3 text-black/60">
        <FaCamera className="text-gold" /> {files.length ? `تم اختيار ${files.length} صورة ✓` : 'أرفق صور للمساحة (اختياري)'}
        <input type="file" accept="image/*" multiple hidden onChange={(e) => setFiles([...e.target.files])} />
      </label>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button className="btn-gold w-full"><FaWhatsapp /> إرسال عبر واتساب</button>
    </form>
  )
}
