import type { AppConfig } from '../src/types/index.js';

export const APP_CONFIG: AppConfig = {
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
  display: {
    maxDigits: 12,
    decimalPlaces: 10,
    showPreviousOperation: true,
    animateButtons: true,
  },
  development: {
    showDevTools: false,
    enableLogging: true,
    logLevel: "info",
  },
  features: {
    keyboardSupport: true,
    percentageCalculation: true,
  },
};

export default APP_CONFIG;