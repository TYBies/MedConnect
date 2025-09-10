// Standalone version for GitHub Pages
(function() {
    // Supabase configuration
    const SUPABASE_URL = 'https://rnowzeipdcrgwqwaazcp.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3d6ZWlwZGNyZ3dxd2FhemNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTc2ODEsImV4cCI6MjA3MzAzMzY4MX0.fHPGZ0uhHG-nN7DL6V2uVsaOIwTd0P1Pxv2dtIyPfLM';

    // Simple database operations
    async function submitToSupabase(table, data) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            });

            return response.ok;
        } catch (error) {
            console.error('Error submitting to Supabase:', error);
            return false;
        }
    }

    // DOM Elements
    let contactForm;
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
        mobileMenu = document.querySelector('.mobile-menu');
        navLinks = document.querySelector('.nav-links');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
    }

    // Handle waitlist form submission (formerly contact form)
    async function handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            nursing_qualification: formData.get('qualification'),
            years_experience: parseInt(formData.get('experience')) || 0,
            german_level: formData.get('german_level')
        };

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining waitlist...';

        try {
            // Submit to nurse_applications table for waitlist
            const success = await submitToSupabase('nurse_applications', data);
            
            if (success) {
                showNotification('🎉 You\'re on the waitlist! We\'ll contact you soon with next steps.', 'success');
                e.target.reset();
                
                // Show success message in the form area
                const formContainer = e.target.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'waitlist-success';
                successMessage.innerHTML = `
                    <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">You're on the list!</h3>
                    <p>Thank you for joining our waitlist. We'll be in touch within 48 hours with more information about your journey to Germany.</p>
                    <p style="margin-top: 1rem;">Check your email for a confirmation message.</p>
                `;
                formContainer.appendChild(successMessage);
                e.target.style.display = 'none';
                
                // Reset form after 10 seconds
                setTimeout(() => {
                    e.target.style.display = 'block';
                    successMessage.remove();
                }, 10000);
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

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Force reflow to trigger animation
        notification.offsetHeight;
        
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
})();