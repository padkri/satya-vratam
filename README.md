# Sri Satya Narayana Vratam – Interactive Guide

An interactive single‑page web application that guides a devotee through the Sri Satya Narayana Vratam with multi‑language support (Devanagari, English transliteration, Telugu), dynamic ritual tables, and interactive deity / graha navigation.

## Project Structure
```
satya-narayana-vratam/
├── index.html          # Main application entry (loads JS modules)
├── vratam.json         # Ritual steps, tables, mantras, multi‑language data
├── peetam.svg          # Diagram used for highlighting grahas / deities
├── js/
│   ├── main.js         # Bootstraps app, loads data, initializes UI
│   └── modules/
│       ├── state.js        # Global state + data loading
│       ├── ui.js           # Navigation + language switching UI
│       ├── elements.js     # Dynamic element/table/sloka factories
│       ├── interactive.js  # Interactive step/part rendering & sub‑nav
│       └── diagram.js      # SVG peetam highlight logic
├── css/
│   └── style.css       # Styling, responsive layout, language classes
├── vratam_backup.json  # Backup of content
├── LICENSE
└── README.md
```

## Key Features
- Step navigation with Previous / Next controls
- Interactive multi‑part (Parivaara Devataa) section with sub‑navigation
- SVG peetam highlighting for grahas / dikpalakas (lokapālakās)
- Dynamic ritual service tables:
  - Ganapathi Pooja
  - Varuna Pooja
  - Collective Shodasopachara Pooja
  - Anga Pooja
  - Graha (Planetary) Table
  - Dikpalaka (Directional Deities) Table
- Sloka rendering with preserved line breaks & language toggling
- Clean modular ES6 code (no frameworks)

## Data Model (Excerpt)
Each content block in `vratam.json` is an object with a `type` consumed by `createContentElement`:
```
{
  "type": "sloka",
  "devanagari": "ॐ गं गणपतये नमः ।",
  "english": "Om Gam Ganapataye Namah.",
  "telugu": "ఓం గం గణపతయే నమః."
}
```
Tables use specialized types, e.g. `ganapathi_pooja_table`, `collective_pooja_table`, etc. Multi‑language headers and rows are generated in code; only the source arrays (e.g. `ganapathi_pooja_services`) live in JSON.

## Language Switching
The selector (English / Devanagari / Telugu) toggles visibility by applying `lang-<code>` classes. Elements are rendered with parallel `<span>` or `<p>` nodes per language; CSS hides non‑selected languages.

## Running the App
Use a simple local HTTP server (files loaded via fetch require HTTP, not file://):
```bash
cd satya-narayana-vratam
python3 -m http.server 8000
# Then open: http://localhost:8000/index.html
```

## Adding / Editing Content
1. Open `vratam.json`.
2. Locate the step (`steps` array). For interactive parts, update the `parts` array inside that step.
3. Add content objects with supported `type` values:
   - `h3`, `h4`, `paragraph`, `list`, `table`, `sloka`
   - Specialized: `graha_table`, `dikpalaka_table`, `ganapathi_pooja_table`, `varuna_pooja_table`, `collective_pooja_table`, `anga_pooja_table`
4. For new slokas, always provide all language keys where available. Missing keys are simply skipped in the renderer.
5. For a new service table variant, add a data array in JSON (mirroring existing ones) and implement a creator in `elements.js` if a new `type` is required.

## SVG Integration
`peetam.svg` contains grouped elements with IDs referenced by `diagram.js` for highlighting. Adding new diagram points:
1. Add an identifiable `id` in the SVG.
2. Map JSON entries (grahas / dikpalakas) to that `id`.
3. Highlight logic automatically reflects current selection.

## Styling Notes
- Slokas: `.sloka-text` with `white-space: pre-wrap` preserves formatting.
- Tables: Uniform three‑column layout (Service | Mantra | Action) except for specialized multi‑row graha table.
- Language classes: `.lang-english`, `.lang-devanagari`, `.lang-telugu`.

## Extending
| Task | Location | Notes |
|------|----------|-------|
| Add a new ritual step | `vratam.json` | Append to `steps` array |
| Add a new table type | `elements.js` | Add creator + switch case |
| Add diagram highlight | `peetam.svg` + JSON | Ensure unique ID mapping |
| Add language | Rendering functions | Add option + CSS + spans |

## Troubleshooting
- Blank content: Check console for JSON fetch errors (CORS if not using HTTP).
- Missing table: Confirm the `type` is handled in `createContentElement`.
- Language not switching: Ensure elements have all `lang-*` class variants.

## License
See `LICENSE` for details. Educational and cultural use encouraged; please retain attribution and respect traditional integrity.

## Attribution & Purpose
Created to assist devotees in accurately performing the Sri Satya Narayana Vratam with accessible, structured, multilingual guidance.