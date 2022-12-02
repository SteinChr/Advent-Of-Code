import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s/));
let result = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i][0] == 'A') {
        if (input[i][1] == 'X') {
            result += 4;
        } else if (input[i][1] == 'Y') {
            result += 8;
        } else if (input[i][1] == 'Z') {
            result += 3;
        }
    } else if (input[i][0] == 'B') {
        if (input[i][1] == 'X') {
            result += 1;
        } else if (input[i][1] == 'Y') {
            result += 5;
        } else if (input[i][1] == 'Z') {
            result += 9;
        }
    } else if (input[i][0] == 'C') {
        if (input[i][1] == 'X') {
            result += 7;
        } else if (input[i][1] == 'Y') {
            result += 2;
        } else if (input[i][1] == 'Z') {
            result += 6;
        }
    }
}

console.log(result);
console.timeEnd('Time');