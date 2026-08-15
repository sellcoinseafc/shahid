lucide.createIcons();

// تبديل الوضع الليلي والنهاري
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

// متغيرات المحاكي التفاعلي الذكي
const simCursor = document.getElementById('simCursor');
const simCard = document.getElementById('simulatorCard');
const simModeBadge = document.getElementById('simModeBadge');
const stageBadge = document.getElementById('simStageBadge');

const step1 = document.getElementById('simStep1');
const stepSubInfo = document.getElementById('simStepSubInfo');
const step2 = document.getElementById('simStep2');
const step3 = document.getElementById('simStep3');
const step4 = document.getElementById('simStep4');

const btnLogin = document.getElementById('simBtnLogin');
const btnContinue = document.getElementById('simBtnContinue');
const targetProfile = document.getElementById('simTargetProfile');
const targetShow = document.getElementById('simTargetShow');
const timelineProgress = document.getElementById('timelineProgress');
const videoTimeCounter = document.getElementById('videoTimeCounter');
const playPauseIcon = document.getElementById('playPauseIcon');
const cinematicStatus = document.getElementById('cinematicStatus');

const subCardTitle = document.getElementById('subCardTitle');
const subCardDuration = document.getElementById('subCardDuration');
const subCardExpire = document.getElementById('subCardExpire');
const subCardWarranty = document.getElementById('subCardWarranty');

let autoTourTimer = null;
let userInactiveTimer = null;
let isUserInteracting = false;
let isVideoPlaying = true;
let videoSeconds = 1;
let videoInterval = null;
let isYearPlanState = true;

// حساب إحداثيات العناصر للمؤشر
function moveCursorTo(element) {
    if (!simCard || !simCursor || !element) return;
    const cardRect = simCard.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    const top = elRect.top - cardRect.top + (elRect.height / 2);
    const left = elRect.left - cardRect.left + (elRect.width / 2);
    simCursor.style.transform = `translate3d(${left}px, ${top}px, 0)`;
}

// التبديل بين الشاشات
function showSimStep(stepNumber) {
    [step1, stepSubInfo, step2, step3, step4].forEach(el => el.classList.remove('active'));
    
    if (stepNumber === 1) {
        step1.classList.add('active');
        stageBadge.innerText = '1. تسجيل الدخول';
        stageBadge.style.color = 'var(--primary)';
        clearInterval(videoInterval);
    } else if (stepNumber === 2) {
        stepSubInfo.classList.add('active');
        stageBadge.innerText = '2. تأكيد تفعيل الاشتراك ✅';
    } else if (stepNumber === 3) {
        step2.classList.add('active');
        stageBadge.innerText = '3. اختيار ملفك الخاص';
    } else if (stepNumber === 4) {
        step3.classList.add('active');
        stageBadge.innerText = '4. مسلسلات وأفلام VIP';
    } else if (stepNumber === 5) {
        step4.classList.add('active');
        stageBadge.innerText = '5. مشاهدة سينمائية بدون إعلانات ✨';
        stageBadge.style.color = 'var(--accent-gold)';
        startSimVideoPlayer();
    }
    lucide.createIcons();
}

// تفاعل المستخدم اليدوي المباشر
function userTriggerStep(targetStep) {
    isUserInteracting = true;
    clearTimeout(autoTourTimer);
    clearTimeout(userInactiveTimer);

    if (simCursor) simCursor.style.opacity = '0';
    if (simModeBadge) {
        simModeBadge.innerText = 'تفاعل يدوي 👆';
        simModeBadge.style.background = 'rgba(0, 224, 150, 0.2)';
        simModeBadge.style.color = 'var(--primary)';
    }

    showSimStep(targetStep);

    userInactiveTimer = setTimeout(() => {
        isUserInteracting = false;
        if (simModeBadge) {
            simModeBadge.innerText = 'جولة تلقائية 🤖';
            simModeBadge.style.background = 'rgba(0, 224, 150, 0.15)';
            simModeBadge.style.color = 'var(--primary)';
        }
        runAutoTour();
    }, 8000);
}

