// Import Supabase functions
import { database } from '../src/supabase.js';

// Import translation system with error handling
let translationSystem = null;
let languageSwitcher = null;
let translationHelper = null;

async function loadTranslationSystem() {
    try {
        translationSystem = await import('./translations.js');
        const langModule = await import('./language-switcher.js');
        languageSwitcher = langModule.createLanguageSwitcher;
        
        // Load translation helper for complex elements
        translationHelper = await import('./translation-helper.js');
        
        console.log('Translation system loaded successfully');
        return true;
    } catch (error) {
        console.warn('Translation system not loaded:', error.message);
        return false;
    }
}

// DOM Elements
let contactForm;
let applyModal;
let partnerModal;
let mobileMenu;
let navLinks;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    initializeElements();
    setupEventListeners();
    setupMobileMenu();
    setupFAQ();
    setupSmoothScrolling();
    setupScrollReveal();
    setupParallax();
    addModernEffects();
    
    // Initialize translation system
    const translationLoaded = await loadTranslationSystem();
    if (translationLoaded) {
        initializeLanguageSwitcher();
    }
});

// Initialize DOM elements
function initializeElements() {
    contactForm = document.getElementById('contact-form');
    applyModal = document.getElementById('apply-modal');
    partnerModal = document.getElementById('partner-modal');
    mobileMenu = document.querySelector('.mobile-menu');
    navLinks = document.querySelector('.nav-links');
}

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Apply Now button
    const applyBtn = document.getElementById('apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => openModal('apply'));
    }

    // Partner With Us button
    const partnerBtn = document.getElementById('partner-btn');
    if (partnerBtn) {
        partnerBtn.addEventListener('click', () => openModal('partner'));
    }

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Application form submission
    const applyForm = document.getElementById('apply-form');
    if (applyForm) {
        applyForm.addEventListener('submit', handleApplicationSubmit);
    }

    // Partner form submission
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
        partnerForm.addEventListener('submit', handlePartnerSubmit);
    }
}

