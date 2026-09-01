// التهيئة الآمنة لأيقونات Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

function toggleAppTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
        localStorage.setItem('nexora_theme', 'light');
    } else {
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
        localStorage.setItem('nexora_theme', 'dark');
    }
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

if (localStorage.getItem('nexora_theme') === 'light') {
    document.body.classList.add('light-mode');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
}

// دالة تدوير وتقليب بطاقة المنتج
function toggleCardFlip(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.toggle('flipped');
    }
}

// مصفوفة التقييمات التلقائية المحدثة (بدون نجوم لضمان رسمية الواجهة)
const masterReviewsList = [
    { name: "نورة السبيعي", comment: "تعبت من الحسابات المشتركة وكل شوي يخرجني بالنص! الحمد لله تفعل على حسابي الشخصي (البريد الإلكتروني) وسرعة التفعيل ما أخذت 5 دقائق. خصوصية وراحة بال." },
    { name: "منيرة القحطاني", comment: "أخيرًا كملت المسلسل بدون ما يغير أحد الباسوورد علي أو يخرب سجلي! التفعيل رسمي وعلى حسابي الشخصي مباشرة." },
    { name: "أريج الشمري", comment: "أفضل متجر يتعامل باحترافية، كنت متخوفة من التفعيل بس طلع سريع وشغال زي الفل وبدون أي إعلانات مزعجة." },
    { name: "فهد العتيبي", comment: "عرض اليوم الوطني رهيب! السعر 55 ريال واشتغال فوري على حسابي الشخصي (البريد الإلكتروني) مع ضمان حقيقي طوال المدة." },
    { name: "ريم المطيري", comment: "أحلى شيء إن السجل خاص بي ومحد يشاركني الملفات، والتفعيل صار بثواني أول ما دفعت. شكراً لكم على المصداقية." },
    { name: "سارة الشهري", comment: "بعد معاناة طويلة مع تقطيع الشاشات المشتركة، الاشتراك على حسابي الشخصي أطلق خيار سويته. مشاهدة Full HD واستقرار تام." },
    { name: "طيف الغامدي", comment: "تعامل راقي جداً والتفعيل فوري. أهم شيء عندي الخصوصية وتنزيل الحلقات أوفلاين، وكل شي شغال ممتاز." },
    { name: "خالد الدوسري", comment: "سرعة التفعيل تدرس! الخدمة رسمية على حسابي الشخصي وراحت عقدة الخروج المفاجئ وتجاوز عدد المتابعين." },
    { name: "شهد الخالدي", comment: "أول مرة أربط على حسابي الشخصي (البريد الإلكتروني) وندمت إني ما سويتها من زمان. راحة تامة من حوسة الحسابات المشتركة وتغير الرمز." },
    { name: "وجدان الحربي", comment: "خدمة العملاء ممتازة وساعدوني بالتفعيل مباشرة. الحساب سريع، ممتاز، وبدون أي إعلانات مزعجة." },
    { name: "محمد المالكي", comment: "الاشتراك رسمي ومضمون 100%. تم التفعيل على البريد الإلكتروني وربطته على شاشة الصالة والجوال بدون أي مشاكل." },
    { name: "ابتسام الزهراني", comment: "تجربة ممتازة جداً. التفعيل على الحساب الشخصي خلاني اتابع مسلسلاتي بخصوصية كاملة وبدون إزعاج." },
    { name: "عبدالله الشمري", comment: "سرعة استجابة الدعم الفني وتطبيق التفعيل سريع جداً. شكراً متجر نيكسورا على مصداقيتكم." },
    { name: "عنود السهلي", comment: "أفضل متجر لتفعيل شاهد VIP. السعر ممتاز في عرض اليوم الوطني والخدمة رسمية طوال 3 أشهر." },
    { name: "فيصل العسيري", comment: "خدمة ممتازة، تم ربط الحساب فوراً واستفدت من جودة Full HD بدون إعلانات." },
    { name: "هيا الدوسري", comment: "جربت متاجر كثيرة قبل بس هذا المتجر الوحيد اللي يفعل رسمي على حسابك الشخصي (البريد الإلكتروني) مباشرة وبدون أي تعقيد." },
    { name: "سعود القحطاني", comment: "التقسيط عبر تابي وتمارا يسر العملية جداً، والخدمة جودتها عالية وبدون تقطيع." },
    { name: "مشاعل العنزي", comment: "تفعيل سريع وسلس، والضمان حقيقي طول فترة الاشتراك. أنصح بالتعامل معهم وبقوة." }
];

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let shuffledReviews = shuffleArray([...masterReviewsList]);
let reviewPointer = 0;

function rotateSingleReview() {
    const card = document.getElementById('reviewBarCard');
    const textEl = document.getElementById('reviewBarText');
    const authorEl = document.getElementById('reviewBarAuthor');

    if (!card || !textEl || !authorEl) return;

    card.style.opacity = '0';

    setTimeout(() => {
        const currentItem = shuffledReviews[reviewPointer % shuffledReviews.length];
        textEl.innerText = `"${currentItem.comment}"`;
        authorEl.innerHTML = `<span>${currentItem.name}</span> — <span class="verified-label">(عميل موثق)</span>`;
        card.style.opacity = '1';
        reviewPointer++;
    }, 400);
}

function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) element.classList.add('active');
}

function openPolicyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePolicyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

let selectedGateway = '';
function openGatewayModal(plan, gateway) {
    selectedGateway = gateway;
    const gwLabel = gateway === 'tabby' ? 'تابي (Tabby)' : 'تمارا (Tamara)';
    
    const titleEl = document.getElementById('modalPlanTitle');
    const gwTitleEl = document.getElementById('installmentGatewayTitle');
    
    if (titleEl) titleEl.innerText = `تقسيط عرض اليوم الوطني عبر ${gwLabel}`;
    if (gwTitleEl) gwTitleEl.innerText = `جدول دفعات الأقساط عبر ${gwLabel} على 4 دفعات:`;
    
    document.getElementById('mPrice1').innerText = '14 ر.س';
    document.getElementById('mPrice2').innerText = '14 ر.س';
    document.getElementById('mPrice3').innerText = '14 ر.س';
    document.getElementById('mPrice4').innerText = '14 ر.س';
    document.getElementById('modalTotalSum').innerText = '56 ريال';

    openPolicyModal('installmentModal');
}

function proceedToWhatsAppInstallment() {
    closePolicyModal('installmentModal');
    const phone = "966551040375";
    const gw = selectedGateway === 'tabby' ? 'تابي (Tabby)' : 'تمارا (Tamara)';
    const prod = 'اشتراك شاهد VIP (3 أشهر) - عرض اليوم الوطني';
    const payToday = '14';
    const total = '56';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط: ${prod}\nعبر الخدمة: ${gw}\nدفعة اليوم: ${payToday} ريال\nالإجمالي على 4 دفعات: ${total} ريال\n\nيرجى تزويدي برابط الدفع والتفعيل المباشر.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// تشغيل تدوير التقييمات فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    rotateSingleReview();
    setInterval(rotateSingleReview, 5000);
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};
