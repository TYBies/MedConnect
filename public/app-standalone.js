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
        submitBtn.textContent = 'Sending...';

        try {
            const success = await submitToSupabase('contact_submissions', data);
            
            if (success) {
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