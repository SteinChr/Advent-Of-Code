import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n').map(i => parseInt(i));
let answer = 0;

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        for (let l = 0; l < numbers.length; l++) {
            if (numbers[i] + numbers[j] + numbers[l] === 2020) {
                answer = numbers[i] * numbers[j] * numbers[l];
            }
        }
    }
}

console.log(answer);
console.timeEnd('Time');