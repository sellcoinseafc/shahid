lucide.createIcons();

// 1. تبديل الوضع الليلي / النهاري
function toggleAppTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.setAttribute('data-lucide', 'moon');
        localStorage.setItem('nexora_theme', 'light');
    } else {
        themeIcon.setAttribute('data-lucide', 'sun');
        localStorage.setItem('nexora_theme', 'dark');
    }
    lucide.createIcons();
}

if (localStorage.getItem('nexora_theme') === 'light') {
    document.body.classList.add('light-mode');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
}

// 2. دالة إظهار الباقة المختارة حصرياً بعد الضغط عليها فقط
function selectAndShowPlan(planType) {
    const card3m = document.getElementById('prod-3m');
    const card1y = document.getElementById('prod-1y');
    const btn3m = document.getElementById('btnPlan3m');
    const btn1y = document.getElementById('btnPlan1y');

    if (planType === '3m') {
        card3m.classList.add('visible-plan');
        card1y.classList.remove('visible-plan');

        btn3m.classList.add('active-selected');
        btn1y.classList.remove('active-selected');

        card3m.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (planType === '1y') {
        card1y.classList.add('visible-plan');
        card3m.classList.remove('visible-plan');

        btn1y.classList.add('active-selected');
        btn3m.classList.remove('active-selected');

        card1y.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 3. حركة تبديل أيقونات الأجهزة للأزرار كل 2.2 ثانية
const devicesList = ['tv', 'smartphone', 'tablet', 'laptop', 'gamepad-2'];
let deviceIndex = 0;
setInterval(() => {
    deviceIndex = (deviceIndex + 1) % devicesList.length;
    const currentIcon = devicesList[deviceIndex];

    const box1 = document.getElementById('deviceBox1');
    const box2 = document.getElementById('deviceBox2');

    if (box1 && box2) {
        box1.innerHTML = `<i data-lucide="${currentIcon}" size="18"></i>`;
        box2.innerHTML = `<i data-lucide="${currentIcon}" size="18"></i>`;
        lucide.createIcons();
    }
}, 2200);

// 4. مصفوفة العبارات التسويقية
const promoQuotes = [
    "💸 وفّر كاش! اشتراك سنة بـ 180 ريال فقط بدل 450 ريال.",
    "🔥 عرض الـ 3 أشهر بـ 60 ريال فقط بدل 115 ريال.. وفر واستمتع!",
    "⚡ اشترك الآن بـ 180 ريال للسنة كاملة ووفر أكثر من نصف القيمة.",
    "🎯 وفر دراهمك.. 3 أشهر بـ 60 ريال فقط بدلاً من 130 ريال.",
    "💎 استمتع بأفضل الأسعار وبخصم 50% عند اشتراكك في باقة السنة بـ 180 ريال!",
    "🔒 تفعيل رسمي 100% على إيميلك الشخصي في شاهد.. لا مشاركة بعد اليوم.",
    "🛡️ حسابك ملكك بالكامل.. سجل مشاهدة خاص وخصوصية مطلقة.",
    "🔑 بدون ملفات مشتركة ولا إزعاج.. الحساب يُفعّل على بياناتك أنت."
];

function shuffleQuotes(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let randomizedQuotes = shuffleQuotes(promoQuotes);
let currentQuoteIndex = 0;
const textEl = document.getElementById('promoTickerText');
if (textEl) textEl.innerText = randomizedQuotes[0];

setInterval(() => {
    if (!textEl) return;
    textEl.classList.add('fade-out');
    setTimeout(() => {
        currentQuoteIndex++;
        if (currentQuoteIndex >= randomizedQuotes.length) {
            randomizedQuotes = shuffleQuotes(promoQuotes);
            currentQuoteIndex = 0;
        }
        textEl.innerText = randomizedQuotes[currentQuoteIndex];
        textEl.classList.remove('fade-out');
    }, 300);
}, 10000);

// 5. محاكي شاهد التلقائي المتناوب
const simCursor = document.getElementById('simCursor');
const simCard = document.getElementById('simulatorCard');
const step1 = document.getElementById('simStep1');
const stepSubInfo = document.getElementById('simStepSubInfo');
const step2 = document.getElementById('simStep2');
const step3 = document.getElementById('simStep3');
const step4 = document.getElementById('simStep4');
const btnLogin = document.getElementById('simBtnLogin');
const btnContinue = document.getElementById('simBtnContinue');
const targetProfile = document.getElementById('simTargetProfile');
const targetShow = document.getElementById('simTargetShow');
const stageBadge = document.getElementById('simStageBadge');
const topText = document.getElementById('cinematicTopText');
const timelineProgress = document.getElementById('timelineProgress');

const subCardTitle = document.getElementById('subCardTitle');
const subCardDuration = document.getElementById('subCardDuration');
const subCardExpire = document.getElementById('subCardExpire');
const subCardWarranty = document.getElementById('subCardWarranty');

let isYearPlan = true;

function getRelativePos(element) {
    const cardRect = simCard.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    return {
        top: elRect.top - cardRect.top + (elRect.height / 2),
        left: elRect.left - cardRect.left + (elRect.width / 2)
    };
}

function runAutoTour() {
    if (!simCard || !simCursor) return;
    if (isYearPlan) {
        subCardTitle.innerText = 'شاهد VIP (سنة كاملة) 👑';
        subCardDuration.innerText = '12 شهر (سنة كاملة)';
        subCardExpire.innerText = '14 أغسطس 2027';
        subCardWarranty.innerText = 'ضمان 12 شهر كاملة';
    } else {
        subCardTitle.innerText = 'شاهد VIP (3 أشهر) ⚡';
        subCardDuration.innerText = '3 أشهر (90 يوم)';
        subCardExpire.innerText = '14 نوفمبر 2026';
        subCardWarranty.innerText = 'ضمان 90 يوم كاملة';
    }

    isYearPlan = !isYearPlan;

    step1.classList.add('active');
    stepSubInfo.classList.remove('active');
    step2.classList.remove('active');
    step3.classList.remove('active');
    step4.classList.remove('active');
    timelineProgress.style.width = '0%';
    
    stageBadge.innerText = '1. تسجيل الدخول';
    stageBadge.style.color = 'var(--shahid-teal)';
    
    simCursor.style.opacity = '1';
    simCursor.style.top = '30px';
    simCursor.style.left = '30px';

    setTimeout(() => {
        const pos = getRelativePos(btnLogin);
        simCursor.style.top = `${pos.top}px`;
        simCursor.style.left = `${pos.left}px`;
    }, 800);

    setTimeout(() => {
        simCursor.classList.add('clicking');
        btnLogin.classList.add('active-click');
    }, 1800);

    setTimeout(() => {
        simCursor.classList.remove('clicking');
        btnLogin.classList.remove('active-click');
        step1.classList.remove('active');
        stepSubInfo.classList.add('active');
        stageBadge.innerText = '2. تأكيد تفعيل الاشتراك ✅';
        
        simCursor.style.top = '40px';
        simCursor.style.left = '50%';
    }, 2300);

    setTimeout(() => {
        const pos = getRelativePos(btnContinue);
        simCursor.style.top = `${pos.top}px`;
        simCursor.style.left = `${pos.left}px`;
    }, 3600);

    setTimeout(() => {
        simCursor.classList.add('clicking');
        btnContinue.classList.add('active-click');
    }, 4400);

    setTimeout(() => {
        simCursor.classList.remove('clicking');
        btnContinue.classList.remove('active-click');
        stepSubInfo.classList.remove('active');
        step2.classList.add('active');
        stageBadge.innerText = '3. اختيار ملفك الخاص';
        
        simCursor.style.top = '40px';
        simCursor.style.left = '20%';
    }, 4900);

    setTimeout(() => {
        const pos = getRelativePos(targetProfile);
        simCursor.style.top = `${pos.top}px`;
        simCursor.style.left = `${pos.left}px`;
    }, 5500);

    setTimeout(() => {
        simCursor.classList.add('clicking');
        targetProfile.classList.add('active-click');
    }, 6300);

    setTimeout(() => {
        simCursor.classList.remove('clicking');
        targetProfile.classList.remove('active-click');
        step2.classList.remove('active');
        step3.classList.add('active');
        stageBadge.innerText = '4. مسلسلات شاهد VIP';
        
        simCursor.style.top = '40px';
        simCursor.style.left = '30%';
    }, 6800);

    setTimeout(() => {
        const pos = getRelativePos(targetShow);
        simCursor.style.top = `${pos.top}px`;
        simCursor.style.left = `${pos.left}px`;
    }, 7500);

    setTimeout(() => {
        simCursor.classList.add('clicking');
        targetShow.classList.add('active-click');
    }, 8200);

    setTimeout(() => {
        simCursor.classList.remove('clicking');
        targetShow.classList.remove('active-click');
        simCursor.style.opacity = '0';
        
        step3.classList.remove('active');
        step4.classList.add('active');
        stageBadge.innerText = '5. مشاهدة سينمائية بدون إعلانات ✨';
        stageBadge.style.color = 'var(--accent-gold)';

        timelineProgress.style.width = '35%';

        if (topText) {
            topText.innerText = '🚫 بدون أي فواصل إعلانية نهائياً';
            setTimeout(() => {
                topText.innerText = '🔒 حسابك ملكك وخاص بك وحدك';
            }, 2400);
        }
    }, 8700);

    setTimeout(() => {
        runAutoTour();
    }, 14500);
}

window.addEventListener('load', () => {
    setTimeout(runAutoTour, 500);
});

// 6. مصفوفة التقييمات
const allReviewsList = [
    "نورة القحطاني|ما كملت 5 دقايق إلا والاشتراك مفعل على إيميلي، سرعة خيالية وتجاوب يفتح النفس!",
    "ريان الحربي|أكتب تقييمي بعد شهر كامل من الاستخدام.. الحساب شغال مثل العسل وبدون أي انقطاع، والأهم إنه على إيميلي الشخصي.",
    "سارة العتيبي|ما شاء الله تبارك الله، ما توقعت بهالسرعة أبد! تفعل الحساب رسمي فوراً.",
    "شهد الدوسري|أسرع تفعيل شفته بحياتي، رسمي وعلى إيميلي الخاص بدون أي تعقيد.",
    "عبدالمحسن المطيري|ما كملت 5 دقائق بعد إتمام الطلب إلا والتفعيل واصلني، سرعة خيالية ما شاء الله.",
    "ريم الشهري|سرعة تفعيل تشكرون عليها، طلبت وتفعل وأنا جالسة أجهز قهوتي للمسلسل.",
    "منيرة العسيري|أهم شي عندي إنه تفعل على إيميلي الشخصي، راحة وخصوصية تامة بدون مشاركة أحد.",
    "نواف الغامدي|أهم نقطة عندي الخصوصية والتفعيل على حسابي الخاص، خدمة ممتازة وأمان عالي."
];

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderMarqueeReviews() {
    const track = document.getElementById('reviewsMarqueeTrack');
    if(!track) return;
    const shuffled = shuffleArray(allReviewsList);
    let html = '';
    shuffled.forEach(item => {
        const [name, text] = item.split('|');
        html += `
            <div class="mini-review-card">
                <div class="mini-review-top">
                    <div class="mini-review-avatar">${name.charAt(0)}</div>
                    <div class="mini-review-meta">
                        <span class="mini-review-author">${name}</span>
                        <span class="mini-review-stars">★★★★★</span>
                    </div>
                </div>
                <p class="mini-review-text">"${text}"</p>
            </div>
        `;
    });
    track.innerHTML = html + html;
}
renderMarqueeReviews();

function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) element.classList.add('active');
}

function openPolicyModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePolicyModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

let selectedInstallmentPlan = '', selectedInstallmentGateway = 'tabby';
function openGatewayModal(plan, gateway) {
    selectedInstallmentPlan = plan;
    selectedInstallmentGateway = gateway;
    const modalTitle = document.getElementById('modalPlanTitle');
    const gwLabel = gateway === 'tabby' ? 'تابي (Tabby)' : 'تمارا (Tamara)';
    document.getElementById('installmentGatewayTitle').innerText = `جدول دفعات الأقساط عبر ${gwLabel} على 4 أشهر:`;
    
    if (plan === '3m') {
        modalTitle.innerText = `تقسيط شاهد VIP (3 أشهر) عبر ${gwLabel}`;
        document.getElementById('mPrice1').innerText = '18 ر.س';
        document.getElementById('mPrice2').innerText = '18 ر.س';
        document.getElementById('mPrice3').innerText = '18 ر.س';
        document.getElementById('mPrice4').innerText = '18 ر.س';
        document.getElementById('modalTotalSum').innerText = '72 ريال';
    } else {
        modalTitle.innerText = `تقسيط شاهد VIP (سنة كاملة) عبر ${gwLabel}`;
        document.getElementById('mPrice1').innerText = '55 ر.س';
        document.getElementById('mPrice2').innerText = '55 ر.س';
        document.getElementById('mPrice3').innerText = '55 ر.س';
        document.getElementById('mPrice4').innerText = '55 ر.س';
        document.getElementById('modalTotalSum').innerText = '220 ريال';
    }
    openPolicyModal('installmentModal');
}

function proceedToWhatsAppInstallment() {
    closePolicyModal('installmentModal');
    const phone = "966551040375";
    const gw = selectedInstallmentGateway === 'tabby' ? 'تابي' : 'تمارا';
    const prod = selectedInstallmentPlan === '3m' ? 'اشتراك شاهد VIP (3 أشهر)' : 'اشتراك شاهد VIP (سنة كاملة)';
    const payToday = selectedInstallmentPlan === '3m' ? '18' : '55';
    const total = selectedInstallmentPlan === '3m' ? '72' : '220';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط: ${prod}\nبوابة التقسيط: ${gw}\nمبلغ دفعة اليوم: ${payToday} ريال\nالإجمالي: ${total} ريال\n\nيرجى تزويدي برابط الدفع والتفعيل المباشر.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function openDetailsModal(plan) {
    const title = document.getElementById('detailsModalTitle');
    const mainTitle = document.getElementById('detailsPlanMainTitle');
    const warrantyText = document.getElementById('detailsWarrantyText');
    const btnWrapper = document.getElementById('modalRmzBtnWrapper');

    if (plan === '1y') {
        title.innerHTML = '<i data-lucide="sparkles" size="18"></i> تفاصيل باقة شاهد VIP (سنة كاملة - 180 ر.س)';
        mainTitle.innerText = '✨ اشتراك شاهد VIP (ترفيهي) — سنة كاملة (12 شهر)';
        warrantyText.innerHTML = 'اشتراك رسمي ونظامي 100% يضمن لك الاستمرارية طوال <strong>12 شهراً كاملاً (ضمان شامل)</strong>.';
        btnWrapper.innerHTML = `
            <button 
                data-rmz-product="61070" 
                data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" 
                data-rmz-theme="auto" 
                data-rmz-config='{"hideQuantity":true,"hideCoupon":true}'>
                اطلب باقة السنة الآن (180 ر.س)
            </button>
        `;
    } else {
        title.innerHTML = '<i data-lucide="tv" size="18"></i> تفاصيل باقة شاهد VIP (3 أشهر - 60 ر.س)';
        mainTitle.innerText = '✨ اشتراك شاهد VIP (ترفيهي) — 3 أشهر (90 يوم)';
        warrantyText.innerHTML = 'اشتراك رسمي ونظامي 100% يضمن لك الاستمرارية طوال <strong>90 يوماً (ضمان شامل)</strong>.';
        btnWrapper.innerHTML = `
            <button 
                data-rmz-product="29956" 
                data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" 
                data-rmz-theme="auto" 
                data-rmz-config='{"hideQuantity":true,"hideCoupon":true}'>
                اطلب باقة 3 أشهر الآن (60 ر.س)
            </button>
        `;
    }
    lucide.createIcons();
    openPolicyModal('detailsModal');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
