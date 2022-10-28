import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n').map(line => parseInt(line));
let lineResult = 0;
let result = 0;

for (let i = 0; i < numbers.length; i++) {
    lineResult = 0;
    lineResult = Math.floor(numbers[i] / 3) - 2;
    result += lineResult;
}

console.log(result);
console.timeEnd('Time');