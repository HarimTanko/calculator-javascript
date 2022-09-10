const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

let currentOperand = '';
let previousOperand = '';
let operation;

function clear() {
  currentOperand = '';
  previousOperand = '';
  //operation = undefined;
}

function deleteInteger() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function attachNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(e) {
  if (currentOperand === '') return;

  if (previousOperand !== '') {
    compute();
  }

  operation = e;
  previousOperand = currentOperand;
  currentOperand = '';
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function compute() {
  let computation;
  let prev = +previousOperand;
  let current = +currentOperand;

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = add(prev, current);
      break;
    case '-':
      computation = subtract(prev, current);
      break;
    case '*':
      computation = multiply(prev, current);
      break;
    case '÷':
      computation = divide(prev, current);
      break;

    default:
      break;
  }

  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
}

function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = previousOperand;
}

//Event Listeners

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    attachNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

allClear.addEventListener('click', () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  deleteInteger();
  updateDisplay();
});
