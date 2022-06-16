class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.secondNumberOperator = ''
    this.firstNumberOperator = ''
    this.operator = undefined
  }

  delete() {
    this.secondNumberOperator = this.secondNumberOperator.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.secondNumberOperator.includes('.')) return
    this.secondNumberOperator = this.secondNumberOperator.toString() + number.toString()
  }

  chooseOperation(operator) {
    if (this.secondNumberOperator === '') return
    if (this.firstNumberOperator !== '') {
      this.compute()
    }
    this.operator = operator
    this.firstNumberOperator = this.secondNumberOperator
    this.secondNumberOperator = ''
  }

  compute() {
    let computation
    const firstNumber = parseFloat(this.firstNumberOperator)
    const secondNumber = parseFloat(this.secondNumberOperator)
    if (isNaN(firstNumber) || isNaN(secondNumber)) return
    switch (this.operator) {
      case '+':
        computation = firstNumber + secondNumber
        break
      case '-':
        computation = firstNumber - secondNumber
        break
      case '*':
        computation = firstNumber * secondNumber
        break
      case '÷':
        computation = firstNumber / secondNumber
        break
      default:
        return
    }
    this.secondNumberOperator = computation
    this.operator = undefined
    this.firstNumberOperator = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.secondNumberOperator)
    if (this.operator != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.firstNumberOperator)} ${this.operator}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-first-operator]')
const currentOperandTextElement = document.querySelector('[data-second-operator]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})