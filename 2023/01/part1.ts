import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

for (let i = 0; i < input.length; i++) {
    let first = -1;
    let last = -1;
    for (let l = 0; l < input[i].length; l++) {
        if (!isNaN(parseInt(input[i][l]))) {
            if (first == -1) first = parseInt(input[i][l]);
            last = parseInt(input[i][l]);
        }
    }
    result += parseInt(first.toString() + last.toString());
}

console.log(result);
console.timeEnd('Time');