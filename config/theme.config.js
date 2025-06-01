/**
 * Theme configuration for the calculator
 * Easily switch between themes or create new ones
 */

export const THEMES = {
  default: {
    name: "Default",
    colors: {
      background: "#f8f9fa",
      calculatorBg: "#ffffff",
      displayBg: "#343a40",
      displayText: "#ffffff",
      displaySecondary: "rgba(255, 255, 255, 0.75)",
      buttonBg: "#ffffff",
      buttonHover: "#f1f3f5",
      buttonActive: "#e9ecef",
      buttonText: "#212529",
      specialButton: "#fa5252",
      operatorButton: "#4c6ef5",
      equalsButton: "#4c6ef5",
      equalsButtonHover: "#3b5bdb",
      border: "#e9ecef",
      shadow: "rgba(0, 0, 0, 0.1)",
    },
    fonts: {
      primary: 'Geist Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Geist Mono, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
    },
    borderRadius: "12px",
    buttonBorderRadius: "8px",
  },

  dark: {
    name: "Dark",
    colors: {
      background: "#1a1a1a",
      calculatorBg: "#2d2d2d",
      displayBg: "#1a1a1a",
      displayText: "#ffffff",
      displaySecondary: "rgba(255, 255, 255, 0.6)",
      buttonBg: "#404040",
      buttonHover: "#4a4a4a",
      buttonActive: "#353535",
      buttonText: "#ffffff",
      specialButton: "#ff6b6b",
      operatorButton: "#5c7cfa",
      equalsButton: "#5c7cfa",
      equalsButtonHover: "#4c63d2",
      border: "#404040",
      shadow: "rgba(0, 0, 0, 0.3)",
    },
    fonts: {
      primary: 'Geist Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Geist Mono, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
    },
    borderRadius: "12px",
    buttonBorderRadius: "8px",
  },

  minimal: {
    name: "Minimal",
    colors: {
      background: "#ffffff",
      calculatorBg: "#ffffff",
      displayBg: "#f8f9fa",
      displayText: "#212529",
      displaySecondary: "rgba(33, 37, 41, 0.6)",
      buttonBg: "transparent",
      buttonHover: "#f8f9fa",
      buttonActive: "#e9ecef",
      buttonText: "#212529",
      specialButton: "#dc3545",
      operatorButton: "#007bff",
      equalsButton: "#007bff",
      equalsButtonHover: "#0056b3",
      border: "#dee2e6",
      shadow: "none",
    },
    fonts: {
      primary: 'Geist Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Geist Mono, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
    },
    borderRadius: "4px",
    buttonBorderRadius: "4px",
  },
}

export const DEFAULT_THEME = "Default"

export default THEMES
