import type { ButtonConfig, KeyboardMapping } from '../types/index.js';

export const BUTTON_LAYOUT: ButtonConfig[][] = [
  [
    { type: "special", action: "clear", label: "AC", class: "clear-btn" },
    { type: "special", action: "delete", label: "DEL", class: "delete-btn" },
    { type: "special", action: "percent", label: "%", class: "percent-btn" },
    { type: "operator", action: "divide", label: "÷", class: "operator-btn" },
  ],
  [
    { type: "number", value: "7", label: "7", class: "number-btn" },
    { type: "number", value: "8", label: "8", class: "number-btn" },
    { type: "number", value: "9", label: "9", class: "number-btn" },
    { type: "operator", action: "multiply", label: "×", class: "operator-btn" },
  ],
  [
    { type: "number", value: "4", label: "4", class: "number-btn" },
    { type: "number", value: "5", label: "5", class: "number-btn" },
    { type: "number", value: "6", label: "6", class: "number-btn" },
    { type: "operator", action: "subtract", label: "−", class: "operator-btn" },
  ],
  [
    { type: "number", value: "1", label: "1", class: "number-btn" },
    { type: "number", value: "2", label: "2", class: "number-btn" },
    { type: "number", value: "3", label: "3", class: "number-btn" },
    { type: "operator", action: "add", label: "+", class: "operator-btn" },
  ],
  [
    { type: "number", value: "0", label: "0", class: "number-btn zero-btn", span: 2 },
    { type: "number", value: ".", label: ".", class: "number-btn decimal-btn" },
    { type: "equals", action: "calculate", label: "=", class: "equals-btn" },
  ],
];

export const KEYBOARD_MAPPINGS: Record<string, KeyboardMapping> = {
  "0": { type: "number", value: "0" },
  "1": { type: "number", value: "1" },
  "2": { type: "number", value: "2" },
  "3": { type: "number", value: "3" },
  "4": { type: "number", value: "4" },
  "5": { type: "number", value: "5" },
  "6": { type: "number", value: "6" },
  "7": { type: "number", value: "7" },
  "8": { type: "number", value: "8" },
  "9": { type: "number", value: "9" },
  ".": { type: "number", value: "." },
  "+": { type: "operator", action: "add" },
  "-": { type: "operator", action: "subtract" },
  "*": { type: "operator", action: "multiply" },
  "/": { type: "operator", action: "divide" },
  "%": { type: "special", action: "percent" },
  "Enter": { type: "equals", action: "calculate" },
  "=": { type: "equals", action: "calculate" },
  "Backspace": { type: "special", action: "delete" },
  "Delete": { type: "special", action: "clear" },
  "Escape": { type: "special", action: "clear" },
};