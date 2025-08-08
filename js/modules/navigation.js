// js/modules/navigation.js
import { state, setCurrentStep, setMaxStepReached } from './state.js';
import { renderStep } from './content.js';
import { updateNavbar } from './ui.js';

export function nextStep() {
    if (state.currentStep < state.data.steps.length - 1) {
        setCurrentStep(state.currentStep + 1);
        setMaxStepReached(state.currentStep);
        renderStep(state.currentStep);
        updateNavbar();
        updateNavButtons();
    }
}

export function prevStep() {
    if (state.currentStep > 0) {
        setCurrentStep(state.currentStep - 1);
        renderStep(state.currentStep);
        updateNavbar();
        updateNavButtons();
    }
}

export function goToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < state.data.steps.length) {
        setCurrentStep(stepIndex);
        setMaxStepReached(state.currentStep);
        renderStep(state.currentStep);
        updateNavbar();
        updateNavButtons();
    }
}

export function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.disabled = state.currentStep === 0;
    nextBtn.disabled = state.currentStep === state.data.steps.length - 1;
}
