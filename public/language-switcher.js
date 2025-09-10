// Language switcher component
import { setLanguage, getCurrentLanguage } from './translations.js';

// Create language switcher HTML
function createLanguageSwitcher() {
    const languages = [
        { code: 'en', name: 'EN', flag: '🇬🇧' },
        { code: 'de', name: 'DE', flag: '🇩🇪' },
        { code: 'fr', name: 'FR', flag: '🇫🇷' }
    ];
    
    const container = document.createElement('li');
    container.className = 'language-switcher-container';
    container.style.cssText = 'position: relative; list-style: none;';
    
    // Create dropdown button
    const currentLang = languages.find(l => l.code === getCurrentLanguage()) || languages[0];
    const dropdownBtn = document.createElement('button');
    dropdownBtn.className = 'lang-dropdown-btn';
    dropdownBtn.innerHTML = `${currentLang.flag} ${currentLang.name} <span style="font-size: 10px;">▼</span>`;
    dropdownBtn.style.cssText = `
        background: transparent;
        color: var(--primary-blue);
        border: 1px solid var(--primary-blue);
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 5px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        display: none;
        z-index: 1000;
        min-width: 120px;
    `;
    
    languages.forEach(lang => {
        const option = document.createElement('button');
        option.className = 'lang-option';
        option.setAttribute('data-lang', lang.code);
        option.innerHTML = `${lang.flag} ${lang.name}`;
        
        const isActive = lang.code === getCurrentLanguage();
        option.style.cssText = `
            width: 100%;
            background: ${isActive ? '#f0f7ff' : 'white'};
            color: ${isActive ? 'var(--primary-blue)' : '#333'};
            border: none;
            padding: 10px 15px;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: ${isActive ? '600' : '400'};
        `;
        
        option.addEventListener('mouseenter', () => {
            if (!isActive) option.style.background = '#f5f5f5';
        });
        
        option.addEventListener('mouseleave', () => {
            if (!isActive) option.style.background = 'white';
        });
        
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage(lang.code);
            
            // Update dropdown button text
            dropdownBtn.innerHTML = `${lang.flag} ${lang.name} <span style="font-size: 10px;">▼</span>`;
            
            // Close dropdown
            dropdown.style.display = 'none';
            
            // Update all option styles
            dropdown.querySelectorAll('.lang-option').forEach(opt => {
                const optLang = opt.getAttribute('data-lang');
                const isNowActive = optLang === lang.code;
                opt.style.background = isNowActive ? '#f0f7ff' : 'white';
                opt.style.color = isNowActive ? 'var(--primary-blue)' : '#333';
                opt.style.fontWeight = isNowActive ? '600' : '400';
            });
            
            // Close mobile menu after language selection (only on mobile)
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) navLinks.classList.remove('active');
                }, 400);
            }
        });
        
        dropdown.appendChild(option);
    });
    
    // Toggle dropdown
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        // Don't close if clicking inside the dropdown
        if (!container.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Hover effects for button
    dropdownBtn.addEventListener('mouseenter', () => {
        dropdownBtn.style.background = 'var(--primary-blue)';
        dropdownBtn.style.color = 'white';
    });
    
    dropdownBtn.addEventListener('mouseleave', () => {
        dropdownBtn.style.background = 'transparent';
        dropdownBtn.style.color = 'var(--primary-blue)';
    });
    
    container.appendChild(dropdownBtn);
    container.appendChild(dropdown);
    
    return container;
}

// Export for use
export { createLanguageSwitcher };