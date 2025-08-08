// js/modules/elements.js
import { state } from './state.js';

// Create a sloka element (3 languages)
export function createSlokaElement(slokaData) {
    const slokaContainer = document.createElement('div');
    slokaContainer.className = 'sloka';

    ['devanagari','english','telugu'].forEach(lang => {
        if (slokaData[lang]) {
            const p = document.createElement('p');
            p.className = `sloka-text lang-${lang}`;
            p.style.whiteSpace = 'pre-wrap';
            p.textContent = slokaData[lang];
            slokaContainer.appendChild(p);
        }
    });
    return slokaContainer;
}

// Graha table
function createGrahaTable() {
    const table = document.createElement('table');
    table.className = 'graha-table';
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['Deity Type', 'Name & Location', 'Dhyana Sloka & Naama Mantra'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    if (state.data.grahas && state.data.grahas.length) {
        state.data.grahas.forEach(graha => {
            let row = tbody.insertRow();
            row.insertCell().textContent = 'Planet';
            row.insertCell().innerHTML = `${graha.planet.name} <br><small>(${graha.planet.attribute})</small><br><b>Location: ${graha.planet.location}</b>`;
            row.insertCell().innerHTML = `<p><em>${graha.planet.dhyana_sloka}</em></p><strong>${graha.planet.naama_mantra}</strong>`;

            row = tbody.insertRow();
            row.classList.add('deity-row');
            row.insertCell().textContent = 'Ruling Deity';
            row.insertCell().innerHTML = `${graha.ruling_deity.name}<br><b>Location: ${graha.ruling_deity.location}</b>`;
            row.insertCell().innerHTML = `<p><em>${graha.ruling_deity.dhyana_sloka}</em></p><strong>${graha.ruling_deity.naama_mantra}</strong>`;

            row = tbody.insertRow();
            row.classList.add('deity-row');
            row.insertCell().textContent = 'Co-ruling Deity';
            row.insertCell().innerHTML = `${graha.coruling_deity.name}<br><b>Location: ${graha.coruling_deity.location}</b>`;
            row.insertCell().innerHTML = `<p><em>${graha.coruling_deity.dhyana_sloka}</em></p><strong>${graha.coruling_deity.naama_mantra}</strong>`;
        });
    } else {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.textContent = 'No graha data available';
    }
    return table;
}

// Dikpalaka table
function createDikpalakaTable() {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = {
        deity: {devanagari: 'देवता', english: 'Deity', telugu: 'దేవత'},
        sloka_mantra: {devanagari: 'ध्यान श्लोक व नाम मन्त्र', english: 'Dhyana Sloka & Naama Mantra', telugu: 'ధ్యాన శ్లోక మరియు నామ మంత్రం'}
    };
    Object.values(headers).forEach(group => {
        const th = document.createElement('th');
        Object.entries(group).forEach(([lang, text]) => {
            const span = document.createElement('span');
            span.className = `lang-${lang}`;
            span.textContent = text;
            th.appendChild(span);
        });
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();
    (state.data.dikpalakas || []).forEach(dp => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell();
        const slokaMantraCell = row.insertCell();
        nameCell.textContent = dp.name;

        const dhyanaContainer = document.createElement('div');
        Object.entries(dp.dhyana_sloka || {}).forEach(([lang, text]) => {
            const p = document.createElement('p');
            p.className = `sloka-text lang-${lang}`;
            p.style.whiteSpace = 'pre-wrap';
            p.style.fontStyle = 'italic';
            p.textContent = text;
            dhyanaContainer.appendChild(p);
        });
        const mantraContainer = document.createElement('div');
        Object.entries(dp.naama_mantra || {}).forEach(([lang, text]) => {
            const p = document.createElement('p');
            p.className = `sloka-text lang-${lang}`;
            p.style.whiteSpace = 'pre-wrap';
            p.style.fontWeight = 'bold';
            p.textContent = text;
            mantraContainer.appendChild(p);
        });
        slokaMantraCell.appendChild(dhyanaContainer);
        slokaMantraCell.appendChild(mantraContainer);
    });
    return table;
}

// Collective Shodasopachara Pooja table
export function createCollectivePoojaTable() {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = {
        service: {devanagari: 'सेवा', english: 'Service', telugu: 'సేవ'},
        mantra: {devanagari: 'मन्त्र', english: 'Mantra', telugu: 'మంత్రం'},
        action: {devanagari: 'क्रिया', english: 'Action', telugu: 'క్రియ'}
    };
    Object.values(headers).forEach(group => {
        const th = document.createElement('th');
        Object.entries(group).forEach(([lang,text]) => {
            const span = document.createElement('span');
            span.className = `lang-${lang}`;
            span.textContent = text;
            th.appendChild(span);
        });
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();

    const services = [
        { service:{devanagari:'आसनं',english:'Seat',telugu:'ఆసనం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। आसनं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Aasanam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। ఆసనం సమర్పయామి।'}, action:'Offer Seat with akshatas' },
        { service:{devanagari:'पाद्यं',english:'Feet Water',telugu:'పాద్యం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। पादयोः पाद्यं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Paadayoh Paadyam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। పాదయోః పాద్యం సమర్పయామి।'}, action:'Offer water for feet' },
        { service:{devanagari:'अर्घ्यं',english:'Hand Water',telugu:'అర్ఘ్యం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। हस्तयोः अर्घ्यं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Hastayoh Arghyam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। హస్తయోః అర్ఘ్యం సమర్పయామి।'}, action:'Offer water for hands' },
        { service:{devanagari:'आचमनीयं',english:'Sipping Water',telugu:'ఆచమనీయం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। मुखे शुद्धाचमनीयं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Mukhe Shuddhaachamaneeyam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। ముఖే శుద్ధాచమనీయం సమర్పయామి।'}, action:'Offer water for sipping' },
        { service:{devanagari:'स्नानं',english:'Bath',telugu:'స్నానం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। स्नपयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Snapayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। స్నపయామి।'}, action:'Offer bath with water' },
        { service:{devanagari:'वस्त्रं',english:'Clothes',telugu:'వస్త్రం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। वस्त्राणि धारयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Vastraani Dhaarayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। వస్త్రాణి ధారయామి।'}, action:'Offer clothes with akshatas' },
        { service:{devanagari:'यज्ञोपवीतं',english:'Sacred Thread',telugu:'యజ్ఞోపవీతం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। यज्ञोपवीतं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Yajnopaveetam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। యజ్ఞోపవీతం సమర్పయామి।'}, action:'Offer sacred thread with akshatas' },
        { service:{devanagari:'गन्धं',english:'Sandalwood',telugu:'గంధం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। गन्धान् धारयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Gandhaan Dhaarayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। గంధాన్ ధారయామి।'}, action:'Offer sandalwood paste, etc.' },
        { service:{devanagari:'आभरणानि',english:'Ornaments',telugu:'ఆభరణాని'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। आभरणानि समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Aabharanaani Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। ఆభరణాని సమర్పయామి।'}, action:'Offer ornaments with akshatas' },
        { service:{devanagari:'पुष्पं',english:'Flowers',telugu:'పుష్పం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। पुष्पैः पूजयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Pushpaih Poojayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। పుష్పైః పూజయామి।'}, action:'Worship with flowers' },
        { service:{devanagari:'धूपं',english:'Incense',telugu:'ధూపం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। धूपं आघ्रापयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Dhoopam Aaghraapayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। ధూపం ఆఘ్రాపయామి।'}, action:'Offer incense' },
        { service:{devanagari:'दीपं',english:'Lamp',telugu:'దీపం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। दीपं दर्शयామि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Deepam Darshayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। దీపం దర్శయామి।'}, action:'Offer lamp' },
        { service:{devanagari:'नैवेद्यं',english:'Food',telugu:'నైవేద్యం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। नैवेद्यं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Naivedyam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। నైవేద్యం సమర్పయామి।'}, action:'Offer food' },
        { service:{devanagari:'ताम्बूलं',english:'Paan',telugu:'తాంబూలం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। ताम्बूलं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Taamboolam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। తాంబూలం సమర్పయామి।'}, action:'Offer paan with akshatas' },
        { service:{devanagari:'कर्पूरनीराजनं',english:'Camphor Light',telugu:'కర్పూరనీరాజనం'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। कर्पूरनीराजनं समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Karpooraneeraajanam Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। కర్పూరనీరాజనం సమర్పయామి।'}, action:'Offer camphor light' },
        { service:{devanagari:'प्रदक्षिण नमस्कारान्',english:'Circumambulation',telugu:'ప్రదక్షిణ నమస్కారాన్'}, mantra:{devanagari:'ॐ गणेशादि...देवताभ्यो नमः। प्रदक्षिण नमस्कारान् समर्पयामि।', english:'Om Ganeshaaadi...Devataabhyo Namaha. Pradakshina Namaskaaraan Samarpayaami.', telugu:'ఓం గణేశాది...దేవతాభ్యో నమః। ప్రదక్షిణ నమస్కారాన్ సమర్పయామి।'}, action:'Offer circumambulation and prostrations' }
    ];

    services.forEach(svc => {
        const row = tbody.insertRow();
        const serviceCell = row.insertCell();
        const mantraCell = row.insertCell();
        const actionCell = row.insertCell();
        Object.entries(svc.service).forEach(([lang,text]) => {
            const span = document.createElement('span');
            span.className = `lang-${lang}`;
            span.textContent = text;
            serviceCell.appendChild(span);
        });
        Object.entries(svc.mantra).forEach(([lang,text]) => {
            const p = document.createElement('p');
            p.className = `sloka-text lang-${lang}`;
            p.style.whiteSpace = 'pre-wrap';
            p.textContent = text;
            mantraCell.appendChild(p);
        });
        actionCell.textContent = svc.action;
    });
    return table;
}

// Ganapathi Pooja table
function createGanapathiPoojaTable() {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = { service:{devanagari:'सेवा',english:'Service',telugu:'సేవ'}, mantra:{devanagari:'मन्त्र',english:'Mantra',telugu:'మంత్రం'}, action:{devanagari:'क्रिया',english:'Action',telugu:'క్రియ'} };
    Object.values(headers).forEach(group => {
        const th = document.createElement('th');
        Object.entries(group).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; th.appendChild(span); });
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();
    (state.data.ganapathi_pooja_services || []).forEach(item => {
        const row = tbody.insertRow();
        const serviceCell = row.insertCell();
        const mantraCell = row.insertCell();
        const actionCell = row.insertCell();
        Object.entries(item.service || {}).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; serviceCell.appendChild(span); });
        Object.entries(item.mantra || {}).forEach(([lang,text]) => { const p = document.createElement('p'); p.className = `sloka-text lang-${lang}`; p.style.whiteSpace = 'pre-wrap'; p.textContent = text; mantraCell.appendChild(p); });
        actionCell.textContent = item.action || '';
    });
    return table;
}

// Varuna Pooja table (reuse Ganapathi structure by textual replacement)
function createVarunaPoojaTable() {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = { service:{devanagari:'सेवा',english:'Service',telugu:'సేవ'}, mantra:{devanagari:'मन्त्र',english:'Mantra',telugu:'మంత్రం'}, action:{devanagari:'क्रिया',english:'Action',telugu:'క్రియ'} };
    Object.values(headers).forEach(group => {
        const th = document.createElement('th');
        Object.entries(group).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; th.appendChild(span); });
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();
    (state.data.varuna_pooja_services || state.data.ganapathi_pooja_services || []).forEach(item => {
        const row = tbody.insertRow();
        const serviceCell = row.insertCell();
        const mantraCell = row.insertCell();
        const actionCell = row.insertCell();
        Object.entries(item.service || {}).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; serviceCell.appendChild(span); });
        Object.entries(item.mantra || {}).forEach(([lang,text]) => { const p = document.createElement('p'); p.className = `sloka-text lang-${lang}`; p.style.whiteSpace = 'pre-wrap'; p.textContent = text; mantraCell.appendChild(p); });
        actionCell.textContent = item.action || '';
    });
    return table;
}

// Anga Pooja table (guard against incomplete entries)
function createAngaPoojaTable() {
    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = { service:{devanagari:'अंग',english:'Limb',telugu:'అంగం'}, mantra:{devanagari:'मन्त्र',english:'Mantra',telugu:'మంత్రం'}, action:{devanagari:'क्रिया',english:'Action',telugu:'క్రియ'} };
    Object.values(headers).forEach(group => {
        const th = document.createElement('th');
        Object.entries(group).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; th.appendChild(span); });
        headerRow.appendChild(th);
    });
    const tbody = table.createTBody();
    (state.data.anga_pooja_services || []).forEach(item => {
        const row = tbody.insertRow();
        const serviceCell = row.insertCell();
        const mantraCell = row.insertCell();
        const actionCell = row.insertCell();
        Object.entries(item.service || {}).forEach(([lang,text]) => { const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; serviceCell.appendChild(span); });
        Object.entries(item.mantra || {}).forEach(([lang,text]) => { const p = document.createElement('p'); p.className = `sloka-text lang-${lang}`; p.style.whiteSpace = 'pre-wrap'; p.textContent = text; mantraCell.appendChild(p); });
        actionCell.textContent = item.action || '';
    });
    return table;
}

// Generic content element creator
export function createContentElement(element) {
    let el;
    switch (element.type) {
        case 'h3': el = document.createElement('h3'); el.innerHTML = element.text; break;
        case 'h4': el = document.createElement('h4'); el.innerHTML = element.text; break;
        case 'paragraph': el = document.createElement('p'); el.innerHTML = element.text; break;
        case 'list':
            el = document.createElement('ul');
            if (element.class) el.className = element.class;
            (element.items || []).forEach(txt => { const li = document.createElement('li'); li.innerHTML = txt; el.appendChild(li); });
            break;
        case 'table':
            el = document.createElement('table');
            const thead = el.createTHead();
            const hr = thead.insertRow();
            (element.headers || []).forEach(h => { const th = document.createElement('th'); th.innerHTML = h; hr.appendChild(th); });
            const tbody = el.createTBody();
            (element.rows || []).forEach(r => { const row = tbody.insertRow(); r.forEach(c => { const cell = row.insertCell(); cell.innerHTML = c; }); });
            break;
        case 'sloka': el = createSlokaElement(element); break;
        case 'graha_table': el = createGrahaTable(); break;
        case 'dikpalaka_table': el = createDikpalakaTable(); break;
        case 'collective_pooja_table': el = createCollectivePoojaTable(); break;
        case 'ganapathi_pooja_table': el = createGanapathiPoojaTable(); break;
        case 'varuna_pooja_table': el = createVarunaPoojaTable(); break;
        case 'anga_pooja_table': el = createAngaPoojaTable(); break;
        default:
            el = document.createElement('div');
            el.innerHTML = `<p style="color:red;">Unknown content type: ${element.type}</p>`;
    }
    return el;
}
