let outPut = document.querySelector('#output');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const zero = document.getElementById('0');
const clear = document.querySelector('#clear');
const negative = document.querySelector('#negative');
const percentage = document.querySelector('#percentage');
const divide = document.getElementById('/');
const multiply = document.getElementById('*');
let addition = document.getElementById('+');
const substract = document.getElementById('-');
const equals = document.getElementById('=');

/*
    1. Click number and show in output
    2. Click multiply/add etc whatever is in the output by next number
    3. Click equals shows total in output
    4. if more action then output answer and do action with next number
*/
let x;
let y;

one.addEventListener('click', () => {
    x = 1; 
    outPut.textContent = x;
});

two.addEventListener('click', () => {
    x = 2; 
    outPut.textContent = x;
});

function add(x, y) {
    return x + y;
}

addition.addEventListener('click', (x, y) => {
    outPut.textContent = x + y;
    
});