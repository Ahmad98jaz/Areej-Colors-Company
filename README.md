# أريج الألوان — React + Tailwind + SCSS

موقع مكتب أريج الألوان للتصميم الداخلي والخارجي (Static Prerender لأفضل SEO).

## التشغيل
    npm install
    npm run dev        # تطوير
    npm run build      # يبني مجلد dist/ الجاهز للرفع على cPanel
    npm run preview    # معاينة النسخة المبنية

## أين أعدّل؟
كل البيانات (الأرقام، العنوان، الخدمات، الأسئلة، رابط الخريطة) في: `src/config/site.js`
(الدومين الحالي: https://design.areejcolors.sa)

## الصور
محوّلة مسبقاً إلى WebP داخل `public/images`. لإضافة صور جديدة: ضع المجلدات الأصلية في `source-images/` ثم `npm run images`.

## النشر (cPanel)
1. `npm run build`
2. ارفع محتوى `dist/` كاملاً (مع `.htaccess`) إلى مجلد `design.areejcolors.sa`.
3. لا تحذف ملف التحقق `google0a0e5f3160123638.html` ولا مجلد `.well-known`.
