import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;

let pos = 0;

while (true) {
    if (input[pos] >= 3) {
        input[pos]--;
        pos += input[pos] + 1;
    } else {
        input[pos]++;
        pos += input[pos] - 1;
    }
    
    result++;
    if (pos >= input.length) break;
}

console.log(result);
console.timeEnd('Time');