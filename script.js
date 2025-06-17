function decodeOperation() {
    const values = expression.split(" ");
    console.table(values);
    
    operate(parseInt(values[0]), parseInt(values[2]), values[1]);
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

function operate(a, b, op) {
    switch (op) {
        case '+':
            expression = add(a, b);
            break;
        case '-':
            expression = subtract(a, b);
            break;
        case '*':
            expression = multiply(a, b);
            break;
        case '/':
            expression = divide(a, b);
            break;
        default:
            clearScreen();
            break;
    }

    updateDisplay();
}

function updateDisplay() {
    display.textContent = input;
    expressionDisplay.textContent = expression
}

function clearScreen() {
    expression = "";
    input = "0.0";
    updateDisplay();
}

function addNumber(n) {

    expression += n;

    if (input === "0") input = n;
    else input += n;
    
    updateDisplay();
}

function addOperator(op) {
    if (("+-*/".includes(expression[expression.length - 2])) || (expression === "0.0")) return;

    expression += ` ${op} `;
    updateDisplay();

    input = "";
    operatorPresent = true;
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

let expression = "";
let input = "0";

let operatorPresent = false;

const display = document.querySelector(".display");
const expressionDisplay = document.querySelector(".expression-display");

updateDisplay();
initButtons();