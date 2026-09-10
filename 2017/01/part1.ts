import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

for (let i = 0; i < input.length - 1; i++) {
    if (input[i] == input[i + 1]) result += input[i];
}

if (input[0] == input[input.length - 1]) result += input[0];

console.log(result);
console.timeEnd('Time');