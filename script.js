// =========================================
// 1. تهيئة مكتبة الأنميشن (AOS)
// =========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// =========================================
// 2. التحكم في قائمة الجوال (Mobile Menu)
// =========================================
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// إغلاق القائمة عند الضغط على أي رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        const icon = menuToggle ? menuToggle.querySelector('i') : null;
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
    });
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener('click', (e) => {
    if (nav && menuToggle && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
    }
});

// =========================================
// 3. سلايدر الخلفية التلقائي (Hero Slider)
// =========================================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

if (slides.length > 1) {
    setInterval(nextSlide, 5000);
}

// =========================================
// 4. إرسال الفورم عبر واتساب (مع دعم إرفاق الصور)
// =========================================
const userImagesInput = document.getElementById('userImages');
const fileUploadText = document.getElementById('fileUploadText');

if (userImagesInput && fileUploadText) {
    userImagesInput.addEventListener('change', () => {
        const count = userImagesInput.files.length;
        fileUploadText.textContent = count > 0
            ? `تم اختيار ${count} صورة ✓`
            : 'أرفق صور للمساحة (اختياري)';
    });
}

async function sendToWhatsApp() {
    const name    = document.getElementById('userName').value.trim();
    const phone   = document.getElementById('userPhone').value.trim();
    const service = document.getElementById('userService').value;
    const message = document.getElementById('userMessage').value.trim();
    const files   = userImagesInput ? userImagesInput.files : [];

    if (!name) {
        alert('الرجاء إدخال الاسم الكامل');
        return;
    }
    if (!phone) {
        alert('الرجاء إدخال رقم الجوال');
        return;
    }

    let text = `مرحباً، أريد التواصل معكم 🏡\n\n`;
    text += `👤 الاسم: ${name}\n`;
    text += `📞 رقم الجوال: ${phone}\n`;
    if (service) text += `🛠️ الخدمة المطلوبة: ${service}\n`;
    if (message) text += `📝 تفاصيل المشروع: ${message}\n`;
    if (files && files.length > 0) text += `📎 سيتم إرفاق ${files.length} صورة للمساحة\n`;

    const waNumber = '966593736902';

    // محاولة استخدام Web Share API لإرفاق الصور مباشرة (مدعومة على أغلب متصفحات الجوال)
    if (files && files.length > 0 && navigator.canShare && navigator.share) {
        try {
            const fileArray = Array.from(files);
            const shareData = { text, files: fileArray };
            if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
                return;
            }
        } catch (err) {
            // في حال إلغاء المستخدم للمشاركة أو عدم الدعم، نكمل بالطريقة الاعتيادية
        }
    }

    const encoded = encodeURIComponent(text);
    const waUrl   = `https://wa.me/${waNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
}

// =========================================
// 5. بيانات معرض الأعمال (Portfolio Data)
// =========================================
const portfolioData = {
    'bath': { 
        title: 'تصميم وتنفيذ الحمامات', 
        imgs: ['bath/1 .jpg', 'bath/2.jpg', 'bath/3.jpg','bath/4.jpg','bath/5.jpg','bath/6.jpg','bath/7.jpg','bath/8.jpg','bath/9.jpg','bath/10.jpg','bath/11.jpg','bath/12.jpg','bath/13.jpg','bath/14 .jpg'] 
    },
    'living': { 
        title: 'تصميم الصالات العصرية', 
        imgs: ['living/1.jpg', 'living/2.jpg', 'living/3.jpg','living/4.jpg','living/5.jpg','living/6.jpg','living/7.jpg','living/8.jpg','living/9.jpg','living/10.jpg','living/11.jpg','living/12.jpg'] 
    },
    'majlis': { 
        title: 'تصميم المجالس الفاخرة', 
        imgs: ['majlis/1.jpg','majlis/2.jpg','majlis/3.jpg','majlis/4.jpg','majlis/5.jpg','majlis/6.jpg','majlis/7.jpg','majlis/8.jpg','majlis/9.jpg','majlis/10.jpg',
            'majlis/11.jpg','majlis/12.jpg','majlis/13.jpg','majlis/14.jpg','majlis/15.jpg','majlis/16.jpg','majlis/17.jpg','majlis/18.jpg','majlis/19.jpg','majlis/20.jpg',
            'majlis/21.jpg','majlis/22.jpg','majlis/23.jpg','majlis/24.jpg','majlis/25.jpg','majlis/26.jpg','majlis/27.jpg','majlis/28.jpg','majlis/29.jpg','majlis/30.jpg',
            'majlis/31.jpg','majlis/32.jpg','majlis/33.jpg','majlis/34.jpg','majlis/35.jpg','majlis/36.jpg','majlis/37.jpg','majlis/38.jpg','majlis/39.jpg','majlis/40.jpg',
            'majlis/41.jpg','majlis/42.jpg','majlis/43.jpg','majlis/44.jpg','majlis/45.jpg','majlis/46.jpg','majlis/47.jpg'
        ] 
    },
    'kitchen': { 
        title: 'مطابخ حديثة وعملية', 
        imgs: ['kitchen/1.jpg','kitchen/2.jpg','kitchen/3.jpg','kitchen/4.jpg','kitchen/5.jpg','kitchen/6.jpg','kitchen/7.jpg','kitchen/8.jpg','kitchen/9.jpg','kitchen/10.jpg','kitchen/11.jpg','kitchen/12.jpg','kitchen/13.jpg','kitchen/14.jpg','kitchen/15.jpg'] 
    },
    'bedroom': { 
        title: 'غرف نوم رئيسية', 
        imgs: ['bedroom/1.jpg', 'bedroom/2.jpg','bedroom/3.jpg','bedroom/4.jpg','bedroom/5.jpg','bedroom/6.jpg','bedroom/7.jpg','bedroom/8.jpg','bedroom/9.jpg','bedroom/10.jpg','bedroom/11.jpg','bedroom/12.jpg',
            'bedroom/13.jpg','bedroom/14.jpg','bedroom/15.jpg','bedroom/16.jpg','bedroom/17.jpg','bedroom/18.jpg','bedroom/19.jpg','bedroom/20.jpg','bedroom/21.jpg','bedroom/22.jpg'
        ] 
    },
    'commercial': { 
        title: 'المشاريع التجارية والمكاتب', 
        imgs: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800'] 
    },
    'facade': { 
        title: 'تصميم واجهات معمارية', 
        imgs: ['Interfaces/1.jpg', 'Interfaces/2.jpg','Interfaces/3.jpg','Interfaces/6.jpg','Interfaces/7.jpg','Interfaces/8.jpg','Interfaces/9.jpg','Interfaces/10.jpg','Interfaces/11.jpg',
            'Interfaces/12.jpg','Interfaces/13.jpg','Interfaces/14.jpg','Interfaces/15.jpg','Interfaces/16.jpg','Interfaces/17.jpg','Interfaces/18.jpg','Interfaces/19.jpg',
            'Interfaces/20.jpg','Interfaces/21.jpg'
        ] 
    },
    'landscape': { 
        title: 'تنسيق الحدائق واللاندسكيب', 
        imgs: ['landscape/1.jpg','landscape/2.jpg','landscape/3.jpg','landscape/4.jpg','landscape/5.jpg','landscape/6.jpg','landscape/7.jpg','landscape/8.jpg','landscape/9.jpg',
            'landscape/10.jpg','landscape/11.jpg','landscape/12.jpg','landscape/13.jpg','landscape/15.jpeg','landscape/16.jpeg'
        ] 
    }
};

// =========================================
// 6. وظائف النافذة المنبثقة (Modal Gallery)
// =========================================
function openGallery(category) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImages = document.getElementById('modalImages');

    if (portfolioData[category]) {
        modalTitle.innerText = portfolioData[category].title;
        const imgs = portfolioData[category].imgs;
        modalImages.innerHTML = imgs
            .map((src, i) => `<div class="modal-img-wrapper"><img src="${src}" alt="Interior Design" loading="lazy" onclick="openLightbox('${src}', ${i}, '${category}')"></div>`)
            .join('');
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        closeGallery();
    }
};

// =========================================
// لايت بوكس (Lightbox)
// =========================================
let currentLightboxCategory = '';
let currentLightboxIndex = 0;

function openLightbox(src, index, category) {
    currentLightboxCategory = category;
    currentLightboxIndex = index;
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    lbImg.src = src;
    lb.style.display = 'flex';
    updateLightboxCounter();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function lightboxPrev() {
    const imgs = portfolioData[currentLightboxCategory].imgs;
    currentLightboxIndex = (currentLightboxIndex - 1 + imgs.length) % imgs.length;
    document.getElementById('lightboxImg').src = imgs[currentLightboxIndex];
    updateLightboxCounter();
}

function lightboxNext() {
    const imgs = portfolioData[currentLightboxCategory].imgs;
    currentLightboxIndex = (currentLightboxIndex + 1) % imgs.length;
    document.getElementById('lightboxImg').src = imgs[currentLightboxIndex];
    updateLightboxCounter();
}

function updateLightboxCounter() {
    const imgs = portfolioData[currentLightboxCategory].imgs;
    document.getElementById('lightboxCounter').innerText = `${currentLightboxIndex + 1} / ${imgs.length}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
        const lb = document.getElementById('lightbox');
        if (lb.style.display === 'flex') {
            if (e.key === 'ArrowLeft')  lightboxNext();
            if (e.key === 'ArrowRight') lightboxPrev();
            if (e.key === 'Escape')     closeLightbox();
        }
    });
});

// =========================================
// 7. تأثيرات الهيدر عند التمرير
// =========================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 5%';
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.padding = '15px 8%';
        header.style.background = 'rgba(18, 18, 18, 0.98)';
    }
});

// =========================================
// 8. أكورديون الأسئلة الشائعة (FAQ)
// =========================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // إغلاق باقي العناصر (أكورديون: عنصر واحد مفتوح في كل مرة)
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});
