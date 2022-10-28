import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;
for (let i = 1; i < input.length - 1; i++) {
    if ((input[i - 1] + input[i] + input[i + 1]) < (input[i] + input[i + 1] + input[i + 2])) {
        result++;
    }
}
console.log(result);
console.timeEnd('Time');