// Handle waitlist form submission (formerly contact form)
async function handleContactSubmit(e) {
    e.preventDefault();
    console.log('Form submitted!');
    
    const formData = new FormData(e.target);
    
    // Log form data for debugging
    console.log('Form fields:');
    for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    
    // Map experience select value to number
    const experienceMap = {
        '0-1': 1,
        '1-2': 2,
        '3-5': 4,
        '5+': 6
    };
    
    const data = {
        fullName: formData.get('name'),  // Fixed: HTML has name="name", not name="full_name"
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        nursingQualification: formData.get('qualification'),
        yearsExperience: experienceMap[formData.get('experience')] || 0,
        germanLevel: formData.get('german_level')
    };
    
    console.log('Data to submit:', data);

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Use the nurse application endpoint for waitlist submissions
        console.log('Calling database.submitNurseApplication...');
        const result = await database.submitNurseApplication(data);
        console.log('Result:', result);
        
        if (result.success) {
            // Don't show the sliding notification, just the inline success message
            e.target.reset();
            
            // Show success message in the form area
            const formContainer = e.target.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'waitlist-success';
            successMessage.innerHTML = `
                <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">🎉 You're on the list!</h3>
                <p>Thank you for joining our waitlist. We'll be in touch soon with more information about your journey to Germany.</p>
                <p style="margin-top: 1rem;">Check your email for a confirmation message.</p>
            `;
            formContainer.appendChild(successMessage);
            e.target.style.display = 'none';
            
            // Reset form after 10 seconds
            setTimeout(() => {
                e.target.style.display = 'block';
                successMessage.remove();
            }, 10000);
        } else if (result.error === 'already_registered') {
            // Show a friendly message for duplicate registration
            const formContainer = e.target.parentElement;
            const alreadyMessage = document.createElement('div');
            alreadyMessage.className = 'waitlist-success';
            alreadyMessage.style.borderColor = '#ff9800';
            alreadyMessage.innerHTML = `
                <h3 style="color: #ff9800; margin-bottom: 1rem;">Already Registered!</h3>
                <p>${result.message}</p>
                <p style="margin-top: 1rem;">If you need to update your information, please contact us directly.</p>
            `;
            formContainer.appendChild(alreadyMessage);
            e.target.style.display = 'none';
            
            // Reset form after 7 seconds
            setTimeout(() => {
                e.target.style.display = 'block';
                alreadyMessage.remove();
            }, 7000);
        } else {
            showNotification('There was an error joining the waitlist. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Handle application form submission
async function handleApplicationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        country: formData.get('country'),
        nursingQualification: formData.get('nursingQualification'),
        yearsExperience: parseInt(formData.get('yearsExperience')),
        germanLevel: formData.get('germanLevel'),
        additionalInfo: formData.get('additionalInfo')
    };

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const result = await database.submitNurseApplication(data);
        
        if (result.success) {
            showNotification('Application submitted successfully! We will contact you soon.', 'success');
            e.target.reset();
            setTimeout(() => closeModal(), 2000);
        } else {
            showNotification('Error submitting application. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Handle partner form submission
async function handlePartnerSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        organizationName: formData.get('organizationName'),
        contactPerson: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        inquiryType: formData.get('inquiryType'),
        message: formData.get('message')
    };

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const result = await database.submitPartnerInquiry(data);
        
        if (result.success) {
            showNotification('Inquiry submitted successfully! We will contact you soon.', 'success');
            e.target.reset();
            setTimeout(() => closeModal(), 2000);
        } else {
            showNotification('Error submitting inquiry. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Modal functions
function openModal(type) {
    const modal = type === 'apply' ? applyModal : partnerModal;
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Mobile menu toggle
function setupMobileMenu() {
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation
document.addEventListener('input', (e) => {
    if (e.target.type === 'email') {
        if (!validateEmail(e.target.value) && e.target.value) {
            e.target.setCustomValidity('Please enter a valid email address');
        } else {
            e.target.setCustomValidity('');
        }
    }
    
    if (e.target.type === 'tel') {
        if (!validatePhone(e.target.value) && e.target.value) {
            e.target.setCustomValidity('Please enter a valid phone number');
        } else {
            e.target.setCustomValidity('');
        }
    }
});

// Scroll Reveal Animation
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.service-card, .requirement-card, .faq-item, section h2, .stat-item');
    
    reveals.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    function handleScroll() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
}

// Parallax Effect - Disabled to prevent overlapping
function setupParallax() {
    // Disabled parallax to prevent text overlapping issues
    return;
}

// Add Modern Effects
function addModernEffects() {
    // Add floating animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero .btn');
    heroButtons.forEach((btn, index) => {
        btn.style.animation = `fadeInUp 1s ease-out ${0.5 + index * 0.2}s both`;
    });
    
    // Remove icon addition - icons are already in HTML
    // This prevents duplicate icons from appearing
    
    // Add stats section if it doesn't exist
    if (!document.querySelector('.stats')) {
        const statsSection = createStatsSection();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.parentNode.insertBefore(statsSection, aboutSection.nextSibling);
        }
    }
    
    // Animate numbers in stats
    animateCounters();
}

// Create Stats Section
function createStatsSection() {
    const stats = document.createElement('section');
    stats.className = 'stats';
    stats.innerHTML = `
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
                <div class="stat-item">
                    <div class="stat-number" data-target="500">0</div>
                    <div class="stat-label">Nurses Placed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-target="50">0</div>
                    <div class="stat-label">Partner Hospitals</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-target="95">0</div>
                    <div class="stat-label">Success Rate %</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-target="12">0</div>
                    <div class="stat-label">Months Average</div>
                </div>
            </div>
        </div>
    `;
    return stats;
}

// Animate Counter Numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = target / 100;
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}


// Initialize language switcher
function initializeLanguageSwitcher() {
    if (!languageSwitcher) return;
    
    // Add language switcher to navigation
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const lastNavItem = navLinks.querySelector('li:last-child');
        const switcherContainer = languageSwitcher();
        
        // Insert before the last nav item (Join Waitlist button)
        if (lastNavItem) {
            navLinks.insertBefore(switcherContainer, lastNavItem);
        } else {
            navLinks.appendChild(switcherContainer);
        }
    }
}

// Export functions for testing
export {
    handleContactSubmit,
    handleApplicationSubmit,
    handlePartnerSubmit,
    showNotification,
    validateEmail,
    validatePhone
};