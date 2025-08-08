// js/modules/content.js
import { state } from './state.js';
import { updateLanguage } from './ui.js';
import { buildInteractiveStep, buildRegularStep } from './interactive.js';

export function renderStep(stepIndex) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    const step = state.data.steps[stepIndex];

    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-content active';
    stepDiv.id = `step-${stepIndex}`;

    const title = document.createElement('h2');
    title.textContent = step.title;
    stepDiv.appendChild(title);

    if (step.interactive) {
        buildInteractiveStep(step, stepDiv);
    } else {
        buildRegularStep(step, stepDiv);
    }

    mainContent.appendChild(stepDiv);
    updateLanguage();
}
