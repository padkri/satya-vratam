import { state, setData, setLanguage } from './modules/state.js';
import { updateNavbar, updateLanguage } from './modules/ui.js';
import { renderStep } from './modules/content.js';
import { nextStep, prevStep, goToStep, updateNavButtons } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('vratam.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData({
            steps: jsonData.steps || [],
            grahas: jsonData.grahas || [],
            dikpalakas: jsonData.dikpalakas || [],
            ganapathi_pooja_services: jsonData.ganapathi_pooja_services || [],
            anga_pooja_services: jsonData.anga_pooja_services || [],
        });

        const navbar = document.getElementById('navbar');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const languageSelect = document.getElementById('language-select');

        // Event Listeners
        navbar.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.dataset.step) {
                e.preventDefault();
                const stepIndex = parseInt(e.target.dataset.step, 10);
                goToStep(stepIndex);
            }
        });

        prevBtn.addEventListener('click', prevStep);
        nextBtn.addEventListener('click', nextStep);

        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            updateLanguage();
        });

        // Initial setup
        renderStep(state.currentStep);
        updateNavbar();
        updateNavButtons();
        updateLanguage();

    } catch (error) {
        console.error('Failed to initialize application:', error);
        document.getElementById('main-content').innerHTML = 
            `<div style="text-align: center; padding: 40px; background: #fff; border-radius: 8px;">
                <h2>Error Loading Application</h2>
                <p>Could not load the necessary data. Please check the console for details and ensure 'vratam.json' is available.</p>
                <p><em>${error.message}</em></p>
            </div>`;
    }
});
