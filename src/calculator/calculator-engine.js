/**
 * Calculator computation engine
 * Handles all mathematical operations and state management
 */

import { APP_CONFIG } from "../../config/app.config.js"
import { createLogger } from "../utils/logger.js"

const logger = createLogger("calculator-engine")

export class CalculatorEngine {
  constructor() {
    this.reset()
    logger.info("Calculator engine initialized")
  }

  /**
   * Reset calculator to initial state
   */
  reset() {
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = null
    this.shouldResetScreen = false
    this.lastResult = null
    logger.debug("Calculator reset")
  }

  /**
   * Input a number or decimal point
   * @param {string} number - The number or decimal point to input
   */
  inputNumber(number) {
    // Handle decimal point
    if (number === "." && this.currentOperand.includes(".")) {
      logger.debug("Decimal point already exists, ignoring input")
      return
    }

    // Reset screen if needed
    if (this.currentOperand === "0" || this.shouldResetScreen) {
      this.currentOperand = number === "." ? "0." : number
      this.shouldResetScreen = false
    } else {
      // Check max digits limit
      if (this.currentOperand.replace(".", "").length >= APP_CONFIG.display.maxDigits) {
        logger.warn("Maximum digits reached")
        return
      }
      this.currentOperand += number
    }

    logger.debug(`Number input: ${number}, current: ${this.currentOperand}`)
  }

  /**
   * Choose an operation
   * @param {string} operation - The operation to perform
   */
  chooseOperation(operation) {
    if (this.currentOperand === "") return

    // If there's already an operation, calculate first
    if (this.previousOperand !== "") {
      this.calculate()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.shouldResetScreen = true

    logger.debug(`Operation chosen: ${operation}`)
  }

  /**
   * Perform the calculation
   */
  calculate() {
    let computation
    const prev = Number.parseFloat(this.previousOperand)
    const current = Number.parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) {
      logger.warn("Invalid operands for calculation")
      return
    }

    try {
      switch (this.operation) {
        case "add":
          computation = prev + current
          break
        case "subtract":
          computation = prev - current
          break
        case "multiply":
          computation = prev * current
          break
        case "divide":
          if (current === 0) {
            this.handleError("Division by zero")
            return
          }
          computation = prev / current
          break
        default:
          logger.warn("Unknown operation:", this.operation)
          return
      }

      // Format the result
      this.currentOperand = this.formatNumber(computation)
      this.lastResult = computation
      this.operation = null
      this.previousOperand = ""

      logger.info(`Calculation: ${prev} ${this.operation} ${current} = ${computation}`)
    } catch (error) {
      this.handleError("Calculation error")
      logger.error("Calculation error:", error)
    }
  }

  /**
   * Delete the last digit
   */
  delete() {
    if (this.currentOperand === "Error") {
      this.currentOperand = "0"
      return
    }

    if (this.currentOperand.length === 1) {
      this.currentOperand = "0"
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1)
    }

    logger.debug(`Delete: current operand is now ${this.currentOperand}`)
  }

  /**
   * Calculate percentage
   */
  percentage() {
    const current = Number.parseFloat(this.currentOperand)
    if (isNaN(current)) return

    const result = current / 100
    this.currentOperand = this.formatNumber(result)

    logger.debug(`Percentage: ${current}% = ${result}`)
  }

  /**
   * Format number for display
   * @param {number} number - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(number) {
    if (isNaN(number)) return "Error"

    // Handle very large or very small numbers
    if (Math.abs(number) > 10 ** APP_CONFIG.display.maxDigits) {
      return number.toExponential(APP_CONFIG.display.decimalPlaces - 1)
    }

    // Convert to string and handle precision
    let result = number.toString()

    // Limit decimal places if needed
    if (result.includes(".") && result.split(".")[1].length > APP_CONFIG.display.decimalPlaces) {
      result = number.toFixed(APP_CONFIG.display.decimalPlaces)
      // Remove trailing zeros
      result = result.replace(/\.?0+$/, "")
    }

    return result
  }

  /**
   * Handle calculation errors
   * @param {string} message - Error message
   */
  handleError(message) {
    this.currentOperand = "Error"
    this.previousOperand = ""
    this.operation = null
    logger.error("Calculator error:", message)
  }

  /**
   * Get current display state
   * @returns {Object} Display state
   */
  getDisplayState() {
    let previousDisplay = ""

    if (this.operation && this.previousOperand) {
      const operationSymbols = {
        add: "+",
        subtract: "−",
        multiply: "×",
        divide: "÷",
      }
      previousDisplay = `${this.previousOperand} ${operationSymbols[this.operation] || ""}`
    }

    return {
      current: this.currentOperand,
      previous: previousDisplay,
      hasError: this.currentOperand === "Error",
    }
  }
}

export default CalculatorEngine
