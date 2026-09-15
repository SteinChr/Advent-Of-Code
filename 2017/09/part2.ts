import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let result = 0;

let garbage: boolean = false;

for (let i = 0; i < input.length; i++) {
    if (input[i] == '<') {
        if (garbage) result++;
        garbage = true;
    } else if (input[i] == '>') {
        garbage = false;
    } else if (input[i] == '!') {
        i++;
    } else if (garbage) {
        result++;
    }
}

console.log(result);
console.timeEnd('Time');