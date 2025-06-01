const previousOperandElement = document.getElementById("previous-operand")
const currentOperandElement = document.getElementById("current-operand")
const buttons = document.querySelectorAll("button")

let currentOperand = "0"
let previousOperand = ""
let operation = undefined
let shouldResetScreen = false

function init() {

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
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

  document.addEventListener("keydown", handleKeyboardInput)
  updateDisplay()
}

function inputNumber(number) {
  if (currentOperand === "0" || shouldResetScreen) {
    currentOperand = number
    shouldResetScreen = false
  } else {
    if (number === "." && currentOperand.includes(".")) return
    currentOperand += number
  }
}

function chooseOperation(op) {
  if (currentOperand === "") return

  if (previousOperand !== "") {
    calculate()
  }

  operation = op
  previousOperand = currentOperand
  shouldResetScreen = true
}

function calculate() {
  let computation
  const prev = Number.parseFloat(previousOperand)
  const current = Number.parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return

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

  currentOperand = formatNumber(computation)
  operation = undefined
  previousOperand = ""
}

function clear() {
  currentOperand = "0"
  previousOperand = ""
  operation = undefined
}

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

function percentage() {
  const current = Number.parseFloat(currentOperand)
  if (isNaN(current)) return
  currentOperand = formatNumber(current / 100)
}

function formatNumber(number) {
  const stringNumber = number.toString()

  if (stringNumber.length > 12) {
    return number.toPrecision(12).toString()
  }

  return stringNumber
}

function updateDisplay() {
  if (currentOperand === "Error") {
    currentOperandElement.textContent = "Error"
    previousOperandElement.textContent = ""
    return
  }

  currentOperandElement.textContent = currentOperand

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

function handleKeyboardInput(e) {

  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    inputNumber(e.key)
  }

  if (e.key === "+") chooseOperation("add")
  if (e.key === "-") chooseOperation("subtract")
  if (e.key === "*") chooseOperation("multiply")
  if (e.key === "/") {
    e.preventDefault()
    chooseOperation("divide")
  }

  if (e.key === "Enter" || e.key === "=") calculate()

  if (e.key === "Backspace") deleteNumber()

  if (e.key === "Escape" || e.key === "Delete") clear()

  if (e.key === "%") percentage()

  updateDisplay()
}

init()

console.log("Calculator UI loaded")
console.log("Electron version:", window.calculator.version)
