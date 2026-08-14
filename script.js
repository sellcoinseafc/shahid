lucide.createIcons();

// شريط العبارات التسويقية
const promoQuotes = [
    "💸 وفّر كاش! اشتراك سنة بـ 180 ريال فقط بدل 450 ريال.",
    "🔥 عرض الـ 3 أشهر بـ 60 ريال فقط بدل 115 ريال.. وفر واستمتع!",
    "⚡ اشترك الآن بـ 180 ريال للسنة كاملة ووفر أكثر من نصف القيمة.",
    "🔒 تفعيل رسمي 100% على إيميلك الشخصي في شاهد.. لا مشاركة بعد اليوم.",
    "🛡️ حسابك ملكك بالكامل.. سجل مشاهدة خاص وخصوصية مطلقة."
];
let currentQuoteIndex = 0;
const textEl = document.getElementById('promoTickerText');
if (textEl) textEl.innerText = promoQuotes[0];
setInterval(() => {
    if (!textEl) return;
    currentQuoteIndex = (currentQuoteIndex + 1) % promoQuotes.length;
    textEl.innerText = promoQuotes[currentQuoteIndex];
}, 6000);

// شريط التقييمات المتحرك
const allReviewsList = [
    "نورة القحطاني|ما كملت 5 دقايق إلا والاشتراك مفعل على إيميلي، سرعة خيالية وتجاوب يفتح النفس!",
    "ريان الحربي|أكتب تقييمي بعد شهر كامل من الاستخدام.. الحساب شغال وبدون أي انقطاع.",
    "سارة العتيبي|ما شاء الله تبارك الله، ما توقعت بهالسرعة أبد! تفعل الحساب رسمي فوراً.",
    "شهد الدوسري|أسرع تفعيل شفته بحياتي، رسمي وعلى إيميلي الخاص بدون أي تعقيد."
];
function renderMarqueeReviews() {
    const track = document.getElementById('reviewsMarqueeTrack');
    let html = '';
    allReviewsList.forEach(item => {
        const [name, text] = item.split('|');
        html += `
            <div class="mini-review-card">
                <div class="mini-review-top">
                    <div class="mini-review-avatar">${name.charAt(0)}</div>
                    <div>
                        <span class="mini-review-author">${name}</span>
                        <div class="mini-review-stars">★★★★★</div>
                    </div>
                </div>
                <p class="mini-review-text">"${text}"</p>
            </div>
        `;
    });
    if(track) track.innerHTML = html + html;
}
renderMarqueeReviews();

function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) element.classList.add('active');
}

function openPolicyModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePolicyModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

let selectedPlan = '', selectedGateway = '';
function openGatewayModal(plan, gateway) {
    selectedPlan = plan;
    selectedGateway = gateway;
    const modal = document.getElementById('installmentModal');
    const title = document.getElementById('modalPlanTitle');
    const gwLabel = gateway === 'tabby' ? 'تابي (Tabby)' : 'تمارا (Tamara)';
    document.getElementById('installmentGatewayTitle').innerText = `جدول دفعات الأقساط عبر ${gwLabel} على 4 دفعات:`;

    if (plan === '3m') {
        title.innerText = 'تقسيط باقة 3 أشهر';
        document.getElementById('mPrice1').innerText = '18 ر.س';
        document.getElementById('mPrice2').innerText = '18 ر.س';
        document.getElementById('mPrice3').innerText = '18 ر.س';
        document.getElementById('mPrice4').innerText = '18 ر.س';
        document.getElementById('modalTotalSum').innerText = '72 ريال';
    } else {
        title.innerText = 'تقسيط باقة سنة كاملة';
        document.getElementById('mPrice1').innerText = '55 ر.س';
        document.getElementById('mPrice2').innerText = '55 ر.س';
        document.getElementById('mPrice3').innerText = '55 ر.س';
        document.getElementById('mPrice4').innerText = '55 ر.س';
        document.getElementById('modalTotalSum').innerText = '220 ريال';
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function proceedToWhatsAppInstallment() {
    closePolicyModal('installmentModal');
    const phone = "966551040375";
    const gw = selectedGateway === 'tabby' ? 'تابي' : 'تمارا';
    const prod = selectedPlan === '3m' ? 'اشتراك شاهد VIP (3 أشهر)' : 'اشتراك شاهد VIP (سنة كاملة)';
    const payToday = selectedPlan === '3m' ? '18' : '55';
    const total = selectedPlan === '3m' ? '72' : '220';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط: ${prod}\nعبر: ${gw}\nدفعة اليوم: ${payToday} ريال\nالإجمالي: ${total} ريال\n\nيرجى تزويدي برابط الدفع والتفعيل.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function openDetailsModal(plan) {
    const modal = document.getElementById('detailsModal');
    const title = document.getElementById('detailsModalTitle');
    const desc = document.getElementById('detailsDesc');
    const btnWrap = document.getElementById('modalRmzBtnWrapper');

    if (plan === '1y') {
        title.innerHTML = '<i data-lucide="sparkles" size="16"></i> تفاصيل باقة سنة كاملة (180 ر.س)';
        desc.innerHTML = 'اشتراك شاهد VIP رسمي لمدة 12 شهر كاملة، مفعّل مباشرة على إيميلك الشخصي لضمان الأمان والتصرف الكامل بسجل مشاهداتك.<br><br><strong>مميزات الباقة:</strong> بدون فواصل إعلانية، بجودة Full HD، وضمان شامل طوال مدة الاشتراك.';
        btnWrap.innerHTML = `<button data-rmz-product="61070" data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" data-rmz-theme="auto" data-rmz-config='{"hideQuantity":true,"hideCoupon":true}' style="width:100%; background:var(--primary); color:#fff; padding:10px; border-radius:8px; font-weight:900; border:none; cursor:pointer;">اطلب باقة السنة الآن (180 ر.س)</button>`;
    } else {
        title.innerHTML = '<i data-lucide="tv" size="16"></i> تفاصيل باقة 3 أشهر (60 ر.س)';
        desc.innerHTML = 'اشتراك شاهد VIP رسمي لمدة 90 يوم، مفعّل مباشرة على إيميلك الشخصي.<br><br><strong>مميزات الباقة:</strong> بدون إعلانات، دقة عالية، وضمان كامل طوال الـ 3 أشهر.';
        btnWrap.innerHTML = `<button data-rmz-product="29956" data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" data-rmz-theme="auto" data-rmz-config='{"hideQuantity":true,"hideCoupon":true}' style="width:100%; background:var(--primary); color:#fff; padding:10px; border-radius:8px; font-weight:900; border:none; cursor:pointer;">اطلب باقة 3 أشهر الآن (60 ر.س)</button>`;
    }
    lucide.createIcons();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
