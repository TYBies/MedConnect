// Additional translation helper for complex elements
import { translate, getCurrentLanguage } from './translations.js';

// Translate select options
export function translateSelectOptions() {
    // Experience select
    const experienceSelect = document.getElementById('experience');
    if (experienceSelect) {
        const options = experienceSelect.querySelectorAll('option');
        options[0].textContent = translate('form.selectExperience');
        options[1].textContent = translate('form.exp.less1');
        options[2].textContent = translate('form.exp.1to2');
        options[3].textContent = translate('form.exp.3to5');
        options[4].textContent = translate('form.exp.more5');
    }
    
    // German level select
    const germanSelect = document.getElementById('german_level');
    if (germanSelect) {
        const options = germanSelect.querySelectorAll('option');
        options[0].textContent = translate('form.selectLevel');
        options[1].textContent = translate('form.level.none');
        options[2].textContent = translate('form.level.a1');
        options[3].textContent = translate('form.level.a2');
        options[4].textContent = translate('form.level.b1');
        options[5].textContent = translate('form.level.b2');
        options[6].textContent = translate('form.level.c1');
    }
}

// Translate requirements list
export function translateRequirements() {
    const reqList = document.querySelector('.requirements-list');
    if (!reqList) return;
    
    const items = reqList.querySelectorAll('li');
    if (items.length >= 5) {
        items[0].innerHTML = `<strong>${translate('req.item1.title')}</strong><br>${translate('req.item1.text')}`;
        items[1].innerHTML = `<strong>${translate('req.item2.title')}</strong><br>${translate('req.item2.text')}`;
        items[2].innerHTML = `<strong>${translate('req.item3.title')}</strong><br>${translate('req.item3.text')}`;
        items[3].innerHTML = `<strong>${translate('req.item4.title')}</strong><br>${translate('req.item4.text')}`;
        items[4].innerHTML = `<strong>${translate('req.item5.title')}</strong><br>${translate('req.item5.text')}`;
    }
}

// Translate FAQ items
export function translateFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question span:first-child');
        const answer = item.querySelector('.faq-answer p');
        
        if (question && answer) {
            question.textContent = translate(`faq.q${index + 1}.question`);
            answer.textContent = translate(`faq.q${index + 1}.answer`);
        }
    });
}

// Initialize all special translations
export function initializeSpecialTranslations() {
    translateSelectOptions();
    translateRequirements();
    translateFAQ();
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    initializeSpecialTranslations();
});

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSpecialTranslations);
} else {
    setTimeout(initializeSpecialTranslations, 100);
}