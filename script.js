if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

function toggleDescription(containerId, btnElement) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');

    const span = btnElement.querySelector('span');
    if (span) {
        span.innerText = isExpanded ? 'عرض تفاصيل أقل ↑' : 'عرض المزيد من التفاصيل ↓';
    }
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
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

if (localStorage.getItem('nexora_theme') === 'light') {
    document.body.classList.add('light-mode');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
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
    const gwLabel = gateway === 'tamara' ? 'تمارا (Tamara)' : 'تابي (Tabby)';
    
    const titleEl = document.getElementById('modalPlanTitle');
    const gwTitleEl = document.getElementById('installmentGatewayTitle');
    
    if (titleEl) titleEl.innerText = `تقسيط الخدمة عبر ${gwLabel}`;
    if (gwTitleEl) gwTitleEl.innerText = `جدول دفعات الأقساط عبر ${gwLabel} على 4 دفعات:`;

    openPolicyModal('installmentModal');
}

function proceedToWhatsAppInstallment() {
    closePolicyModal('installmentModal');
    const phone = "966551040375";
    const gw = selectedGateway === 'tamara' ? 'تمارا (Tamara)' : 'تابي (Tabby)';
    const prod = 'اشتراك شاهد VIP (3 أشهر) - تفعيل على حسابك الشخصي';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط: ${prod}\nعبر الخدمة: ${gw}\nالإجمالي: 56 ريال\n\nيرجى تزويدي برابط الدفع والتفعيل المباشر.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

const masterReviewsList = [
    { name: "نورة السبيعي", comment: "تعبت من الحسابات المشتركة وكل شوي يخرجني بالنص! الحمد لله تفعل على حسابي الشخصي (البريد الإلكتروني) وسرعة التفعيل ما أخذت 5 دقائق. خصوصية وراحة بال." },
    { name: "منيرة القحطاني", comment: "أخيرًا كملت المسلسل بدون ما يغير أحد الباسوورد علي أو يخرب سجلي! التفعيل رسمي وعلى حسابي الشخصي (البريد الإلكتروني) مباشرة." },
    { name: "أريج الشمري", comment: "أفضل متجر يتعامل باحترافية، كنت متخوفة من التفعيل بس طلع سريع وشغال زي الفل وبدون أي إعلانات مزعجة." },
    { name: "فهد العتيبي", comment: "عرض اليوم الوطني رهيب! السعر 55 ريال وااشتغال فوري على حسابي الشخصي (البريد الإلكتروني) مع ضمان حقيقي طوال المدة." },
    { name: "ريم المطيري", comment: "أحلى شيء إن السجل خاص بي ومحد يشاركني الملفات، والتفعيل صار بثواني أول ما دفعت. شكراً لكم على المصداقية." },
    { name: "سارة الشهري", comment: "بعد معاناة طويلة مع تقطيع الشاشات المشتركة، الاشتراك على حسابي الشخصي (البريد الإلكتروني) أطلق خيار سويته. مشاهدة Full HD واستقرار تام." },
    { name: "طيف الغامدي", comment: "تعامل راقي جداً والتفعيل فوري. أهم شيء عندي الخصوصية وتنزيل الحلقات أوفلاين، وكل شي شغال ممتاز." }
];

let reviewPointer = 0;
function rotateSingleReview() {
    const card = document.getElementById('reviewBarCard');
    const textEl = document.getElementById('reviewBarText');
    const authorEl = document.getElementById('reviewBarAuthor');

    if (!card || !textEl || !authorEl) return;
    card.style.opacity = '0';

    setTimeout(() => {
        const currentItem = masterReviewsList[reviewPointer % masterReviewsList.length];
        textEl.innerText = `"${currentItem.comment}"`;
        authorEl.innerHTML = `<span>${currentItem.name}</span> — <span class="verified-label-dark">(عميل موثق ✔️)</span>`;
        card.style.opacity = '1';
        reviewPointer++;
    }, 400);
}

function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) element.classList.add('active');
}

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
