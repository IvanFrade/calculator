function decodeOperation() {
    const values = expression.split(" ");

    // Check wether the operation is valid
    // If the second operator is missing, operation is invalid: first operator is stored in memory and screen is cleared
    if (values[2] === "") {
        input = values[0];
        expression = "";

        updateDisplay();
        updateExpressionDisplay();

        expression = values[0];
    } else {
        // If the operation is valid, operate() is called to parse the result
        operate(parseFloat(values[0]), parseFloat(values[2]), values[1]);
    }    

    // After decoding/evaluating, toggles are "reset" 
    operatorPresent = false;
    operatorWasLastPressed = false;
    resultInMemory = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return (a * b).toFixed(10);     // Round to 10 decimals
}   

function divide(a, b) {
    if (b === 0)
        return "ERROR";
    else
        return (a / b).toFixed(10); // Round to 10 decimals
}

function operate(a, b, op) {
    switch (op) {
        case '+':
            input = add(a, b);
            break;
        case '-':
            input = subtract(a, b);
            break;
        case '*':
            input = multiply(a, b);
            break;
        case '/':
            input = divide(a, b);
            break;
        default:
            input = "ERROR";
            clearScreen();
            break;
    }

    expression = "";
    updateDisplay();
    updateExpressionDisplay();

    expression = input;
}

function updateDisplay() {
    display.textContent = input;
}

function updateExpressionDisplay() {
    expressionDisplay.textContent = expression;
}

function clearScreen() {
    operatorWasLastPressed = false;

    expression = "";
    input = "0";

    updateDisplay();
    updateExpressionDisplay();
}


// Number is pressed
function addNumber(n) {
    operatorWasLastPressed = false;

    // Check wether the calculator is displaying a previous result: in such cases, start over 
    if (resultInMemory) {
        expression = "";
        input = "";
    }

    expression += n;

    if (input === "0") input = n; // Necessary to avoid appending the first digit to the placeholder 0
    else input += n;
    
    updateDisplay();

    resultInMemory = false;
}

// Operator is pressed
function addOperator(op) {
    if (operatorWasLastPressed) return; // Ignore subsequent operators if an operator was last pressed

    // Check to see if expression already contains a valid expression: if it does, evaluate it first
    if (operatorPresent) decodeOperation(); 

    expression += ` ${op} `;
    updateExpressionDisplay();

    input = "";
    operatorPresent = true;
    operatorWasLastPressed = true;
    resultInMemory = false;
}

function addDecimal() {
    // Only add a decimal if current number doesn't already have one  
    if (!input.includes(".")) {
        input += ".";
        expression += ".";

        updateDisplay();
    }
}

function initButtons() {
    const numberButtons = document.querySelectorAll(".number-button");
    for (let button of numberButtons) {
        button.addEventListener("click", () => {
            addNumber(button.textContent);
        });
        button.addEventListener("touchstart", () => {
            addNumber(button.textContent);
        });
    }

    const operatorButtons = document.querySelectorAll(".operator-button");
    for (let button of operatorButtons) {
        button.addEventListener("click", () => {
            addOperator(button.textContent);
        });
        button.addEventListener("touchstart", () => {
            addOperator(button.textContent);
        });
    }

    const decimalButton = document.querySelector(".decimal-button");
    decimalButton.addEventListener("click", () => { addDecimal(); });

    const operateButton = document.querySelector(".operate-button");
    operateButton.addEventListener("click", () => { decodeOperation(); });
    operateButton.addEventListener("touchstart", () => { decodeOperation(); });     

    const clearButton = document.querySelector(".clear-button");
    clearButton.addEventListener("click", () => { clearScreen(); });
    clearButton.addEventListener("touchstart", () => { clearScreen(); });
}

let expression = "";
let input = "0";

let operatorPresent = false;
let operatorWasLastPressed = false;
let resultInMemory = false;

const display = document.querySelector(".input-display");
const expressionDisplay = document.querySelector(".expression-display");

updateDisplay();
initButtons();