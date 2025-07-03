import { APP_CONFIG } from "../../config/app.config.js";
import { createLogger } from "../utils/logger.js";
import type { Operation, DisplayState } from "../types/index.js";

const logger = createLogger("calculator-engine");

export class CalculatorEngine {
  private currentOperand = "0";
  private previousOperand = "";
  private operation: Operation | null = null;
  private shouldResetScreen = false;

  constructor() {
    logger.info("Calculator engine initialized");
  }

  reset(): void {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = null;
    this.shouldResetScreen = false;
    logger.debug("Calculator reset");
  }

  inputNumber(number: string): void {
    if (number === "." && this.currentOperand.includes(".")) {
      logger.debug("Decimal point already exists, ignoring input");
      return;
    }

    if (this.currentOperand === "0" || this.shouldResetScreen) {
      this.currentOperand = number === "." ? "0." : number;
      this.shouldResetScreen = false;
    } else {
      if (this.currentOperand.replace(".", "").length >= APP_CONFIG.display.maxDigits) {
        logger.warn("Maximum digits reached");
        return;
      }
      this.currentOperand += number;
    }

    logger.debug(`Number input: ${number}, current: ${this.currentOperand}`);
  }

  chooseOperation(operation: Operation): void {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;

    logger.debug(`Operation chosen: ${operation}`);
  }

  calculate(): void {
    const prev = Number.parseFloat(this.previousOperand);
    const current = Number.parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) {
      logger.warn("Invalid operands for calculation");
      return;
    }

    let computation: number;

    try {
      switch (this.operation) {
        case "add":
          computation = prev + current;
          break;
        case "subtract":
          computation = prev - current;
          break;
        case "multiply":
          computation = prev * current;
          break;
        case "divide":
          if (current === 0) {
            this.handleError("Division by zero");
            return;
          }
          computation = prev / current;
          break;
        default:
          logger.warn("Unknown operation:", this.operation);
          return;
      }

      this.currentOperand = this.formatNumber(computation);
      this.operation = null;
      this.previousOperand = "";

      logger.info(`Calculation: ${prev} ${this.operation} ${current} = ${computation}`);
    } catch (error) {
      this.handleError("Calculation error");
      logger.error("Calculation error:", error);
    }
  }

  delete(): void {
    if (this.currentOperand === "Error") {
      this.currentOperand = "0";
      return;
    }

    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }

    logger.debug(`Delete: current operand is now ${this.currentOperand}`);
  }

  percentage(): void {
    const current = Number.parseFloat(this.currentOperand);
    if (isNaN(current)) return;

    const result = current / 100;
    this.currentOperand = this.formatNumber(result);

    logger.debug(`Percentage: ${current}% = ${result}`);
  }

  private formatNumber(number: number): string {
    if (isNaN(number)) return "Error";

    if (Math.abs(number) > 10 ** APP_CONFIG.display.maxDigits) {
      return number.toExponential(APP_CONFIG.display.decimalPlaces - 1);
    }

    let result = number.toString();

    if (result.includes(".") && result.split(".")[1].length > APP_CONFIG.display.decimalPlaces) {
      result = number.toFixed(APP_CONFIG.display.decimalPlaces);
      result = result.replace(/\.?0+$/, "");
    }

    return result;
  }

  private handleError(message: string): void {
    this.currentOperand = "Error";
    this.previousOperand = "";
    this.operation = null;
    logger.error("Calculator error:", message);
  }

  getDisplayState(): DisplayState {
    let previousDisplay = "";

    if (this.operation && this.previousOperand) {
      const operationSymbols: Record<Operation, string> = {
        add: "+",
        subtract: "−",
        multiply: "×",
        divide: "÷",
      };
      previousDisplay = `${this.previousOperand} ${operationSymbols[this.operation]}`;
    }

    return {
      current: this.currentOperand,
      previous: previousDisplay,
      hasError: this.currentOperand === "Error",
    };
  }
}

export default CalculatorEngine;