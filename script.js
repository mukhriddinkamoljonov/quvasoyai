// script.js - Interactive functions for Quvasoy Startup Hackathon

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // --- 3. Active Link Highlight ---
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // --- 4. Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.innerText;
            const count = 0;
            const updateCount = () => {
                const current = +counter.innerText;
                const inc = target / speed;

                if (current < target) {
                    counter.innerText = Math.ceil(current + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };

            counter.innerText = '0';
            updateCount();
        });
    }

    // Trigger counter when visible
    const statsSection = document.querySelector('.hero-stats');
    let counted = false;

    const observeStats = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !counted){
            startCounters();
            counted = true;
        }
    }, { threshold: 0.5 });
    
    if(statsSection) {
        observeStats.observe(statsSection);
    }

    // --- 5. Telegram Bot Form Submission ---
    const hackathonForm = document.getElementById('hackathonForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccess = document.getElementById('closeSuccess');

    // Bularni o'zingizning bot tokeningiz va chat ID gizingiz bilan almashtiring
    const TELEGRAM_BOT_TOKEN = '8214425109:AAGxLWeEPPs9Ts5hEiSc9urAllr9quOmZJw';
    const TELEGRAM_CHAT_ID = '-5169706949';

    if(hackathonForm) {
        hackathonForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Agar token kiritilmagan bo'lsa, ogohlantirish (test uchun qoldirish mumkin emas)
            if(TELEGRAM_BOT_TOKEN === 'SIZNING_BOT_TOKENINGIZ_SHU_YERGA_YOZILADI') {
                alert("Iltimos tizim ishlashi uchun script.js fayliga Telegram Bot Token va Chat ID kiriting!");
                return;
            }

            // Show loading state on button
            const submitBtn = hackathonForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;

            // Get form values
            const fullname = document.getElementById('fullname').value;
            const phone = '+998' + document.getElementById('phone').value;
            const projectName = document.getElementById('project_name').value;
            const projectDesc = document.getElementById('project_desc').value;

            // Prepare message text
            const text = `🎉 Yangi Ariza Tushdi!\n\n👨‍💼 Ism: ${fullname}\n📞 Tel: ${phone}\n🚀 Loyiha: ${projectName}\n📝 Tavsif: ${projectDesc}`;

            // Send to Telegram
            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    successMessage.classList.remove('hide');
                    hackathonForm.reset();
                } else {
                    alert("Xatolik yuz berdi. Bot sozlamalarini tekshiring.");
                    console.error('Telegram Error:', data);
                }
            })
            .catch(error => {
                alert("Internet ulanishida xatolik yuz berdi.");
                console.error('Fetch Error:', error);
            })
            .finally(() => {
                // Reset button text
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    if(closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            successMessage.classList.add('hide');
        });
    }

});
