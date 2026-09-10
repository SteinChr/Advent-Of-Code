import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

const shift = input.length / 2;

for (let i = 0; i < input.length; i++) {
    if (input[i] == input[(i + shift) % input.length]) result += input[i];
}

console.log(result);
console.timeEnd('Time');