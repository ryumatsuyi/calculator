const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand, secondOperand} = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else if (secondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForThirdOperand = false;
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
        // BODMAS handler
        // Check if first operator is + or -
        if (operator === '+' || operator === '-') {
            // If clicked button is * or / and there is no second operator
            if ( (nextOperator === '*' || nextOperator === '/') && !calculator.secondOperand ) {
                // create a new property called secondOperand and store inputValue into it
                const secondOperand = inputValue;
                calculator.secondOperand = secondOperand;
                // create a new property called secondOperator and store the clicked button value (* or /) into it
                calculator.secondOperator = nextOperator;
                // create a new property called waitingForThirdOperand and set value as true
                calculator.waitingForThirdOperand = true;

                console.log(calculator);
                return;
            // if the clicked button is * or / and there is a value stored in the secondOperator property
            } else if ( (nextOperator === '*' || nextOperator === '/') && calculator.secondOperator ) {
                const result = calculate(calculator.secondOperand, inputValue, calculator.secondOperator);
                calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
                calculator.secondOperand = result;
                calculator.secondOperator = nextOperator;
                calculator.waitingForThirdOperand = true;

                console.log(calculator);
                return;
            } else if ( ( (nextOperator === '+' || nextOperator === '-' || nextOperator === '=' ) && calculator.secondOperator) ) {
                const result1 = calculate(calculator.secondOperand, inputValue, calculator.secondOperator);
                const result2 = calculate(firstOperand, result1, operator);
                calculator.displayValue = `${parseFloat(result2.toFixed(7))}`;
                calculator.firstOperand = result2;
                calculator.operator = nextOperator;
                calculator.secondOperand = null;
                calculator.secondOperator = null;
                calculator.waitingForSecondOperand = true;

                console.log(calculator);
                return;
            }
        } // End BODMAS handler

        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    
    // if there is no second operand then change waitingForSecondOperand status to true;
    if (!calculator.secondOperand) {
        calculator.waitingForSecondOperand = true;
    }

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
        case '=':
        case '*':
        case '/':
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
