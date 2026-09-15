import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let result = 0;

let garbage: boolean = false;
let score: number = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i] == '{') {
        if (!garbage) {
            score++;
            result += score;
        }
    } else if (input[i] == '}') {
        if (!garbage) {
            score--;
        }
    } else if (input[i] == '<') {
        garbage = true;
    } else if (input[i] == '>') {
        garbage = false;
    } else if (input[i] == '!') {
        i++;
    }
}

console.log(result);
console.timeEnd('Time');