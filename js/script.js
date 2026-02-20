// ===== Svarasa Indian Kitchen - Interactive Features =====

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Cards Slider =====
const slider = document.getElementById('cardsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const cardWidth = 300 + 24; // card width + gap
const visibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
const maxIndex = document.querySelectorAll('.offering-card').length - visibleCards;

function updateSlider() {
    if (slider) {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Update on window resize
window.addEventListener('resize', () => {
    const newVisibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    if (newVisibleCards !== visibleCards) {
        currentIndex = 0;
        updateSlider();
    }
});

// ===== Smooth Scrolling for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Reservation Form Submission =====
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const requests = document.getElementById('requests').value;
        
        // Simple validation
        if (!name || !email || !date || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Success message
        alert(`Thank you ${name}! Your reservation for ${guests} on ${date} at ${time} has been received. We'll confirm shortly via email.`);
        
        // Reset form
        this.reset();
    });
}

// ===== Newsletter Form Submission =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            alert('Thank you for subscribing to Svarasa updates!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Sticky Navigation Shadow =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    }
});

// ===== Image Lazy Loading =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// ===== Current Date for Reservation Form (set minimum date to today) =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// ===== Animated Counter for Stats (optional enhancement) =====
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍛 Svarasa Indian Kitchen - Redesigned with ❤️');
    
    // Set initial active link
    if (window.scrollY < 100) {
        document.querySelector('.nav-menu a')?.classList.add('active');
    }
});

