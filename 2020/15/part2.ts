import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');

interface Number {
    lastPos: number;
    secondLastPos: number;
}

let startingNumbers = input.split(',');
let currentNumber = 0;
let max = 30000000;
let numbers = new Array<Number>(max);
let result = 0;

for (let i = 1; i <= max; i++) {
    if (i <= startingNumbers.length) {
        currentNumber = parseInt(startingNumbers[i - 1]);
    } else if (numbers[currentNumber] != null && numbers[currentNumber].secondLastPos != null) {
        currentNumber = numbers[currentNumber].lastPos - numbers[currentNumber].secondLastPos;
    } else {
        currentNumber = 0;
    }
    numbers[currentNumber] = {
        lastPos: i,
        secondLastPos: numbers[currentNumber] != null ? numbers[currentNumber].lastPos : null
    };
}
console.log(currentNumber);

console.timeEnd('Time');