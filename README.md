# Calculator

A highly configurable, maintainable calculator built with Electron, featuring modern design with Geist fonts and TailwindCSS-inspired styling.

## ✨ Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculation
- Clear and delete functionality
- Keyboard support
- Clean, modern UI
- **Highly Configurable**: Easy-to-modify configuration files for themes, buttons, and app behavior
- **Modern Design**: Clean UI with Geist Sans and Geist Mono fonts
- **Multiple Themes**: Default, Dark, and Minimal themes with easy theme switching
- **Responsive**: Adapts to different screen sizes
- **Accessible**: WCAG compliant with proper focus management
- **Maintainable**: Modular architecture with clear separation of concerns
- **Error Handling**: Comprehensive error handling and logging
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pilot2254/calculator.git
   cd calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

### Development

Run in development mode with additional logging:
```bash
npm run dev
```

## 🎨 Configuration

### Themes

Edit \`config/theme.config.js\` to modify existing themes or add new ones:

```javascript
export const THEMES = {
  myCustomTheme: {
    name: 'My Custom Theme',
    colors: {
      background: '#your-color',
      // ... other colors
    }
  }
}
```

### Button Layout

Modify \`config/buttons.config.js\` to change button layout or add new functions:

```javascript
export const BUTTON_LAYOUT = [
  [
    { type: 'special', action: 'clear', label: 'AC' },
    // ... other buttons
  ]
]
```

### App Settings

Adjust \`config/app.config.js\` for window size, features, and behavior:

```javascript
export const APP_CONFIG = {
  window: {
    width: 320,
    height: 500,
    // ... other settings
  }
}
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| \`0-9\` | Number input |
| \`.\` | Decimal point |
| \`+\`, \`-\`, \`*\`, \`/\` | Operations |
| \`Enter\` or \`=\` | Calculate |
| \`Backspace\` | Delete last digit |
| \`Escape\` or \`Delete\` | Clear |
| \`%\` | Percentage |
| \`Cmd/Ctrl+T\` | Toggle always on top |
| \`Cmd/Ctrl+D\` | Toggle theme |
| \`Cmd/Ctrl+Q\` | Quit |

## 🏗️ Architecture

```
src/
├── main.js                   # Main Electron process
├── renderer.js               # Renderer entry point
├── calculator/
│   ├── calculator-engine.js  # Core calculation logic
│   └── ui-controller.js      # UI management
└── utils/
    └── logger.js             # Logging utility

config/
├── app.config.js             # Main app configuration
├── theme.config.js           # Theme definitions
└── buttons.config.js         # Button layout & keyboard mappings
```

## 🔧 Building for Distribution

To build the application for your platform:

```
npm run build
```

Build for all platforms:
```
npm run build:all
```

## 🎯 Future Enhancements

The modular architecture makes it easy to add:

- [ ] Scientific calculator mode
- [ ] Calculation history
- [ ] Memory functions (MC, MR, M+, M-)
- [ ] Unit conversions
- [ ] Custom themes editor
- [ ] Plugin system
- [ ] Cloud sync

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) - Framework for building cross-platform desktop apps
- [Geist Font](https://vercel.com/font) - Beautiful typography by Vercel
- [TailwindCSS](https://tailwindcss.com/) - Inspiration for utility-first styling approach
- [Geist Font](https://vercel.com/font) - Beautiful typography by Vercel