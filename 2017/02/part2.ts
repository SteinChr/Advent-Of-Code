import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s|\t/).map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        for (let j = l + 1; j < input[i].length; j++) {
            if (input[i][l] % input[i][j] == 0) result += input[i][l] / input[i][j];
            if (input[i][j] % input[i][l] == 0) result += input[i][j] / input[i][l];
        }
    }
}

console.log(result);
console.timeEnd('Time');