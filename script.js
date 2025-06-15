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
    value = "0.0";
    updateDisplay();
}

function registerNumber(n) {
    if (currentExpression === "0.0")
        currentExpression = "";

    currentExpression += n;
    
    updateDisplay();
}

function initNumberButtons() {
    const numberButtons = document.querySelectorAll(".number-button");
    for (let button of numberButtons)
        button.addEventListener("click", () => {
            registerNumber(button.textContent);
        });
}

let currentExpression = "0.0";
const display = document.querySelector(".display");

updateDisplay();
initNumberButtons();