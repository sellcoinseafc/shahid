lucide.createIcons();

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

// دالة التبديل بين الباقات (3 أشهر / سنة كاملة)
let currentActivePlan = '3m';
function switchProductPlan(plan) {
    currentActivePlan = plan;
    const btn3m = document.getElementById('btnPlan3m');
    const btn1y = document.getElementById('btnPlan1y');
    const card3m = document.getElementById('flipContainer3m');
    const card1y = document.getElementById('flipContainer1y');

    // إرجاع أي بطاقات مقلوبة لوجهها الأمامي
    card3m.classList.remove('flipped');
    card1y.classList.remove('flipped');

    if (plan === '3m') {
        btn3m.classList.add('active');
        btn1y.classList.remove('active');
        card3m.style.display = 'block';
        card1y.style.display = 'none';
    } else {
        btn1y.classList.add('active');
        btn3m.classList.remove('active');
        card1y.style.display = 'block';
        card3m.style.display = 'none';
    }
}

// دالة تدوير وتقليب البطاقة
function toggleCardFlip(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.toggle('flipped');
    }
}

const masterReviewsList = [
    { name: "نورة السبيعي", comment: "تعبت من الحسابات المشتركة وكل شوي يخرجني بالنص! الحمد لله تفعل على إيميلي الشخصي وسرعة التفعيل ما أخذت 5 دقائق. خصوصية وراحة بال." },
    { name: "منيرة القحطاني", comment: "أخيرًا كملت المسلسل بدون ما يغير أحد الباسوورد علي أو يخرب سجلي! التفعيل رسمي وعلى إيميلي مباشرة." },
    { name: "أريج الشمري", comment: "أفضل متجر يتعامل باحترافية، كنت متخوفة من التفعيل بس طلع سريع وشغال زي الفل وبدون أي إعلانات مزعجة." },
    { name: "فهد العتيبي", comment: "كنت أشتري حسابات مشتركة وتروح علي الفلوس بعد أسبوعين. الحين شغال زي اللوز مع Nexorasa وضمان حقيقي طوال المدة." },
    { name: "ريم المطيري", comment: "أحلى شيء إن السجل خاص بي ومحد يشاركني الملفات، والتفعيل صار بثواني أول ما دفعت. شكراً لكم على المصداقية." },
    { name: "سارة الشهري", comment: "بعد معاناة طويلة مع تقطيع الشاشات المشتركة، الاشتراك على إيميلي أطلق خيار سويته. مشاهدة Full HD واستقرار تام." },
    { name: "طيف الغامدي", comment: "تعامل راقي جداً والتفعيل فوري. أهم شيء عندي الخصوصية وتنزيل الحلقات أوفلاين، وكل شي شغال ممتاز." },
    { name: "خالد الدوسري", comment: "سرعة التفعيل تدرس! الخدمة رسمية على حسابي الشخصي وراحت عقدة الخروج المفاجئ وتجاوز عدد المتابعين." },
    { name: "شهد الخالدي", comment: "أول مرة أربط على إيميلي وندمت إني ما سويتها من زمان. راحة تامة من حوسة الحسابات المشتركة وتغير الرمز." },
    { name: "وجدان الحربي", comment: "خدمة العملاء ممتازة وساعدوني بالتفعيل مباشرة. الحساب سريع، ممتاز، وبدون أي إعلانات مزعجة." }
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
        authorEl.innerHTML = `<span>${currentItem.name}</span> — <span class="stars">★★★★★</span> (عميل موثق)`;
        card.style.opacity = '1';
        reviewPointer++;
    }, 400);
}

setInterval(rotateSingleReview, 6000);
window.addEventListener('load', rotateSingleReview);

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

let selectedGateway = '';
function openGatewayModal(plan, gateway) {
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
    const prod = currentActivePlan === '3m' ? 'اشتراك شاهد VIP (3 أشهر)' : 'اشتراك شاهد VIP (سنة كاملة)';
    const payToday = currentActivePlan === '3m' ? '18' : '55';
    const total = currentActivePlan === '3m' ? '72' : '220';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط: ${prod}\nعبر: ${gw}\nدفعة اليوم: ${payToday} ريال\nالإجمالي: ${total} ريال\n\nيرجى تزويدي برابط الدفع والتفعيل.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
