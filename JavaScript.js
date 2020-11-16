const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Overwrite 'displayValue' if the current value is 0, otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }

    // If the 'displayValue' property does not contain a decimal point
    if ( !calculator.displayValue.includes(dot) ) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator;
    // Convert the string contents of 'displayValue' to a floating point number
    const inputValue = parseFloat(displayValue);

    if ( operator && calculator.waitingForSecondOperand ) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // Verify that 'firstOperand' is null and that 'inputValue' is not a NaN value
    if ( firstOperand == null && !isNaN(inputValue) ) {
        // Update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    //update the value of the calculator screen with the contents of 'displayValue' property
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    // Access the clicked element
    // Same as const target = event.target;
    const { target } = event;
    const { value } = target;
    //Check if the clicked element is a button. If it's not, then exit function
    if ( !target.matches('button') ) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            //check if the key is an integer
            if ( Number.isInteger(parseFloat(value)) ) {
                inputDigit(value);
            }
    }
/* The switch is the same as writing the code below. But it's alot easier to add
new functions to the calculator and you no longer need toinvoke the updateDisplay()
function after each operation.
    if ( target.classList.contains('operator') ) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if ( target.classList.contains('decimal') ) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if ( target.classList.contains('all-clear') ) {
        resetCalculator();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    */
    updateDisplay();
});