// دورة الجولة التلقائية
function runAutoTour() {
    if (isUserInteracting || !simCard) return;

    if (isYearPlanState) {
        if(subCardTitle) subCardTitle.innerText = 'شاهد VIP (سنة كاملة) 👑';
        if(subCardDuration) subCardDuration.innerText = '12 شهر (سنة كاملة)';
        if(subCardExpire) subCardExpire.innerText = '14 أغسطس 2027';
        if(subCardWarranty) subCardWarranty.innerText = 'شامل 12 شهر كاملة';
    } else {
        if(subCardTitle) subCardTitle.innerText = 'شاهد VIP (3 أشهر) ⚡';
        if(subCardDuration) subCardDuration.innerText = '3 أشهر (90 يوم)';
        if(subCardExpire) subCardExpire.innerText = '14 نوفمبر 2026';
        if(subCardWarranty) subCardWarranty.innerText = 'شامل 90 يوم كاملة';
    }
    isYearPlanState = !isYearPlanState;

    showSimStep(1);
    simCursor.style.opacity = '1';
    simCursor.style.transform = 'translate3d(30px, 30px, 0)';

    autoTourTimer = setTimeout(() => {
        moveCursorTo(btnLogin);
        setTimeout(() => {
            simCursor.classList.add('clicking');
            btnLogin.classList.add('active-click');
            setTimeout(() => {
                simCursor.classList.remove('clicking');
                btnLogin.classList.remove('active-click');
                showSimStep(2);

                autoTourTimer = setTimeout(() => {
                    moveCursorTo(btnContinue);
                    setTimeout(() => {
                        simCursor.classList.add('clicking');
                        btnContinue.classList.add('active-click');
                        setTimeout(() => {
                            simCursor.classList.remove('clicking');
                            btnContinue.classList.remove('active-click');
                            showSimStep(3);

                            autoTourTimer = setTimeout(() => {
                                moveCursorTo(targetProfile);
                                setTimeout(() => {
                                    simCursor.classList.add('clicking');
                                    targetProfile.classList.add('active-click');
                                    setTimeout(() => {
                                        simCursor.classList.remove('clicking');
                                        targetProfile.classList.remove('active-click');
                                        showSimStep(4);

                                        autoTourTimer = setTimeout(() => {
                                            moveCursorTo(targetShow);
                                            setTimeout(() => {
                                                simCursor.classList.add('clicking');
                                                targetShow.classList.add('active-click');
                                                setTimeout(() => {
                                                    simCursor.classList.remove('clicking');
                                                    targetShow.classList.remove('active-click');
                                                    simCursor.style.opacity = '0';
                                                    showSimStep(5);

                                                    autoTourTimer = setTimeout(() => {
                                                        runAutoTour();
                                                    }, 9000);
                                                }, 500);
                                            }, 700);
                                        }, 1200);
                                    }, 500);
                                }, 700);
                            }, 1200);
                        }, 500);
                    }, 700);
                }, 1400);
            }, 500);
        }, 800);
    }, 1000);
}

// التحكم في المشغل
function startSimVideoPlayer() {
    clearInterval(videoInterval);
    isVideoPlaying = true;
    videoSeconds = 1;
    if (timelineProgress) timelineProgress.style.width = '5%';
    if (playPauseIcon) playPauseIcon.setAttribute('data-lucide', 'pause');

    videoInterval = setInterval(() => {
        if (!isVideoPlaying) return;
        videoSeconds += 2;
        const progressPercent = Math.min(100, (videoSeconds / 2700) * 100 + 15);
        if (timelineProgress) timelineProgress.style.width = `${progressPercent}%`;
        
        const mins = String(Math.floor(videoSeconds / 60)).padStart(2, '0');
        const secs = String(videoSeconds % 60).padStart(2, '0');
        if (videoTimeCounter) videoTimeCounter.innerText = `${mins}:${secs}`;
    }, 1000);
}

function toggleSimVideoPlayback() {
    isVideoPlaying = !isVideoPlaying;
    if (playPauseIcon) {
        playPauseIcon.setAttribute('data-lucide', isVideoPlaying ? 'pause' : 'play');
        lucide.createIcons();
    }
    if (cinematicStatus) {
        cinematicStatus.innerText = isVideoPlaying ? 'جاري التشغيل المباشر بدقة سينمائية..' : 'تم إيقاف العرض مؤقتاً ⏸️';
    }
}

function seekSimProgress(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(100, (clickX / width) * 100));
    if (timelineProgress) timelineProgress.style.width = `${percent}%`;
    videoSeconds = Math.floor((percent / 100) * 2700);
}

// بدء المحاكي عند التحميل
window.addEventListener('load', () => {
    setTimeout(runAutoTour, 500);
});

