/**
 * ThriveIn - Main JavaScript
 * Handles interactivity for the landing page
 */

// ============================================
// DOM Elements
// ============================================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const currentYearEl = document.getElementById('current-year');

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit rate of function execution
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
    );
}

// ============================================
// Header Scroll Effect
// ============================================
let lastScrollY = window.scrollY;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', debounce(handleScroll, 5));

// ============================================
// Mobile Menu Toggle
// ============================================
function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', toggleMobileMenu);

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Section Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', debounce(highlightActiveSection, 50));

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ============================================
// Contact Form Handling
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        
        // Check if form action is still placeholder
        if (this.action.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            
            // Show message that form is not yet configured
            submitBtn.innerHTML = '<span>Form not configured</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }, 2000);
            
            console.warn('Contact form is not configured. Please update the Formspree form ID in index.html');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Form will submit normally to Formspree
        // For a more custom experience, you could use fetch() here
    });
}

// ============================================
// Set Current Year in Footer
// ============================================
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// ============================================
// Add Animation Classes to Elements
// ============================================
function addAnimationClasses() {
    // Service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.add('animate-on-scroll');
        step.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Features
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.classList.add('animate-on-scroll');
        feature.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Testimonials
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // FAQ categories
    document.querySelectorAll('.faq-category').forEach((category, index) => {
        category.classList.add('animate-on-scroll');
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('animate-on-scroll');
    });
    
    // Re-observe newly added elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// FAQ Link Handling (scroll + auto-open category)
// ============================================
document.querySelectorAll('[data-faq-link]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetCategory = document.querySelector(targetId);
        
        if (targetCategory) {
            // Close all other FAQ categories first
            document.querySelectorAll('.faq-category[open]').forEach(cat => {
                if (cat !== targetCategory) {
                    cat.open = false;
                }
            });
            
            // Open the target category
            targetCategory.open = true;
            
            // Scroll to the FAQ category
            const headerHeight = header.offsetHeight;
            const targetPosition = targetCategory.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Modal Handling
// ============================================
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        closeModal(modal);
    });
}

// Handle privacy/terms links
document.querySelectorAll('a[href="#privacy"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('privacy-modal');
    });
});

document.querySelectorAll('a[href="#terms"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('terms-modal');
    });
});

// Handle close buttons and backdrop clicks
document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Run scroll handler on load to set initial states
    handleScroll();
    highlightActiveSection();
    
    // Add animation classes
    addAnimationClasses();
    
    // Log initialization
    console.log('ThriveIn website initialized');
});

// ============================================
// Handle Page Visibility (for animations)
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-check animations when tab becomes visible
        highlightActiveSection();
    }
});

