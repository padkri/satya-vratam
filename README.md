# Sri Satya Narayana Vratam - Interactive Guide

An interactive web application for the Sri Satya Narayana Vratam ritual, featuring multi-language support, step-by-step navigation, and interactive graha (planetary) diagram.

## Project Structure

```
satya-narayana-vratam/
├── vratam.html         # Main HTML application file
├── vratam.json         # Ritual steps and content data
├── peetam.svg          # Interactive graha locations diagram
├── 9grahas.svg         # Original SVG diagram (legacy)
└── README.md           # This documentation
```

## Architecture

The application follows a modular architecture with clear separation of concerns:

### 1. HTML Structure (`vratam.html`)
- **Main Interface**: Progressive navigation with step completion tracking
- **Interactive Components**: Multi-level navigation for complex ritual parts
- **Language Support**: Dynamic switching between Devanagari, English, and Telugu
- **Responsive Design**: Mobile-friendly layout with CSS Grid and Flexbox

### 2. Data Layer (`vratam.json`)
- **Steps**: Complete ritual steps with hierarchical content
- **Interactive Parts**: Graha navigation with location mapping
- **Multi-language Content**: Mantras and instructions in three languages
- **Service Tables**: Detailed pooja services with actions and mantras

### 3. Visualization (`peetam.svg`)
- **Interactive Diagram**: Graha and deity placement visualization
- **Highlighting System**: Visual feedback for selected locations
- **Scalable Graphics**: SVG format for crisp rendering at any size

## Key Features

### 📱 Progressive Navigation
- Step-by-step ritual guidance
- Progress tracking with visual indicators
- Navigation restrictions to maintain proper sequence

### 🌐 Multi-language Support
- Devanagari (Sanskrit)
- English (transliteration)
- Telugu (regional language)
- Dynamic language switching

### 🎯 Interactive Graha Navigation
- Visual diagram of ritual setup
- Real-time highlighting of graha locations
- Detailed information for each planetary position

### 📊 Dynamic Content Generation
- Table creation for various pooja services
- Sloka rendering with proper formatting
- Content adaptation based on context

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Data Format**: JSON for structured content
- **Graphics**: SVG for scalable vector illustrations
- **Styling**: CSS Custom Properties (CSS Variables)
- **Architecture**: Modular, component-based approach

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for file loading due to CORS restrictions)

### Running the Application

#### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the project directory
cd satya-narayana-vratam

# Start local server (Python 3)
python3 -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000

# Open browser and navigate to:
# http://localhost:8000/vratam.html
```

#### Option 2: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd satya-narayana-vratam

# Start server
http-server -p 8000

# Open browser and navigate to:
# http://localhost:8000/vratam.html
```

#### Option 3: Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `vratam.html`
3. Select "Open with Live Server"

## File Dependencies

The application requires all three main files to be in the same directory:

1. **vratam.html** - Loads and coordinates the other files
2. **vratam.json** - Contains all ritual content and data
3. **peetam.svg** - Provides the interactive graha diagram

## Development

### Adding New Content
1. **New Steps**: Add to `steps` array in `vratam.json`
2. **Interactive Parts**: Add `parts` array with `hasSubNavigation: true`
3. **Graha Items**: Include `location` property for diagram highlighting

### Modifying the Diagram
1. Edit `peetam.svg` using any SVG editor
2. Ensure group elements have proper `id` attributes (g1, g1a, g1p, etc.)
3. Maintain the existing structure for highlighting compatibility

### Language Support
Each text element should include all three language variants:
```json
{
  "mantra": {
    "devanagari": "ॐ गं गणपतये नमः",
    "english": "Om Gam Ganapataye Namah",
    "telugu": "ఓం గం గణపతయే నమః"
  }
}
```

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive design supports mobile usage

## Performance Considerations

- **Lazy Loading**: SVG and content loaded on demand
- **Efficient DOM**: Minimal DOM manipulation with event delegation
- **CSS Optimization**: Uses CSS Grid and Flexbox for efficient layouts
- **Memory Management**: Proper cleanup of event listeners

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following the existing code style
4. Test with local server
5. Submit a pull request

## License

This project is created for educational and cultural preservation purposes. Please respect the traditional nature of the content when making modifications.

## Support

For technical issues or content corrections, please create an issue in the repository with:
- Browser version and OS
- Steps to reproduce the problem
- Expected vs actual behavior
- Any console error messages