// التقييمات
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
    openPolicyModal('installmentModal');
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
    const richContent = document.getElementById('detailsModalRichContent');
    const btnWrap = document.getElementById('modalRmzBtnWrapper');

    const productDetailsHTML = `
        <div class="details-rich-text">
            <p style="color: var(--accent-gold); font-weight: 800; font-size: 0.88rem; margin-bottom: 8px;">عالم من الترفيه يتبعك أينما كنت.. خصوصية تامة، وبدون إعلانات!</p>
            <p style="font-size: 0.85rem; color: var(--text-pure); margin-bottom: 12px;">امتلك حسابك الخاص والمستقل تماماً، مفعّل رسميًا على حسابك في شاهد، واستمتع بأضخم مكتبة محتوى عربي وعالمي وفق أعلى معايير الجودة.</p>
            
            <h4>🌟 مميزات الاشتراك:</h4>
            <ul>
                <li><strong>🎬 مكتبة ضخمة:</strong> أحدث المسلسلات والأفلام + إصدارات "أعمال شاهد الأصلية" الحصرية.</li>
                <li><strong>🚫 تجربة صافية:</strong> مشاهدة مستمرة بدون أي فواصل إعلانية مزعجة.</li>
                <li><strong>🎥 أعلى جودة:</strong> استمتع بدقة Full HD لتجربة بصرية سينمائية.</li>
                <li><strong>⬇️ بدون إنترنت:</strong> خاصية التحميل لمتابعة أعمالك المفضلة في أي وقت.</li>
                <li><strong>🌍 متاح عالمياً:</strong> يمكنك المشاهدة من أي دولة دون قيود.</li>
            </ul>

            <h4>📱 الأجهزة المدعومة:</h4>
            <p style="font-size: 0.85rem; color: var(--text-pure); font-weight: 800; margin-bottom: 6px;">( الجوال 📱 – الآيباد 📱 – اللابتوب 💻 – الكمبيوتر 🖥️ – التلفزيون الذكي 📺 )</p>

            <h4>⚠️ حدود الاستخدام والقيود:</h4>
            <ul>
                <li><strong>بدون محتوى رياضي:</strong> الباقة مخصصة للترفيه فقط (لا تشمل قنوات SSC أو الدوري السعودي).</li>
                <li><strong>المشاهدة المتزامنة:</strong> تتيح التشغيل على (2) أجهزة كحد أقصى في نفس الوقت (من نفس العنوان المنزلي).</li>
            </ul>

            <h4>🛠️ طريقة التفعيل والضمان:</h4>
            <ul>
                <li><strong>تفعيل مباشر:</strong> يتم على حسابك لضمان الخصوصية التامة لسجل مشاهداتك.</li>
                <li><strong>ضمان شامل:</strong> اشتراك رسمي ونظامي 100% يضمن لك الاستمرارية طوال المدة المحددة.</li>
            </ul>
        </div>
    `;

    if (plan === '1y') {
        title.innerHTML = '<i data-lucide="sparkles" size="18" style="color:var(--primary);"></i> تفاصيل باقة شاهد VIP (سنة كاملة - 180 ر.س)';
        richContent.innerHTML = productDetailsHTML;
        btnWrap.innerHTML = `<button data-rmz-product="61070" data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" data-rmz-theme="auto" data-rmz-config='{"hideQuantity":true,"hideCoupon":true}' style="width:100%; background:linear-gradient(135deg, #00e096, #059669); color:#060907; padding:12px; border-radius:10px; font-weight:900; border:none; cursor:pointer; font-size:0.9rem;">اطلب باقة السنة الآن (180 ر.س)</button>`;
    } else {
        title.innerHTML = '<i data-lucide="tv" size="18" style="color:var(--primary);"></i> تفاصيل باقة شاهد VIP (3 أشهر - 60 ر.س)';
        richContent.innerHTML = productDetailsHTML;
        btnWrap.innerHTML = `<button data-rmz-product="29956" data-rmz-key="rmz_pk_1701_hYJycm6zIUMEdb491fVxML2D" data-rmz-theme="auto" data-rmz-config='{"hideQuantity":true,"hideCoupon":true}' style="width:100%; background:linear-gradient(135deg, #00e096, #059669); color:#060907; padding:12px; border-radius:10px; font-weight:900; border:none; cursor:pointer; font-size:0.9rem;">اطلب باقة 3 أشهر الآن (60 ر.س)</button>`;
    }
    
    openPolicyModal('detailsModal');
    setTimeout(() => {
        lucide.createIcons();
    }, 50);
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
