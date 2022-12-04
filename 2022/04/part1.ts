import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,|-/).map(x => parseInt(x)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    if ((input[i][0] <= input[i][2] && input[i][1] >= input[i][3]) ||
        (input[i][2] <= input[i][0] && input[i][3] >= input[i][1])) {
            result++;
    }
}

console.log(result);
console.timeEnd('Time');