// State variables to keep track of the calculation
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// Grab the display elements from the DOM
const currentOperandEl = document.getElementById('current-operand');
const previousOperandEl = document.getElementById('previous-operand');

/**
 * Updates the text on the calculator screen
 */
function updateDisplay() {
    currentOperandEl.innerText = currentOperand;
    if (operation != null) {
        previousOperandEl.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandEl.innerText = '';
    }
}

/**
 * Clears the entire screen and resets state (AC button)
 */
function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

/**
 * Removes the last typed character (DEL button)
 */
function deleteNumber() {
    if (currentOperand === '0') return; // Nothing to delete
    
    currentOperand = currentOperand.slice(0, -1);
    
    // If we deleted everything, reset to '0'
    if (currentOperand === '') {
        currentOperand = '0';
    }
    
    updateDisplay();
}

/**
 * Adds a number or decimal to the screen
 */
function appendNumber(number) {
    // Prevent adding multiple decimals
    if (number === '.' && currentOperand.includes('.')) return;
    
    // If the screen is just '0', replace it (unless they type a decimal)
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

/**
 * Selects the math operation (+, −, ×, ÷, %)
 */
function appendOperator(op) {
    // If we just started, prevent setting an operator (except for negative numbers if desired, but we'll keep it simple here)
    if (currentOperand === '0' && previousOperand === '') return;

    // If we already have a previous number and current number, calculate before applying the next operator
    if (previousOperand !== '' && currentOperand !== '0') {
        calculate(false); 
    }
    
    // If we are just switching the operator while current is 0
    if (currentOperand === '0' && previousOperand !== '') {
        operation = op;
        updateDisplay();
        return;
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    
    updateDisplay();
}

/**
 * Performs the actual math calculation
 * @param {boolean} resetOperation - Whether to clear the operator after calculating (true for '=' button)
 */
function calculate(resetOperation = true) {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // If we don't have numbers to work with, cancel
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '−': // Unicode minus used in your HTML
            computation = prev - current;
            break;
        case '×': // Unicode multiply used in your HTML
            computation = prev * current;
            break;
        case '÷': // Unicode divide used in your HTML
            if (current === 0) {
                alert("You can't divide by zero!");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    // Round to prevent weird JavaScript floating-point bugs (e.g., 0.1 + 0.2 = 0.30000000000000004)
    currentOperand = (Math.round(computation * 100000000) / 100000000).toString();
    
    if (resetOperation) {
        operation = undefined;
        previousOperand = '';
    }
    
    updateDisplay();
}