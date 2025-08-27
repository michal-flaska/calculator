# Calculator

A highly configurable, maintainable calculator built with Electron, with a heavy config options.

## Features

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

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Development

Run in development mode with additional logging:
```bash
npm run dev
```

## Configuration

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

## Keyboard Shortcuts

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

## Building for Distribution

To build the application for your platform:

```
npm run build
```

Build for all platforms:
```
npm run build:all
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
