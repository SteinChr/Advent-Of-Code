import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n');
let currentNumber = 0;
const preamble = 25;
let validCount = 0;
let test = false;
let counter = 0;
let result = 0;

for (let i = preamble; i < numbers.length; i++) {
    currentNumber = parseInt(numbers[i]);
    validCount = 0;
    test = false;

    for (let l = 0; l < preamble; l++) {
        for (let j = 0; j < preamble; j++) {
            if (l != j) {
                if (parseInt(numbers[l + counter]) + parseInt(numbers[j + counter]) == currentNumber) {
                    validCount++;
                    test = true;
                }
            }
        }
    }
    counter++;
    if (test == false) result = parseInt(numbers[i]);
}

console.log(result);
console.timeEnd('Time');