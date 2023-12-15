import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',');
let result = 0;

for (let i = 0; i < input.length; i++) {
    let currentValue = 0;
    for (let l = 0; l < input[i].length; l++) {
        let ascii = input[i].charCodeAt(l);
        currentValue += ascii;
        currentValue *= 17;
        currentValue = currentValue % 256;
    }
    result += currentValue;
}

console.log(result);
console.timeEnd('Time');