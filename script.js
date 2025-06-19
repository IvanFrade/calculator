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
    canDelete = false;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return String(a * b).substring(0, 12);     // Round to 10 decimals
}   

function divide(a, b) {
    if (b === 0)
        return "ERROR";
    else
        return String(a / b).substring(0, 12); // Round to 10 decimals
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
    expression = "";
    input = "0";

    updateDisplay();
    updateExpressionDisplay();

    operatorWasLastPressed = false;
    operatorPresent = false;
    canDelete = false;
}

function deleteDigit() {
    if (!canDelete) return; // If nothing can be deleted, do nothing

    if (input.length === 1) {
        input = "0";
        expression = "";
        canDelete = false;
    } else {
        input = input.slice(0, -1);
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}


// Number is pressed
function addNumber(n) {
    // Check wether the calculator is displaying a previous result: in such cases, start over 
    // When user starts typing digits directly after an operation, the operation result is discarded
    if (resultInMemory || input === "0") {
        expression = "";
        input = "";
    }
    
    input += n;
    expression += n;
    
    updateDisplay();
    console.log(`Input: ${input}, Expression: ${expression}\n`);
    

    operatorWasLastPressed = false;
    resultInMemory = false;
    canDelete = true;
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
    canDelete = false;
}

function addDecimal() {
    // Only add a decimal if current number doesn't already have one  
    if (!input.includes(".")) {
        input += ".";
        expression += ".";

        updateDisplay();
    }

    canDelete = true;
}

function initButtons() {
    const numberButtons = document.querySelectorAll(".number-button");
    for (let button of numberButtons) {
        button.addEventListener("click", () => {
            addNumber(button.textContent);
        });
        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            addNumber(button.textContent);
        });
    }

    const operatorButtons = document.querySelectorAll(".operator-button");
    for (let button of operatorButtons) {
        button.addEventListener("click", () => {
            addOperator(button.textContent);
        });
        button.addEventListener("touchstart", (e) => {         
            e.preventDefault();
            addOperator(button.textContent);
        });
    }

    const decimalButton = document.querySelector(".decimal-button");
    decimalButton.addEventListener("click", () => { addDecimal(); });
    decimalButton.addEventListener("touchstart", (e) => {          
        e.preventDefault();
        addDecimal(); 
    });

    const operateButton = document.querySelector(".operate-button");
    operateButton.addEventListener("click", () => { decodeOperation(); });
    operateButton.addEventListener("touchstart", (e) => {          
        e.preventDefault();
        decodeOperation(); 
    });     

    const clearButton = document.querySelector(".clear-button");
    clearButton.addEventListener("click", () => { clearScreen(); });
    clearButton.addEventListener("touchstart", (e) => {          
        e.preventDefault();
        clearScreen(); 
    });

    const deleteButton = document.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => { deleteDigit(); });
    deleteButton.addEventListener("touchstart", (e) => {          
        e.preventDefault();
        deleteDigit();});
}

let expression = "";                    // Math expression that will be evaluated
let input = "0";                        // User input or result currently displaying to main screen

let operatorPresent = false;            // Tracks wether an operator is already present in the current expression
let operatorWasLastPressed = false;     // Tracks wether last pressed button was an operator, to inhibit double operator presses
let resultInMemory = false;             // Tracks wether the currently displayed value is a result of a previous operation
let canDelete = false;                  // Tracks wether there are any digits to delete

const display = document.querySelector(".input-display");
const expressionDisplay = document.querySelector(".expression-display");

updateDisplay();
initButtons();