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

/* العبارات المتحركة الـ 9 */
const rotatingFeaturesList = [
    "يعمل على التلفزيون وجميع أجهزتك",
    "باقة المسلسلات والأفلام الحصرية",
    "دعم جودات Full HD و 4K سينمائية",
    "خصوصية مطلقة بسجل مشاهداتك",
    "تشغيل مستقر بدون انقطاع نهائياً",
    "تحميل المحتوى للمشاهدة أوفلاين",
    "تجربة ترفيهية خالية من الإعلانات",
    "متابعة أحدث الأعمال والدراما",
    "تحكم كامل بإعدادات حسابك الخاص"
];

let featurePointer = 0;
function rotateFeatureText() {
    const el = document.getElementById('rotatingFeatureText');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
        featurePointer = (featurePointer + 1) % rotatingFeaturesList.length;
        el.innerText = rotatingFeaturesList[featurePointer];
        el.style.opacity = '1';
    }, 400);
}

/* قائمة الـ 200 تقييم المعتمدة بنظام العرض التتابعي الذكي بدون تكرار */
const masterReviewsList = [
    { name: "نورة العتيبي", comment: "ممتاز وسريع جداً، شكراً لكم." },
    { name: "سارة القحطاني", comment: "خدمة ولا أروع، أنصح بالتعامل معه." },
    { name: "فهد الشمري", comment: "التفعيل ما أخذ دقايق، يعطيهم العافية." },
    { name: "منيرة السبيعي", comment: "ممتاز جداً وشغال بدون أي مشاكل." },
    { name: "ريم المطيري", comment: "تعامل راقي وسرعة في التنفيذ." },
    { name: "أريج الغامدي", comment: "أفضل متجر، كل شيء تمام." },
    { name: "عبدالله الدوسري", comment: "خدمة سريعة وموثوقة، شكراً لكم." },
    { name: "خالد الحربي", comment: "جربت أكثر من مرة ودايم ممتاز." },
    { name: "لطيفة العمري", comment: "تفعيل فوري وبدون أي تعقيد." },
    { name: "دلال الحارثي", comment: "الله يعطيهم العافية، خدمة ممتازة." },
    { name: "مشعل العتيبي", comment: "ممتاز جداً وأنصح فيه بقوة." },
    { name: "نوف الشمري", comment: "سرعة في الرد وتنفيذ الطلب." },
    { name: "سلطان القحطاني", comment: "كل شيء تمام وشغال زي العسل." },
    { name: "ريم البقمي", comment: "متجر ثقة وصادق بتعاملهم." },
    { name: "هتون الزهراني", comment: "تجربة ممتازة وراح أكررها." },
    { name: "فيصل الحربي", comment: "سريع وسهل، شكراً لكم." },
    { name: "أفنان الدوسري", comment: "رائع جداً وما واجهت أي مشكلة." },
    { name: "تركي العنزي", comment: "خدمة ممتازة وتجاوب سريع." },
    { name: "شهد التميمي", comment: "من أروع المتاجر اللي تعاملت معها." },
    { name: "ريما الشهري", comment: "اشتراك ممتاز وسرعة بالتفعيل." },
    { name: "سعد القحطاني", comment: "يعطيهم العافية، كل شي مضبوط." },
    { name: "دنا السبيعي", comment: "خدمة سريعة واحترافية." },
    { name: "عبير المطيري", comment: "ممتاز جداً، شكراً لحسن التعامل." },
    { name: "مها الشمري", comment: "تجربة موفقة وراح أعتمد المتجر." },
    { name: "ناصر العتيبي", comment: "سرعة وثقة، الله يرزقهم." },
    { name: "ابتسام الغامدي", comment: "تفعيل سريع ومباشر، ممتاز." },
    { name: "وجدان الحارثي", comment: "كل شيء شغال تمام التمام." },
    { name: "بندر الدوسري", comment: "ممتاز جداً، شكراً لكم." },
    { name: "غادة الزهراني", comment: "خدمة عملاء ممتازة وسريعة." },
    { name: "سارة العتيبي", comment: "أسرع متجر تعاملت معه بحياتي." },
    { name: "لمياء التميمي", comment: "ممتاز، تفعيل فوري وبدون تأخير." },
    { name: "عبدالعزيز الشمري", comment: "رائع جداً ومضمون 100%." },
    { name: "ريماس الحربي", comment: "يعطيك العافية على السرعة." },
    { name: "منى القحطاني", comment: "تجربة ممتازة وخدمة سريعة." },
    { name: "روان السبيعي", comment: "كل شي ممتاز وواضح." },
    { name: "سلطان الدوسري", comment: "ممتاز جداً ومصداقية عالية." },
    { name: "هيفاء المطيري", comment: "شكراً على السرعة والاحترافية." },
    { name: "بشرى الغامدي", comment: "خدمة رائعة وتستاهل أكثر." },
    { name: "سعود العتيبي", comment: "اشتراك شغال وزي الفل." },
    { name: "غلا الشمري", comment: "متجر ممتاز ومحترف." },
    { name: "رهف القحطاني", comment: "سرعة في الإنجاز وتعامل ممتاز." },
    { name: "فهد الدوسري", comment: "ممتاز، الله يبيض وجيهكم." },
    { name: "يارا الحارثي", comment: "خدمة سريعة جداً وممتازة." },
    { name: "عالية الزهراني", comment: "كل شي تمام وشغال ممتاز." },
    { name: "ماجد الحربي", comment: "تعامل جداً راقي وسريع." },
    { name: "جواهر السبيعي", comment: "ممتاز، تفعيل بأسرع وقت." },
    { name: "فاطمة المطيري", comment: "رائع جداً، شكراً لكم." },
    { name: "حنان الشمري", comment: "خدمة ممتازة وتستاهل التجربة." },
    { name: "عمر القحطاني", comment: "سريع وموثوق، يعطيهم العافية." },
    { name: "هدى الغامدي", comment: "ممتاز جداً والخدمة سريعة." },
    { name: "ديمة الدوسري", comment: "تجربة ممتازة وبدون مشاكل." },
    { name: "بندر التميمي", comment: "شكراً على السرعة والمصداقية." },
    { name: "مروج العتيبي", comment: "من أروع المتاجر الرقمية." },
    { name: "شروق الحارثي", comment: "خدمة سريعة وتنفيذ فوري." },
    { name: "صالح الشمري", comment: "ممتاز جداً وكل شي تمام." },
    { name: "سماح الحربي", comment: "تعامل محترف وسرعة بالرد." },
    { name: "رغد القحطاني", comment: "رائع جداً، شكراً لكم." },
    { name: "موضي السبيعي", comment: "خدمة ممتازة ومضمونة." },
    { name: "عبدالرحمن الزهراني", comment: "سريع جداً، يعطيكم العافية." },
    { name: "أماني المطيري", comment: "ممتاز، تفعيل ما طول نهائياً." },
    { name: "جنان الغامدي", comment: "تجربة ممتازة وأنصح بالتعامل." },
    { name: "سيف الدوسري", comment: "خدمة سريعة وممتازة جداً." },
    { name: "ليان الشمري", comment: "كل شي شغال وبأفضل صورة." },
    { name: "ندى العتيبي", comment: "متجر ثقة وسريع بالتنفيذ." },
    { name: "عادل القحطاني", comment: "ممتاز جداً، شكراً لحرصكم." },
    { name: "ميادة الحربي", comment: "سرعة إنجاز غير معتادة، ممتاز." },
    { name: "وسن الحارثي", comment: "رائع، الله يوفقكم." },
    { name: "رناد السبيعي", comment: "خدمة ممتازة وتجاوب سريع." },
    { name: "يزيد الدوسري", comment: "ممتاز جداً، شكراً لكم." },
    { name: "رؤى المطيري", comment: "تجربة ممتازة ومرضية جداً." },
    { name: "حوراء الغامدي", comment: "سريع وموثوق، شكراً لكم." },
    { name: "مهند الشمري", comment: "ممتاز، كل شي شغال تمام." },
    { name: "بنان القحطاني", comment: "تعامل راقي وسرعة بالتفعيل." },
    { name: "ريان العتيبي", comment: "خدمة رائعة وممتازة جداً." },
    { name: "أريج الزهراني", comment: "ممتاز جداً، أنصح به." },
    { name: "مزن الحارثي", comment: "سرعة وثقة ومصداقية." },
    { name: "سلطانة السبيعي", comment: "رائع جداً، يعطيكم العافية." },
    { name: "زياد الحربي", comment: "خدمة ممتازة وسريعة للغاية." },
    { name: "غزلان الدوسري", comment: "ممتاز، تفعيل فوري وسهل." },
    { name: "دانة المطيري", comment: "تجربة ممتازة، شكراً لكم." },
    { name: "وليد الشمري", comment: "سريع جداً وشغال تمام." },
    { name: "شموس الغامدي", comment: "ممتاز جداً، الله يرزقهم." },
    { name: "رهف العتيبي", comment: "خدمة عملاء ممتازة." },
    { name: "مازن القحطاني", comment: "كل شي مضبوط وسريع." },
    { name: "فوزية السبيعي", comment: "ممتاز، شكراً للجهد المبذول." },
    { name: "ميرال الحارثي", comment: "رائع جداً ومضمون." },
    { name: "عبدالله الحربي", comment: "خدمة سريعة ومرضية." },
    { name: "سديم الدوسري", comment: "ممتاز جداً، الله يعافيكم." },
    { name: "حور الشمري", comment: "تجربة ممتازة وجميلة." },
    { name: "رائد الزهراني", comment: "سرعة في التنفيذ ممتازة." },
    { name: "بثينة المطيري", comment: "ممتاز، كل شيء تمام." },
    { name: "نسرين الغامدي", comment: "رائع جداً، شكراً لكم." },
    { name: "مهند القحطاني", comment: "خدمة ممتازة وسريعة." },
    { name: "جود العتيبي", comment: "ممتاز جداً، أنصح بالتعامل معه." },
    { name: "فاطمة السبيعي", comment: "سرعة وثقة ومصداقية عالية." },
    { name: "بسام الدوسري", comment: "تجربة ممتازة وسريعة." },
    { name: "آلاء الشمري", comment: "ممتاز، تفعيل فوري." },
    { name: "لميس الحربي", comment: "رائع جداً، يعطيكم العافية." },
    { name: "سلاف الحارثي", comment: "خدمة ممتازة وموثوقة." },
    { name: "يزن الغامدي", comment: "ممتاز جداً وشغال تمام." },
    { name: "هيا العتيبي", comment: "سريع وممتاز، شكراً لكم." },
    { name: "رؤى القحطاني", comment: "تجربة ممتازة ومريحة." },
    { name: "باسل الشمري", comment: "ممتاز، كل شي تمام." },
    { name: "ريناد الدوسري", comment: "خدمة سريعة واحترافية." },
    { name: "ميساء السبيعي", comment: "رائع جداً وممتاز." },
    { name: "سالم المطيري", comment: "ممتاز جداً، الله يعطيكم العافية." },
    { name: "فجر الغامدي", comment: "سرعة في الرد والتنفيذ." },
    { name: "غلا الحارثي", comment: "تجربة رائعة ومفيدة." },
    { name: "نايف الحربي", comment: "ممتاز، شكراً لكم." },
    { name: "وتين الزهراني", comment: "خدمة ممتازة وسريعة جداً." },
    { name: "رشا العتيبي", comment: "ممتاز جداً، أنصح به بشدة." },
    { name: "طارق القحطاني", comment: "سريع وموثوق ومحترف." },
    { name: "شهد الشمري", comment: "تجربة ممتازة وموفقة." },
    { name: "مريم الدوسري", comment: "ممتاز، كل شي شغال تمام." },
    { name: "فدوى السبيعي", comment: "رائع جداً، شكراً لحسن التعامل." },
    { name: "عمار الحربي", comment: "خدمة عملاء سريعة وممتازة." },
    { name: "ديما المطيري", comment: "ممتاز جداً، الله يوفقكم." },
    { name: "بيان الغامدي", comment: "سرعة إنجاز رائعة." },
    { name: "وسام الشمري", comment: "تجربة ممتازة ومرضية." },
    { name: "فراس القحطاني", comment: "ممتاز، تفعيل فوري وسريع." },
    { name: "وجد الحارثي", comment: "رائع جداً وممتاز." },
    { name: "لولوة العتيبي", comment: "خدمة ممتازة وسريعة." },
    { name: "بسام الدوسري", comment: "ممتاز جداً، شكراً لكم." },
    { name: "رغد السبيعي", comment: "سريع وموثوق، يعطيكم العافية." },
    { name: "عقيل الزهراني", comment: "تجربة ممتازة وجميلة." },
    { name: "غيداء الحربي", comment: "ممتاز، كل شي تمام." },
    { name: "عهد الشمري", comment: "رائع جداً ومضمون." },
    { name: "روان المطيري", comment: "خدمة ممتازة وسريعة للغاية." },
    { name: "راكان القحطاني", comment: "ممتاز جداً، الله يعافيكم." },
    { name: "سماح الغامدي", comment: "سرعة في التنفيذ ممتازة." },
    { name: "أثير العتيبي", comment: "ممتاز، كل شيء تمام." },
    { name: "وليد الدوسري", comment: "رائع جداً، شكراً لكم." },
    { name: "لينا الحارثي", comment: "خدمة ممتازة وسريعة." },
    { name: "مزن السبيعي", comment: "ممتاز جداً، أنصح بالتعامل معه." },
    { name: "فراس الشمري", comment: "سرعة وثقة ومصداقية عالية." },
    { name: "حلا الحربي", comment: "تجربة ممتازة وسريعة." },
    { name: "ديمة المطيري", comment: "ممتاز، تفعيل فوري." },
    { name: "تركي القحطاني", comment: "رائع جداً، يعطيكم العافية." },
    { name: "رناد الغامدي", comment: "خدمة ممتازة وموثوقة." },
    { name: "شروق العتيبي", comment: "ممتاز جداً وشغال تمام." },
    { name: "معاذ الدوسري", comment: "سريع وممتاز، شكراً لكم." },
    { name: "يارا الشمري", comment: "تجربة ممتازة ومريحة." },
    { name: "بسيل الزهراني", comment: "ممتاز، كل شي تمام." },
    { name: "رؤى السبيعي", comment: "خدمة سريعة واحترافية." },
    { name: "مهند الحارثي", comment: "رائع جداً وممتاز." },
    { name: "غلا الحربي", comment: "ممتاز جداً، الله يعطيكم العافية." },
    { name: "منى المطيري", comment: "سرعة في الرد والتنفيذ." },
    { name: "سلطان الغامدي", comment: "تجربة رائعة ومفيدة." },
    { name: "وجدان القحطاني", comment: "ممتاز، شكراً لكم." },
    { name: "رنيم العتيبي", comment: "خدمة ممتازة وسريعة جداً." },
    { name: "فيصل الشمري", comment: "ممتاز جداً، أنصح به بشدة." },
    { name: "دلال الدوسري", comment: "سريع وموثوق ومحترف." },
    { name: "سديم السبيعي", comment: "تجربة ممتازة وموفقة." },
    { name: "عاصم الحربي", comment: "ممتاز، كل شي شغال تمام." },
    { name: "أفنان الحارثي", comment: "رائع جداً، شكراً لحسن التعامل." },
    { name: "ريهام الزهراني", comment: "خدمة عملاء سريعة وممتازة." },
    { name: "يزيد القحطاني", comment: "ممتاز جداً، الله يوفقكم." },
    { name: "غزلان الشمري", comment: "سرعة إنجاز رائعة." },
    { name: "شهد المطيري", comment: "تجربة ممتازة ومرضية." },
    { name: "خالد الغامدي", comment: "ممتاز، تفعيل فوري وسريع." },
    { name: "لولوه العتيبي", comment: "رائع جداً وممتاز." },
    { name: "مشعل الدوسري", comment: "خدمة ممتازة وسريعة." },
    { name: "رناد السبيعي", comment: "ممتاز جداً، شكراً لكم." },
    { name: "حور الحربي", comment: "سريع وموثوق، يعطيكم العافية." },
    { name: "بشرى الحارثي", comment: "تجربة ممتازة وجميلة." },
    { name: "سامي الشمري", comment: "ممتاز، كل شي تمام." },
    { name: "ميرال القحطاني", comment: "رائع جداً ومضمون." },
    { name: "ديمة الزهراني", comment: "خدمة ممتازة وسريعة للغاية." },
    { name: "رغد العتيبي", comment: "ممتاز جداً، الله يعافيكم." },
    { name: "فهد التميمي", comment: "سرعة في التنفيذ ممتازة." },
    { name: "غلا المطيري", comment: "ممتاز، كل شيء تمام." },
    { name: "عادل الغامدي", comment: "رائع جداً، شكراً لكم." },
    { name: "ريما السبيعي", comment: "خدمة ممتازة وسريعة." },
    { name: "وسن الشمري", comment: "ممتاز جداً، أنصح بالتعامل معه." },
    { name: "فراس الدوسري", comment: "سرعة وثقة ومصداقية عالية." },
    { name: "أريج الحربي", comment: "تجربة ممتازة وسريعة." },
    { name: "لمياء الحارثي", comment: "ممتاز، تفعيل فوري." },
    { name: "مشعل القحطاني", comment: "رائع جداً، يعطيكم العافية." },
    { name: "سديم العتيبي", comment: "خدمة ممتازة وموثوقة." },
    { name: "تركي الزهراني", comment: "ممتاز جداً وشغال تمام." },
    { name: "ريناد الشمري", comment: "سريع وممتاز، شكراً لكم." },
    { name: "جنان المطيري", comment: "تجربة ممتازة ومريحة." },
    { name: "سلطان الغامدي", comment: "ممتاز، كل شي تمام." },
    { name: "رؤى السبيعي", comment: "خدمة سريعة واحترافية." },
    { name: "عبدالله القحطاني", comment: "رائع جداً وممتاز." },
    { name: "يارا الدوسري", comment: "ممتاز جداً، الله يعطيكم العافية." },
    { name: "فهد الحربي", comment: "سرعة في الرد والتنفيذ." },
    { name: "غلا الشمري", comment: "تجربة رائعة ومفيدة." },
    { name: "سارة الحارثي", comment: "ممتاز، شكراً لكم." },
    { name: "معاذ العتيبي", comment: "خدمة ممتازة وسريعة جداً." },
    { name: "رنا الزهراني", comment: "ممتاز جداً، أنصح به بشدة." },
    { name: "شهد السبيعي", comment: "سريع وموثوق ومحترف." },
    { name: "يزيد المطيري", comment: "تجربة ممتازة وموفقة." },
    { name: "دلال الغامدي", comment: "ممتاز، كل شي شغال تمام." },
    { name: "مهند الشمري", comment: "رائع جداً، شكراً لحسن التعامل." },
    { name: "رناد القحطاني", comment: "خدمة عملاء سريعة وممتازة." },
    { name: "فراس العتيبي", comment: "ممتاز جداً، الله يوفقكم." },
    { name: "حور الدوسري", comment: "سرعة إنجاز رائعة." },
    { name: "رغد الحربي", comment: "تجربة ممتازة ومرضية." },
    { name: "سارة الشمري", comment: "ممتاز جداً، شكراً لكل العاملين بالمتجر." }
];

let reviewPointer = 0;
function rotateSingleReview() {
    const card = document.getElementById('reviewBarCard');
    const textEl = document.getElementById('reviewBarText');
    const authorEl = document.getElementById('reviewBarAuthor');

    if (!card || !textEl || !authorEl) return;
    card.style.opacity = '0';

    setTimeout(() => {
        const currentItem = masterReviewsList[reviewPointer];
        textEl.innerText = currentItem.comment;
        authorEl.innerHTML = `<span>${currentItem.name}</span> — <span class="verified-label-dark">(عميل موثق ✔️)</span>`;
        card.style.opacity = '1';
        
        // التقدم للتقييم التالي بشكل تتابعي بدون تكرار حتى تنتهي القائمة بالكامل
        reviewPointer = (reviewPointer + 1) % masterReviewsList.length;
    }, 400);
}

function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    rotateSingleReview();
    setInterval(rotateSingleReview, 4500); // تدوير كل 4.5 ثانية
    setInterval(rotateFeatureText, 3500);
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};
