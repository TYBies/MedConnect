// Import Supabase functions
import { database } from '../src/supabase.js';

// DOM Elements
let contactForm;
let applyModal;
let partnerModal;
let mobileMenu;
let navLinks;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    setupMobileMenu();
    setupFAQ();
    setupSmoothScrolling();
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

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const result = await database.submitContact(data);
        
        if (result.success) {
            showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
            e.target.reset();
        } else {
            showNotification('There was an error submitting your message. Please try again.', 'error');
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

// Export functions for testing
export {
    handleContactSubmit,
    handleApplicationSubmit,
    handlePartnerSubmit,
    showNotification,
    validateEmail,
    validatePhone
};