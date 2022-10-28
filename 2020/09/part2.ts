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

counter = 0;
let result2 = 0;
let addingNumbers = [];
let minimum = 0;
let maximum = 0;

for (let i = 0; i < numbers.length; i++) {
    currentNumber = parseInt(numbers[i]);
    for (let l = i + 1; l < numbers.length; l++) {
        counter = i;
        result2 = 0;
        while (counter <= l) {
            result2 += parseInt(numbers[counter]);
            counter++;
        }
        if (result2 == result) {
            for (let j = i; j <= l; j++) {
                addingNumbers.push(numbers[j]);
            }
        }
    }
}
minimum = Math.min(... addingNumbers);
maximum = Math.max(... addingNumbers);
result2 = minimum + maximum;
console.log(result2);
console.timeEnd('Time');