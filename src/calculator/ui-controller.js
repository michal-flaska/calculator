/**
 * UI Controller for the calculator
 * Manages DOM interactions and user interface updates
 */

import { BUTTON_LAYOUT, KEYBOARD_MAPPINGS } from "../../config/buttons.config.js"
import { THEMES, DEFAULT_THEME } from "../../config/theme.config.js"
import { APP_CONFIG } from "../../config/app.config.js"
import { createLogger } from "../utils/logger.js"
import CalculatorEngine from "./calculator-engine.js"

const logger = createLogger("ui-controller")

export class UIController {
  constructor() {
    this.engine = new CalculatorEngine()
    this.currentTheme = DEFAULT_THEME
    this.elements = {}

    this.init()
    logger.info("UI Controller initialized")
  }

  /**
   * Initialize the UI controller
   */
  init() {
    this.cacheElements()
    this.generateButtons()
    this.attachEventListeners()
    this.applyTheme(this.currentTheme)
    this.updateDisplay()
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.elements = {
      calculator: document.querySelector(".calculator"),
      display: document.querySelector(".display"),
      currentOperand: document.getElementById("current-operand"),
      previousOperand: document.getElementById("previous-operand"),
      buttonsContainer: document.querySelector(".buttons"),
    }

    logger.debug("DOM elements cached")
  }

  /**
   * Generate calculator buttons from configuration
   */
  generateButtons() {
    if (!this.elements.buttonsContainer) return

    this.elements.buttonsContainer.innerHTML = ""

    BUTTON_LAYOUT.forEach((row) => {
      row.forEach((buttonConfig) => {
        const button = this.createButton(buttonConfig)
        this.elements.buttonsContainer.appendChild(button)
      })
    })

    logger.debug("Buttons generated from configuration")
  }

  /**
   * Create a button element from configuration
   * @param {Object} config - Button configuration
   * @returns {HTMLElement} Button element
   */
  createButton(config) {
    const button = document.createElement("button")

    // Set button text
    button.textContent = config.label

    // Add classes
    button.className = `btn ${config.class}`
    if (config.type) button.classList.add(`btn-${config.type}`)
    if (config.span) button.style.gridColumn = `span ${config.span}`

    // Add data attributes
    if (config.type) button.dataset.type = config.type
    if (config.action) button.dataset.action = config.action
    if (config.value) button.dataset.value = config.value

    // Add click handler
    button.addEventListener("click", () => this.handleButtonClick(config))

    return button
  }

  /**
   * Handle button click events
   * @param {Object} config - Button configuration
   */
  handleButtonClick(config) {
    if (APP_CONFIG.display.animateButtons) {
      this.animateButton(event.target)
    }

    switch (config.type) {
      case "number":
        this.engine.inputNumber(config.value)
        break
      case "operator":
        this.engine.chooseOperation(config.action)
        break
      case "equals":
        this.engine.calculate()
        break
      case "special":
        this.handleSpecialAction(config.action)
        break
    }

    this.updateDisplay()
    logger.debug(`Button clicked: ${config.label}`)
  }

  /**
   * Handle special button actions
   * @param {string} action - Action to perform
   */
  handleSpecialAction(action) {
    switch (action) {
      case "clear":
        this.engine.reset()
        break
      case "delete":
        this.engine.delete()
        break
      case "percent":
        this.engine.percentage()
        break
    }
  }

  /**
   * Animate button press
   * @param {HTMLElement} button - Button element to animate
   */
  animateButton(button) {
    button.style.transform = "scale(0.95)"
    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 100)
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Keyboard support
    if (APP_CONFIG.features.keyboardSupport) {
      document.addEventListener("keydown", (e) => this.handleKeyboardInput(e))
    }

    logger.debug("Event listeners attached")
  }

  /**
   * Handle keyboard input
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyboardInput(event) {
    const mapping = KEYBOARD_MAPPINGS[event.key]

    if (!mapping) return

    // Prevent default browser behavior for certain keys
    if (event.key === "/" || event.key === "Enter") {
      event.preventDefault()
    }

    // Simulate button click
    this.handleButtonClick(mapping)

    // Visual feedback for keyboard input
    this.highlightKeyboardButton(mapping)

    logger.debug(`Keyboard input: ${event.key}`)
  }

  /**
   * Highlight button for keyboard input
   * @param {Object} mapping - Keyboard mapping
   */
  highlightKeyboardButton(mapping) {
    const button = this.findButtonByMapping(mapping)
    if (button && APP_CONFIG.display.animateButtons) {
      button.classList.add("keyboard-active")
      setTimeout(() => {
        button.classList.remove("keyboard-active")
      }, 150)
    }
  }

  /**
   * Find button element by mapping
   * @param {Object} mapping - Keyboard mapping
   * @returns {HTMLElement|null} Button element
   */
  findButtonByMapping(mapping) {
    const selector = mapping.value ? `[data-value="${mapping.value}"]` : `[data-action="${mapping.action}"]`

    return this.elements.buttonsContainer.querySelector(selector)
  }

  /**
   * Update the calculator display
   */
  updateDisplay() {
    const state = this.engine.getDisplayState()

    if (this.elements.currentOperand) {
      this.elements.currentOperand.textContent = state.current
    }

    if (this.elements.previousOperand && APP_CONFIG.display.showPreviousOperation) {
      this.elements.previousOperand.textContent = state.previous
    }

    // Add error styling if needed
    if (this.elements.display) {
      this.elements.display.classList.toggle("error", state.hasError)
    }

    logger.debug("Display updated:", state)
  }

  /**
   * Apply theme to the calculator
   * @param {string} themeName - Theme name
   */
  applyTheme(themeName) {
    const theme = THEMES[themeName] || THEMES[DEFAULT_THEME]

    if (!theme) {
      logger.error("Theme not found:", themeName)
      return
    }

    // Apply CSS custom properties
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
    })

    // Apply fonts
    root.style.setProperty("--font-primary", theme.fonts.primary)
    root.style.setProperty("--font-mono", theme.fonts.mono)

    // Apply border radius
    root.style.setProperty("--border-radius", theme.borderRadius)
    root.style.setProperty("--button-border-radius", theme.buttonBorderRadius)

    this.currentTheme = themeName
    logger.info("Theme applied:", themeName)
  }

  /**
   * Toggle between themes
   */
  toggleTheme() {
    const themeNames = Object.keys(THEMES)
    const currentIndex = themeNames.indexOf(this.currentTheme)
    const nextIndex = (currentIndex + 1) % themeNames.length
    const nextTheme = themeNames[nextIndex]

    this.applyTheme(nextTheme)
    logger.info("Theme toggled to:", nextTheme)
  }

  /**
   * Get current calculator state
   * @returns {Object} Current state
   */
  getState() {
    return {
      display: this.engine.getDisplayState(),
      theme: this.currentTheme,
    }
  }
}

export default UIController
