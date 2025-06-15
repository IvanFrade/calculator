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

function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}

function updateDisplay() {
    display.textContent = currentExpression;
}

function clearScreen() {
    currentExpression = "0.0";
    updateDisplay();
}

function addNumber(n) {
    if (currentExpression === "0.0")
        currentExpression = "";

    currentExpression += n;
    
    updateDisplay();
}

function addOperator(op) {
    if (("+-*/".includes(currentExpression[currentExpression.length - 2])) || (currentExpression === "0.0")) return;

    currentExpression += ` ${op} `;

    updateDisplay();
}

function initButtons() {
    const numberButtons = document.querySelectorAll(".number-button");
    for (let button of numberButtons) {
        button.addEventListener("click", () => {
            addNumber(button.textContent);
        });
    }

    const operatorButtons = document.querySelectorAll(".operator-button");
    for (let button of operatorButtons) {
        button.addEventListener("click", () => {
            addOperator(button.textContent);
        });
    }

    const operateButton = document.querySelector(".operate-button");
    operateButton.addEventListener("click", () => { decodeOperation(); });    

    const clearButton = document.querySelector(".clear-button");
    clearButton.addEventListener("click", () => { clearScreen(); });
}

let currentExpression = "0.0";
const display = document.querySelector(".display");

updateDisplay();
initButtons();