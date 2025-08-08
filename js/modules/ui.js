// js/modules/ui.js
import { state } from './state.js';

export function updateNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = '';
    state.data.steps.forEach((step, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = step.title;
        link.dataset.step = index;
        if (index === state.currentStep) {
            link.classList.add('active');
        }
        if (index <= state.maxStepReached) {
            link.classList.add('completed');
        }
        navbar.appendChild(link);
    });
}

export function updateLanguage() {
    const selectedLanguage = state.language;
    document.querySelectorAll('.sloka-text, [class*="lang-"]').forEach(el => {
        const isSloka = el.classList.contains('sloka-text');
        let isVisible = false;
        
        if (isSloka) {
            if (el.classList.contains(`lang-${selectedLanguage}`)) {
                isVisible = true;
            }
        } else {
             if (el.classList.contains(`lang-${selectedLanguage}`)) {
                isVisible = true;
            }
        }

        el.style.display = isVisible ? 'block' : 'none';
    });
}
