// js/modules/state.js
export const state = {
    currentStep: 0,
    maxStepReached: 0,
    currentPart: 0,
    currentSubItem: 0,
    language: 'english',
    data: {
        steps: [],
        grahas: [],
        dikpalakas: [],
        ganapathi_pooja_services: [],
        anga_pooja_services: [],
    }
};

export function setCurrentStep(step) {
    state.currentStep = step;
}

export function setMaxStepReached(step) {
    state.maxStepReached = Math.max(state.maxStepReached, step);
}

export function setLanguage(lang) {
    state.language = lang;
}

export function setData(jsonData) {
    state.data = jsonData;
}
