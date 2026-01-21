/**
 * 두잇코퍼레이션 - JavaScript (biz-place 스타일)
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS 초기화
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 히어로 슬라이더 초기화
    initHeroSwiper();

    // 캠페인 슬라이더 초기화
    initCampaignSwiper();

    // 후기 슬라이더 초기화
    initReviewsSwiper();

    // 헤더 스크롤 효과
    initHeaderScroll();

    // 모바일 메뉴
    initMobileMenu();

    // 숫자 카운터 애니메이션
    initCounter();

    // 부드러운 스크롤
    initSmoothScroll();

    // TOP 버튼
    initTopButton();

    // 폼 제출
    initContactForm();
});

/**
 * 히어로 슬라이더
 */
function initHeroSwiper() {
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        parallax: true,
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.hero-next',
            prevEl: '.hero-prev',
        },
        on: {
            slideChangeTransitionStart: function() {
                // 슬라이드 변경 시 애니메이션 리셋
                const activeSlide = this.slides[this.activeIndex];
                const elements = activeSlide.querySelectorAll('[data-swiper-parallax]');

                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                });
            },
            slideChangeTransitionEnd: function() {
                // 슬라이드 변경 후 애니메이션 시작
                const activeSlide = this.slides[this.activeIndex];
                const elements = activeSlide.querySelectorAll('[data-swiper-parallax]');

                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.transition = 'all 0.8s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            },
            init: function() {
                // 초기 슬라이드 애니메이션
                const activeSlide = this.slides[this.activeIndex];
                const elements = activeSlide.querySelectorAll('[data-swiper-parallax]');

                elements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        el.style.transition = 'all 0.8s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 500 + (index * 150));
                });
            }
        }
    });
}

/**
 * 캠페인 슬라이더
 */
function initCampaignSwiper() {
    const campaignSwiper = new Swiper('.campaign-swiper', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.campaign-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
}

/**
 * 후기 슬라이더
 */
function initReviewsSwiper() {
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.reviews-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
}

/**
 * 헤더 스크롤 효과
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * 모바일 메뉴
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const gnb = document.getElementById('gnb');

    if (toggle && gnb) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            gnb.classList.toggle('active');
        });

        // 메뉴 링크 클릭 시 닫기
        const links = gnb.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                gnb.classList.remove('active');
            });
        });
    }
}

/**
 * 숫자 카운터 애니메이션
 */
function initCounter() {
    const counters = document.querySelectorAll('.count');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            clearInterval(timer);
            element.textContent = formatNumber(target);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 부드러운 스크롤
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * TOP 버튼
 */
function initTopButton() {
    const topBtn = document.getElementById('topBtn');

    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 폼 제출
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // 유효성 검사
            if (!validateForm(data)) return;

            // 제출 버튼 상태 변경
            const submitBtn = form.querySelector('.btn-submit');
            const originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>전송 중...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // 서버 전송 시뮬레이션
            setTimeout(() => {
                showNotification('상담 신청이 완료되었습니다!<br>빠른 시일 내에 연락드리겠습니다.', 'success');
                form.reset();
                submitBtn.innerHTML = originalHtml;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

function validateForm(data) {
    if (!data.company || data.company.trim() === '') {
        showNotification('회사명/상호명을 입력해주세요.', 'error');
        return false;
    }
    if (!data.name || data.name.trim() === '') {
        showNotification('담당자명을 입력해주세요.', 'error');
        return false;
    }
    if (!data.phone || data.phone.trim() === '') {
        showNotification('연락처를 입력해주세요.', 'error');
        return false;
    }
    if (!data.service || data.service === '') {
        showNotification('관심 서비스를 선택해주세요.', 'error');
        return false;
    }
    if (!data.privacy) {
        showNotification('개인정보 수집에 동의해주세요.', 'error');
        return false;
    }
    return true;
}

function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // 스타일 추가 (한 번만)
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                min-width: 320px;
                padding: 20px 24px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideInRight 0.4s ease;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 14px;
            }
            .notification-content i {
                font-size: 24px;
            }
            .notification-content p {
                font-size: 15px;
                line-height: 1.5;
                color: #1a1a1a;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-success i {
                color: #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-error i {
                color: #ef4444;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                color: #888;
                cursor: pointer;
                padding: 4px;
                transition: color 0.3s ease;
            }
            .notification-close:hover {
                color: #1a1a1a;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @media (max-width: 480px) {
                .notification {
                    top: auto;
                    bottom: 100px;
                    right: 20px;
                    left: 20px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // 닫기 버튼
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // 자동 닫기
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * 스크롤 시 네비게이션 활성화
 */
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.gnb ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/**
 * 스크롤 다운 인디케이터 클릭
 */
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        const nextSection = document.querySelector('.stats-section');
        if (nextSection) {
            window.scrollTo({
                top: nextSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
    scrollDown.style.cursor = 'pointer';
}
