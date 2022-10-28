import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n').map(i => parseInt(i));
let answer = 0;

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === 2020) {
            answer = numbers[i] * numbers[j];
        }
    }
}

console.log(answer);
console.timeEnd('Time');