import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i + 1] > input[i]) result++;
}
console.log(result);
console.timeEnd('Time');