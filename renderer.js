// Calculator logic for the renderer process

// DOM Elements
const previousOperandElement = document.getElementById("previous-operand")
const currentOperandElement = document.getElementById("current-operand")
const buttons = document.querySelectorAll("button")

// Calculator state
let currentOperand = "0"
let previousOperand = ""
let operation = undefined
let shouldResetScreen = false

// Initialize calculator
function init() {
  // Add event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Handle different button types
      if (button.classList.contains("number")) {
        inputNumber(button.dataset.number)
      } else if (button.classList.contains("operator")) {
        chooseOperation(button.dataset.action)
      } else if (button.dataset.action === "calculate") {
        calculate()
      } else if (button.dataset.action === "clear") {
        clear()
      } else if (button.dataset.action === "delete") {
        deleteNumber()
      } else if (button.dataset.action === "percent") {
        percentage()
      }

      updateDisplay()
    })
  })

  // Add keyboard support
  document.addEventListener("keydown", handleKeyboardInput)

  // Initial display update
  updateDisplay()
}

// Handle number input
function inputNumber(number) {
  if (currentOperand === "0" || shouldResetScreen) {
    // Replace the display if it's 0 or should be reset
    currentOperand = number
    shouldResetScreen = false
  } else {
    // Don't allow multiple decimal points
    if (number === "." && currentOperand.includes(".")) return
    // Append the number
    currentOperand += number
  }
}

// Choose operation (+, -, ×, ÷)
function chooseOperation(op) {
  // Don't allow operation selection if no number is entered
  if (currentOperand === "") return

  // If there's already an operation in progress, calculate it first
  if (previousOperand !== "") {
    calculate()
  }

  // Set the operation and move current operand to previous
  operation = op
  previousOperand = currentOperand
  shouldResetScreen = true
}

// Perform calculation
function calculate() {
  // Convert string operands to numbers
  let computation
  const prev = Number.parseFloat(previousOperand)
  const current = Number.parseFloat(currentOperand)

  // Don't calculate if either operand is missing
  if (isNaN(prev) || isNaN(current)) return

  // Perform the appropriate operation
  switch (operation) {
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
      // Handle division by zero
      if (current === 0) {
        currentOperand = "Error"
        previousOperand = ""
        operation = undefined
        return
      }
      computation = prev / current
      break
    default:
      return
  }

  // Format the result and reset the calculator state
  currentOperand = formatNumber(computation)
  operation = undefined
  previousOperand = ""
}

// Clear the calculator
function clear() {
  currentOperand = "0"
  previousOperand = ""
  operation = undefined
}

// Delete the last digit
function deleteNumber() {
  if (currentOperand === "Error") {
    currentOperand = "0"
    return
  }

  if (currentOperand.length === 1) {
    currentOperand = "0"
  } else {
    currentOperand = currentOperand.slice(0, -1)
  }
}

// Calculate percentage
function percentage() {
  const current = Number.parseFloat(currentOperand)
  if (isNaN(current)) return
  currentOperand = formatNumber(current / 100)
}

// Format number for display
function formatNumber(number) {
  // Convert to string and check if it's an integer
  const stringNumber = number.toString()

  // Handle potential floating point precision issues
  if (stringNumber.length > 12) {
    return number.toPrecision(12).toString()
  }

  return stringNumber
}

// Update the calculator display
function updateDisplay() {
  // Handle error state
  if (currentOperand === "Error") {
    currentOperandElement.textContent = "Error"
    previousOperandElement.textContent = ""
    return
  }

  // Update current operand display
  currentOperandElement.textContent = currentOperand

  // Update previous operand display with operation symbol
  if (operation) {
    let operationSymbol
    switch (operation) {
      case "add":
        operationSymbol = "+"
        break
      case "subtract":
        operationSymbol = "−"
        break
      case "multiply":
        operationSymbol = "×"
        break
      case "divide":
        operationSymbol = "÷"
        break
    }
    previousOperandElement.textContent = `${previousOperand} ${operationSymbol}`
  } else {
    previousOperandElement.textContent = ""
  }
}

// Handle keyboard input
function handleKeyboardInput(e) {
  // Numbers 0-9
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    inputNumber(e.key)
  }

  // Operators
  if (e.key === "+") chooseOperation("add")
  if (e.key === "-") chooseOperation("subtract")
  if (e.key === "*") chooseOperation("multiply")
  if (e.key === "/") {
    e.preventDefault() // Prevent browser's find functionality
    chooseOperation("divide")
  }

  // Enter or = for calculate
  if (e.key === "Enter" || e.key === "=") calculate()

  // Backspace for delete
  if (e.key === "Backspace") deleteNumber()

  // Escape or Delete for clear
  if (e.key === "Escape" || e.key === "Delete") clear()

  // % for percentage
  if (e.key === "%") percentage()

  updateDisplay()
}

// Start the calculator
init()

// Log that the renderer has loaded
console.log("Calculator UI loaded")
console.log("Electron version:", window.calculator.version)
