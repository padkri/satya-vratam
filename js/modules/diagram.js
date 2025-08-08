// js/modules/diagram.js

const grahaMapping = {
    "Sun": { main: "g1", ruling: "g1a", coruling: "g1p" },
    "Moon": { main: "g2", ruling: "g2a", coruling: "g2p" },
    "Mars": { main: "g3", ruling: "g3a", coruling: "g3p" },
    "Mercury": { main: "g4", ruling: "g4a", coruling: "g4p" },
    "Jupiter": { main: "g5", ruling: "g5a", coruling: "g5p" },
    "Venus": { main: "g6", ruling: "g6a", coruling: "g6p" },
    "Saturn": { main: "g7", ruling: "g7a", coruling: "g7p" },
    "Rahu": { main: "g8", ruling: "g8a", coruling: "g8p" },
    "Ketu": { main: "g9", ruling: "g9a", coruling: "g9p" }
};

const lokapalakaMapping = {
    "ganapathi": { main: "l1" },
    "brahma": { main: "l2" },
    "mahalakshmi": { main: "l3" },
    "mahavishnu": { main: "l4" },
    "rudra": { main: "l5" },
    "gouri": { main: "l6" }
};

const dikpalakaMapping = {
    "indra": { main: "d1" },
    "agni": { main: "d2" },
    "yama": { main: "d3" },
    "nirriti": { main: "d4" },
    "varuna": { main: "d5" },
    "vayu": { main: "d6" },
    "kubera": { main: "d7" },
    "eeshana": { main: "d8" },
    "brahma_dikpalaka": { main: "d9" },
    "ananta_sesha": { main: "d10" }
};

export function createGrahaDiagram(uniqueId) {
    const containerId = uniqueId ? `peetam-svg-container-${uniqueId}` : 'peetam-svg-container';
    return `
        <div class="graha-diagram">
            <h4>Graha Locations Diagram</h4>
            <div id="${containerId}">
                Loading diagram...
            </div>
        </div>
    `;
}

export async function loadPeetamSVG(callback, containerId = 'peetam-svg-container') {
    try {
        const response = await fetch('./peetam.svg');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();
        
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = svgText;
            
            const svg = container.querySelector('svg');
            if (svg) {
                svg.setAttribute('viewBox', '-20 -20 940 790');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            }
            
            if (callback) {
                setTimeout(callback, 100);
            }
        } else {
            console.error('SVG container not found with ID:', containerId);
        }
    } catch (error) {
        console.error('Failed to load peetam diagram:', error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">Diagram could not be loaded</p>';
        }
    }
}

export function updateGrahaDiagram(graha) {
    if (!graha || !graha.name) return;
    
    setTimeout(() => {
        const svg = document.querySelector('.graha-diagram svg');
        if (!svg) return;
        
        svg.querySelectorAll('g').forEach(group => {
            group.classList.remove('highlight-main', 'highlight-deity');
        });
        
        svg.querySelectorAll('.attention-arrow').forEach(arrow => arrow.remove());
        
        const mapping = grahaMapping[graha.name];
        if (!mapping) {
            console.warn('Graha mapping not found for:', graha.name);
            return;
        }
        
        const { main, ruling, coruling } = mapping;
        
        const mainGroup = svg.querySelector(`#${main}`);
        const rulingGroup = svg.querySelector(`#${ruling}`);
        const corulingGroup = svg.querySelector(`#${coruling}`);
        
        if (mainGroup) {
            mainGroup.classList.add('highlight-main');
        }
        if (rulingGroup) {
            rulingGroup.classList.add('highlight-deity');
        }
        if (corulingGroup) {
            corulingGroup.classList.add('highlight-deity');
        }
    }, 100);
}

export function updateLokapalakaDiagram(lokapalaka) {
    if (!lokapalaka || !lokapalaka.id) return;
    
    setTimeout(() => {
        // Look for SVG in the lokapalaka-specific container first, then fall back to general selector
        let svg = document.querySelector('#peetam-svg-container-lokapalaka-nav svg');
        if (!svg) {
            svg = document.querySelector('.graha-diagram svg');
        }
        
        if (!svg) return;
        
        svg.querySelectorAll('g').forEach(group => {
            group.classList.remove('highlight-main', 'highlight-deity');
        });
        
        svg.querySelectorAll('.attention-arrow').forEach(arrow => arrow.remove());
        
        const mapping = lokapalakaMapping[lokapalaka.id];
        if (!mapping) {
            console.warn('Lokapalaka mapping not found for:', lokapalaka.id);
            return;
        }
        
        const mainGroup = svg.querySelector(`#${mapping.main}`);
        
        if (mainGroup) {
            mainGroup.classList.add('highlight-main');
        }
    }, 100);
}

export function updateDikpalakaDiagram(dikpalaka) {
    if (!dikpalaka || !dikpalaka.id) return;
    
    setTimeout(() => {
        // Look for SVG in the dikpalaka-specific container first, then fall back to general selector
        let svg = document.querySelector('#peetam-svg-container-dikpalaka-nav svg');
        if (!svg) {
            svg = document.querySelector('.graha-diagram svg');
        }
        
        if (!svg) return;
        
        svg.querySelectorAll('g').forEach(group => {
            group.classList.remove('highlight-main', 'highlight-deity');
        });
        
        svg.querySelectorAll('.attention-arrow').forEach(arrow => arrow.remove());
        
        const mapping = dikpalakaMapping[dikpalaka.id];
        if (!mapping) {
            console.warn('Dikpalaka mapping not found for:', dikpalaka.id);
            return;
        }
        
        const mainGroup = svg.querySelector(`#${mapping.main}`);
        
        if (mainGroup) {
            mainGroup.classList.add('highlight-main');
        }
    }, 100);
}

export function highlightKalasam() {
    const svg = document.querySelector('.graha-diagram svg');
    if (!svg) return;
    
    svg.querySelectorAll('g').forEach(group => {
        group.classList.remove('highlight-main', 'highlight-deity');
    });
    
    svg.querySelectorAll('.attention-arrow').forEach(arrow => arrow.remove());
    
    const kalasam = svg.querySelector('#k');
    if (kalasam) {
        kalasam.classList.add('highlight-main');
    }
}

export function highlightGanapathi() {
    const svg = document.querySelector('.graha-diagram svg');
    if (!svg) return;
    
    svg.querySelectorAll('g').forEach(group => {
        group.classList.remove('highlight-main', 'highlight-deity');
    });
    
    svg.querySelectorAll('.attention-arrow').forEach(arrow => arrow.remove());
    
    const ganapathi = svg.querySelector('#lg');
    if (ganapathi) {
        ganapathi.classList.add('highlight-main');
    }
}
