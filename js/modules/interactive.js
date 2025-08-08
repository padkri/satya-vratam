// js/modules/interactive.js
import { state } from './state.js';
import { updateLanguage } from './ui.js';
import { createContentElement, createSlokaElement } from './elements.js';
import { createGrahaDiagram, loadPeetamSVG, updateGrahaDiagram, updateLokapalakaDiagram, updateDikpalakaDiagram, highlightKalasam, highlightGanapathi } from './diagram.js';

function buildInteractiveStep(step, stepDiv) {
    if (step.description) {
        const description = document.createElement('p');
        description.textContent = step.description;
        stepDiv.appendChild(description);
    }
    
    const partsNav = document.createElement('div');
    partsNav.className = 'parivaara-parts-nav';
    step.parts.forEach((part, index) => {
        const partBtn = document.createElement('button');
        partBtn.textContent = part.title;
        partBtn.className = 'parivaara-part-btn';
        partBtn.dataset.partIndex = index;
        if (index === 0) partBtn.classList.add('active');
        
        partBtn.addEventListener('click', () => {
            partsNav.querySelectorAll('.parivaara-part-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            partBtn.classList.add('active');
            state.currentPart = index;
            state.currentSubItem = 0;
            updateInteractiveView(step, stepDiv);
        });
        
        partsNav.appendChild(partBtn);
    });
    stepDiv.appendChild(partsNav);
    
    const contentContainer = document.createElement('div');
    contentContainer.className = 'parivaara-content';
    stepDiv.appendChild(contentContainer);
    
    updateInteractiveView(step, stepDiv);
}

function updateInteractiveView(step, stepDiv) {
    const contentContainer = stepDiv.querySelector('.parivaara-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = ''; 
    
    const currentPartData = step.parts[state.currentPart];
    if (!currentPartData) return;
    
    const partTitle = document.createElement('h3');
    partTitle.textContent = currentPartData.title;
    contentContainer.appendChild(partTitle);
    
    if (currentPartData.subtitle) {
        const subtitle = document.createElement('h4');
        subtitle.textContent = currentPartData.subtitle;
        contentContainer.appendChild(subtitle);
    }
    
    if (currentPartData.description) {
        const description = document.createElement('p');
        description.textContent = currentPartData.description;
        contentContainer.appendChild(description);
    }
    
    if (currentPartData.hasSubNavigation && currentPartData.subItems) {
        if (currentPartData.id === 'part1') {
            buildLokapalakaNavigation(currentPartData, contentContainer);
        } else if (currentPartData.id === 'part2') {
            buildGrahaNavigation(currentPartData, contentContainer);
        } else if (currentPartData.id === 'part3') {
            buildDikpalakaNavigation(currentPartData, contentContainer);
        }
    } else {
        if (step.id === 'step9') {
            const diagramContainer = document.createElement('div');
            diagramContainer.className = 'graha-diagram-container';
            diagramContainer.innerHTML = createGrahaDiagram(`${step.id}-part${state.currentPart + 1}`);
            contentContainer.appendChild(diagramContainer);
            
            loadPeetamSVG(() => {}, `peetam-svg-container-${step.id}-part${state.currentPart + 1}`);
        }
        
        if (currentPartData.content && currentPartData.content.length > 0) {
            currentPartData.content.forEach(item => {
                const element = createContentElement(item);
                if (element) {
                    contentContainer.appendChild(element);
                }
            });
        }
    }
    
    updateLanguage();
}

function buildGrahaNavigation(partData, container) {
    const grahaNav = document.createElement('div');
    grahaNav.className = 'parivaara-graha-nav';
    
    partData.subItems.forEach((graha, index) => {
        const grahaBtn = document.createElement('button');
        grahaBtn.textContent = graha.name;
        grahaBtn.className = 'parivaara-graha-btn';
        grahaBtn.dataset.grahaIndex = index;
        if (index === 0) grahaBtn.classList.add('active');
        
        grahaBtn.addEventListener('click', () => {
            grahaNav.querySelectorAll('.parivaara-graha-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            grahaBtn.classList.add('active');
            state.currentSubItem = index;
            updateGrahaView(partData, container);
            setTimeout(() => {
                updateGrahaDiagram(graha);
            }, 50);
        });
        
        grahaNav.appendChild(grahaBtn);
    });
    
    container.appendChild(grahaNav);
    
    const diagramContainer = document.createElement('div');
    diagramContainer.className = 'graha-diagram-container';
    diagramContainer.innerHTML = createGrahaDiagram('graha-nav');
    container.appendChild(diagramContainer);
    
    loadPeetamSVG(() => {
        setTimeout(() => {
            updateGrahaDiagram(partData.subItems[0]);
        }, 200);
    }, 'peetam-svg-container-graha-nav');
    
    const grahaContentContainer = document.createElement('div');
    grahaContentContainer.className = 'parivaara-graha-content';
    container.appendChild(grahaContentContainer);
    
    updateGrahaView(partData, container);
}

function updateGrahaView(partData, container) {
    const grahaContentContainer = container.querySelector('.parivaara-graha-content');
    if (!grahaContentContainer) return;
    
    grahaContentContainer.innerHTML = '';
    
    const currentGraha = partData.subItems[state.currentSubItem];
    if (!currentGraha) return;
    
    const grahaTitle = document.createElement('h4');
    grahaTitle.textContent = `${currentGraha.name}${currentGraha.location ? ` (${currentGraha.location})` : ''}`;
    grahaContentContainer.appendChild(grahaTitle);
    
    if (currentGraha.attribute) {
        const attribute = document.createElement('p');
        attribute.className = 'graha-attribute';
        attribute.textContent = `Attribute: ${currentGraha.attribute}`;
        grahaContentContainer.appendChild(attribute);
    }
    
    if (currentGraha.content && currentGraha.content.length > 0) {
        currentGraha.content.forEach(item => {
            const element = createContentElement(item);
            if (element) {
                grahaContentContainer.appendChild(element);
            }
        });
    }
    
    updateLanguage();
}

function buildLokapalakaNavigation(partData, container) {
    const lokapalakaNav = document.createElement('div');
    lokapalakaNav.className = 'parivaara-graha-nav';
    
    partData.subItems.forEach((lokapalaka, index) => {
        const lokapalakaBtn = document.createElement('button');
        lokapalakaBtn.textContent = lokapalaka.name;
        lokapalakaBtn.className = 'parivaara-graha-btn';
        lokapalakaBtn.dataset.lokapalakaIndex = index;
        if (index === 0) lokapalakaBtn.classList.add('active');
        
        lokapalakaBtn.addEventListener('click', () => {
            lokapalakaNav.querySelectorAll('.parivaara-graha-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            lokapalakaBtn.classList.add('active');
            state.currentSubItem = index;
            updateLokapalakaView(partData, container);
            setTimeout(() => {
                updateLokapalakaDiagram(lokapalaka);
            }, 50);
        });
        
        lokapalakaNav.appendChild(lokapalakaBtn);
    });
    
    container.appendChild(lokapalakaNav);
    
    const diagramContainer = document.createElement('div');
    diagramContainer.className = 'graha-diagram-container';
    diagramContainer.innerHTML = createGrahaDiagram('lokapalaka-nav');
    container.appendChild(diagramContainer);
    
    loadPeetamSVG(() => {
        setTimeout(() => {
            updateLokapalakaDiagram(partData.subItems[0]);
        }, 200);
    }, 'peetam-svg-container-lokapalaka-nav');
    
    const lokapalakaContentContainer = document.createElement('div');
    lokapalakaContentContainer.className = 'parivaara-graha-content';
    container.appendChild(lokapalakaContentContainer);
    
    updateLokapalakaView(partData, container);
}

function updateLokapalakaView(partData, container) {
    const lokapalakaContentContainer = container.querySelector('.parivaara-graha-content');
    if (!lokapalakaContentContainer) return;
    
    lokapalakaContentContainer.innerHTML = '';
    
    const currentLokapalaka = partData.subItems[state.currentSubItem];
    if (!currentLokapalaka) return;
    
    const lokapalakaTitle = document.createElement('h4');
    lokapalakaTitle.textContent = `${currentLokapalaka.name}${currentLokapalaka.element ? ` (${currentLokapalaka.element} Element)` : ''}`;
    lokapalakaContentContainer.appendChild(lokapalakaTitle);
    
    if (currentLokapalaka.content && currentLokapalaka.content.length > 0) {
        currentLokapalaka.content.forEach(item => {
            const element = createContentElement(item);
            if (element) {
                lokapalakaContentContainer.appendChild(element);
            }
        });
    }
    
    updateLanguage();
}

function buildRegularStep(step, stepDiv) {
    if (['step7', 'step8', 'step9', 'step10', 'step11', 'step12', 'step13', 'step15', 'step17', 'step18', 'step19', 'step20'].includes(step.id)) {
        const diagramContainer = document.createElement('div');
        diagramContainer.className = 'graha-diagram-container';
        diagramContainer.innerHTML = createGrahaDiagram(step.id);
        stepDiv.appendChild(diagramContainer);
        
        if (step.id === 'step7') {
            loadPeetamSVG(() => {
                setTimeout(() => {
                    highlightKalasam();
                }, 500);
            }, `peetam-svg-container-${step.id}`);
        } else if (step.id === 'step8') {
            loadPeetamSVG(() => {
                setTimeout(() => {
                    highlightGanapathi();
                }, 500);
            }, `peetam-svg-container-${step.id}`);
        } else if (step.id === 'step9') {
            loadPeetamSVG(() => {
                setTimeout(() => {
                    highlightKalasam();
                }, 500);
            }, `peetam-svg-container-${step.id}`);
        } else {
            loadPeetamSVG(() => {}, `peetam-svg-container-${step.id}`);
        }
    }
    
    if (step.description) {
        const description = document.createElement('p');
        description.textContent = step.description;
        stepDiv.appendChild(description);
    }
    
    if (step.content && step.content.length > 0) {
        step.content.forEach(item => {
            const element = createContentElement(item);
            if (element) {
                stepDiv.appendChild(element);
            }
        });
    }
    
    if (step.slokas && step.slokas.length > 0) {
        step.slokas.forEach(sloka => {
            stepDiv.appendChild(createSlokaElement(sloka));
        });
    }
    updateLanguage();
}

function buildDikpalakaNavigation(partData, container) {
    const dikpalakaNav = document.createElement('div');
    dikpalakaNav.className = 'parivaara-graha-nav';
    
    partData.subItems.forEach((dikpalaka, index) => {
        const dikpalakaBtn = document.createElement('button');
        dikpalakaBtn.textContent = dikpalaka.name;
        dikpalakaBtn.className = 'parivaara-graha-btn';
        dikpalakaBtn.dataset.dikpalakaIndex = index;
        if (index === 0) dikpalakaBtn.classList.add('active');
        
        dikpalakaBtn.addEventListener('click', () => {
            dikpalakaNav.querySelectorAll('.parivaara-graha-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            dikpalakaBtn.classList.add('active');
            state.currentSubItem = index;
            updateDikpalakaView(partData, container);
            setTimeout(() => {
                updateDikpalakaDiagram(dikpalaka);
            }, 50);
        });
        
        dikpalakaNav.appendChild(dikpalakaBtn);
    });
    
    container.appendChild(dikpalakaNav);
    
    const diagramContainer = document.createElement('div');
    diagramContainer.className = 'graha-diagram-container';
    diagramContainer.innerHTML = createGrahaDiagram('dikpalaka-nav');
    container.appendChild(diagramContainer);
    
    loadPeetamSVG(() => {
        setTimeout(() => {
            updateDikpalakaDiagram(partData.subItems[0]);
        }, 200);
    }, 'peetam-svg-container-dikpalaka-nav');
    
    const dikpalakaContentContainer = document.createElement('div');
    dikpalakaContentContainer.className = 'parivaara-graha-content';
    container.appendChild(dikpalakaContentContainer);
    
    updateDikpalakaView(partData, container);
}

function updateDikpalakaView(partData, container) {
    const dikpalakaContentContainer = container.querySelector('.parivaara-graha-content');
    if (!dikpalakaContentContainer) return;
    
    dikpalakaContentContainer.innerHTML = '';
    
    const currentDikpalaka = partData.subItems[state.currentSubItem];
    if (!currentDikpalaka) return;
    
    const dikpalakaTitle = document.createElement('h4');
    dikpalakaTitle.textContent = `${currentDikpalaka.name}${currentDikpalaka.direction ? ` (${currentDikpalaka.direction})` : ''}`;
    dikpalakaContentContainer.appendChild(dikpalakaTitle);
    
    if (currentDikpalaka.content && currentDikpalaka.content.length > 0) {
        currentDikpalaka.content.forEach(item => {
            const element = createContentElement(item);
            if (element) {
                dikpalakaContentContainer.appendChild(element);
            }
        });
    }
    
    updateLanguage();
}

export { buildInteractiveStep, buildRegularStep };
