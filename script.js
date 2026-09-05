if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

function openInstallmentWhatsApp() {
    const phone = "966551040375";
    const prodName = 'اشتراك شاهد VIP (3 أشهر)';
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأرغب بتقسيط منتج: ${prodName}\nعبر خدمة التقسيط (تمارا / تابي)\nالإجمالي: 55 ريال\n\nيرجى تزويدي برابط الدفع والتفعيل المباشر.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function openDirectWhatsApp() {
    const phone = "966551040375";
    const msg = encodeURIComponent(`مرحباً متجر Nexorasa 👋\nأستفسر عن اشتراك شاهد VIP وأحتاج المساعدة.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

function toggleFaq(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
}

const masterReviewsList = [
    { name: "نورة العتيبي", comment: "التفعيل ما أخذ دقايق، يعطيهم العافية." },
    { name: "سارة القحطاني", comment: "خدمة ولا أروع، أنصح بالتعامل معه." },
    { name: "فاطمة العمري", comment: "تجربة سلسة وسريعة جداً." },
    { name: "منيرة السبيعي", comment: "تفعيل فوري وبدون أي تعقيد." },
    { name: "ريم المطيري", comment: "مصداقية عالية وسرعة في الرد." },
    { name: "أريج الغامدي", comment: "كل شي شغال تمام وزي العسل." },
    { name: "هتون الزهراني", comment: "متجر ثقة وصادق بتعاملهم." },
    { name: "سارة الدوسري", comment: "تجربة موفقة وراح أعتمد المتجر." },
    { name: "ابتسام الحربي", comment: "الله يرزقهم، سرعة وثقة." },
    { name: "وجدان الحارثي", comment: "تفعيل مباشر ومضمون 100%." },
    { name: "غادة الشمري", comment: "خدمة عملاء راقية ومحترفة." },
    { name: "لمياء التميمي", comment: "أسرع متجر تعاملت معه بحياتي." },
    { name: "ريماس الشهري", comment: "من أروع المتاجر اللي تعاملت معها." },
    { name: "منى المطيري", comment: "اشتراك شغال وبأفضل صورة." },
    { name: "روان البقمي", comment: "تعامل جداً راقي وسريع." },
    { name: "هيفاء العتيبي", comment: "تجربة ممتازة ومرضية جداً." },
    { name: "بشرى القحطاني", comment: "خدمة سريعة وموثوقة، شكراً لكم." },
    { name: "غلا السبيعي", comment: "جربت أكثر من مرة ودايم على العهد." },
    { name: "رهف الزهراني", comment: "كل شي واضح وبسيط." },
    { name: "يارا الغامدي", comment: "يعطيهم العافية على الإنجاز السريع." },
    { name: "عالية الحربي", comment: "خدمة احترافية بمعنى الكلمة." },
    { name: "جواهر الدوسري", comment: "ما قصروا معي أبداً، الله يسعدهم." },
    { name: "حنان الشمري", comment: "اشتراك نظيف وشغال بدون توقف." },
    { name: "هدى العتيبي", comment: "سهولة في الطلب وسرعة في التنفيذ." },
    { name: "ديمة التميمي", comment: "شكراً على الأمانة والسرعة." },
    { name: "مروج المطيري", comment: "أفضل سعر وأسرع تفعيل." },
    { name: "شروق القحطاني", comment: "تجربة مريحة وتستاهل كل ريال." },
    { name: "سماح الحربي", comment: "يعطيهم العافية، خدمة ولا أسهل." },
    { name: "رغد السبيعي", comment: "متجر متكامل وأمورهم تمام." },
    { name: "موضي الحارثي", comment: "التفعيل وصلني قبل ما أخلص تحويل." },
    { name: "أماني الزهراني", comment: "خدمة واضحة وبدون لف ودوران." },
    { name: "جنان الغامدي", comment: "تعامل احترافي وسريع للغاية." },
    { name: "ليان الشمري", comment: "كل شي تمام والاشتراك شغال 100%." },
    { name: "ندى الدوسري", comment: "شكراً لحسن التجاوب والسرعة." },
    { name: "ميادة العتيبي", comment: "متجر معتمد وصادق." },
    { name: "وسن المطيري", comment: "تجربة تستحق التكرار بالتأكيد." },
    { name: "رناد القحطاني", comment: "تفعيل فوري وما طول نهائياً." },
    { name: "رؤى الحربي", comment: "خدمة عملاء متجاوبة طوال الوقت." },
    { name: "حوراء السبيعي", comment: "الله يبيض وجيهكم على المصداقية." },
    { name: "بنان الحارثي", comment: "سرعة إنجاز غير معتادة، شكراً لكم." },
    { name: "ريان الزهراني", comment: "كل التقدير للقائمين على المتجر." },
    { name: "مزن الغامدي", comment: "اشتراك مضمون وخدمة سريعة." },
    { name: "سلطانة الشمري", comment: "ما واجهت أي مشكلة أبداً." },
    { name: "غزلان الدوسري", comment: "تعاملهم يخليك تطلب وأنت مغمض." },
    { name: "دانة العتيبي", comment: "شكراً لطاقم العمل على السرعة." },
    { name: "شموس المطيري", comment: "متجر يفرض احترامه بمصداقيته." },
    { name: "فوزية القحطاني", comment: "الخدمة وصلتني بأسرع وقت ممكن." },
    { name: "ميرال الحربي", comment: "تنظيم وترتيب وسرعة في التنفيذ." },
    { name: "سديم السبيعي", comment: "يعطيهم العافية على الشغل النظيف." },
    { name: "حور الحارثي", comment: "خدمة فوق الخيال وسرعة فائقة." },
    { name: "بثينة الزهراني", comment: "كل الاحترام لمتجركم الراقي." },
    { name: "نسرين الغامدي", comment: "تفعيل فوري وبدون أي مشاكل تقنية." },
    { name: "جود الشمري", comment: "تجربة شراء ناجحة بكل المقاييس." },
    { name: "آلاء الدوسري", comment: "سرعة، أمان، واحترافية عالية." },
    { name: "لميس العتيبي", comment: "شكراً من القلب على الخدمة السريعة." },
    { name: "سلاف المطيري", comment: "المتجر المفضل عندي للاشتراكات." },
    { name: "هيا القحطاني", comment: "اشتراك شغال وبجودة عالية جداً." },
    { name: "ريناد الحربي", comment: "تعامل راقي وسرعة في إنجاز الطلب." },
    { name: "ميساء السبيعي", comment: "كل شيء كان أسرع مما توقعت." },
    { name: "فجر الحارثي", comment: "يعطيهم العافية على الدعم السريع." },
    { name: "وتين الزهراني", comment: "ثقة وأمانة وسرعة في التنفيذ." },
    { name: "رشا الغامدي", comment: "تجربة رائعة ومفيدة جداً." },
    { name: "شهد الشمري", comment: "خدمة تبيض الوجه، شكراً لكم." },
    { name: "مريم الدوسري", comment: "اشتراك نظامي وما فيه أي ملاحظات." },
    { name: "فدوى العتيبي", comment: "شكراً لتواجدكم الدائم وسرعة ردكم." },
    { name: "ديما المطيري", comment: "متجر يستاهل كل دعم." },
    { name: "بيان القحطاني", comment: "تفعيل فوري وخدمة تفتح النفس." },
    { name: "وسام الحربي", comment: "تجربة راقية من متجر راقي." },
    { name: "وجد السبيعي", comment: "كل شي شغال زي ما تمنيت وأكثر." },
    { name: "لولوة الحارثي", comment: "يعطيهم العافية على المصداقية العالية." },
    { name: "عقيل الزهراني", comment: "خدمة سريعة والناس هذي أمينة." },
    { name: "غيداء الغامدي", comment: "شكراً على الاحترافية في التعامل." },
    { name: "عهد الشمري", comment: "تفعيل سريع وما احتاج أي انتظار." },
    { name: "راكان الدوسري", comment: "تجربة ولا أسهل ولا أسرع." },
    { name: "أثير العتيبي", comment: "متجر يحل لك الأمور بثواني." },
    { name: "وليد المطيري", comment: "كل الشكر والتقدير لخدمة العملاء." },
    { name: "لينا القحطاني", comment: "اشتراك شغال بدون أي تقطيع." },
    { name: "فراس الحربي", comment: "تعاملهم قمة في الأخلاق والسرعة." },
    { name: "حلا السبيعي", comment: "تجربة ممتعة وسهلة للغاية." },
    { name: "تركي الحارثي", comment: "يعطيهم العافية على الوضوح والسرعة." },
    { name: "شروق الزهراني", comment: "خدمة فاعلة وسريعة الاستجابة." },
    { name: "معاذ الغامدي", comment: "شكراً على الالتزام بالمواعيد." },
    { name: "بسيل الشمري", comment: "متجر يغنيك عن باقي المتاجر." },
    { name: "مهند الدوسري", comment: "تفعيل فوري وبدون أي تعقيدات." },
    { name: "رنيم العتيبي", comment: "تجربة تشرح الصدر، شكراً لكم." },
    { name: "فيصل المطيري", comment: "كل الاحترام لسرعة إنجازكم." },
    { name: "سديم القحطاني", comment: "اشتراك شغال والوضع في السليم." },
    { name: "عاصم الحربي", comment: "تعامل سريع وراقي جداً." },
    { name: "أفنان السبيعي", comment: "شكراً على ثقتكم وحسن خدمتكم." },
    { name: "ريهام الحارثي", comment: "متجر محترف بكل ما تحمله الكلمة من معنى." },
    { name: "يزيد الزهراني", comment: "خدمة تخدمك بكل صراحة وبدون تعقيد." },
    { name: "خالد الغامدي", comment: "تفعيل وصلني بالوقت المحدد تماماً." },
    { name: "مشعل الشمري", comment: "تجربة شراء ولا أروع." },
    { name: "سامي الدوسري", comment: "يعطيهم العافية على المتابعة والحرص." },
    { name: "فهد العتيبي", comment: "خدمة سريعة ومريحة للآخر." },
    { name: "عادل المطيري", comment: "شكراً على جودة الخدمة المقدمة." },
    { name: "سارة الشمري", comment: "متجر يستحق النشر والترشيح." }
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
        reviewPointer = (reviewPointer + 1) % masterReviewsList.length;
    }, 400);
}

document.addEventListener('DOMContentLoaded', function() {
    rotateSingleReview();
    setInterval(rotateSingleReview, 4500);

    const wishlistBtn = document.getElementById('wishlistToggleBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            const icon = wishlistBtn.querySelector('svg');
            if (wishlistBtn.classList.toggle('active')) {
                wishlistBtn.style.background = 'rgba(244, 63, 94, 0.15)';
                if(icon) icon.style.fill = '#f43f5e';
            } else {
                wishlistBtn.style.background = 'transparent';
                if(icon) icon.style.fill = 'none';
            }
        });
    }
});
