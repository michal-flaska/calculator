/**
 * Main application configuration
 * This file contains all configurable aspects of the calculator
 */

export const APP_CONFIG = {
  // Window configuration
  window: {
    width: 320,
    height: 500,
    minWidth: 280,
    minHeight: 400,
    resizable: false,
    alwaysOnTop: false,
    frame: true,
    titleBarStyle: "default",
  },

  // Display configuration
  display: {
    maxDigits: 12,
    decimalPlaces: 10,
    showPreviousOperation: true,
    animateButtons: true,
  },

  // Development settings
  development: {
    showDevTools: false,
    enableLogging: true,
    logLevel: "info", // 'debug', 'info', 'warn', 'error'
  },

  // Feature flags
  features: {
    keyboardSupport: true,
    percentageCalculation: true,
    memoryFunctions: false, // Future feature
    scientificMode: false, // Future feature
    history: false, // Future feature
  },
}

export default APP_CONFIG
