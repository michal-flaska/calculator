export interface ButtonConfig {
  type: 'number' | 'operator' | 'special' | 'equals';
  action?: string;
  value?: string;
  label: string;
  class: string;
  span?: number;
}

export interface KeyboardMapping {
  type: 'number' | 'operator' | 'special' | 'equals';
  action?: string;
  value?: string;
}

export interface ThemeColors {
  background: string;
  calculatorBg: string;
  displayBg: string;
  displayText: string;
  displaySecondary: string;
  buttonBg: string;
  buttonHover: string;
  buttonActive: string;
  buttonText: string;
  specialButton: string;
  operatorButton: string;
  equalsButton: string;
  equalsButtonHover: string;
  border: string;
  shadow: string;
}

export interface ThemeFonts {
  primary: string;
  mono: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: string;
  buttonBorderRadius: string;
}

export interface DisplayState {
  current: string;
  previous: string;
  hasError: boolean;
}

export interface AppConfig {
  window: {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    resizable: boolean;
    alwaysOnTop: boolean;
    frame: boolean;
    titleBarStyle: string;
  };
  display: {
    maxDigits: number;
    decimalPlaces: number;
    showPreviousOperation: boolean;
    animateButtons: boolean;
  };
  development: {
    showDevTools: boolean;
    enableLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  features: {
    keyboardSupport: boolean;
    percentageCalculation: boolean;
  };
}

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';