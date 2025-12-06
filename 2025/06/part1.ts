import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').filter(y => y.length != 0));
let result = 0;

for (let i = 0; i < input[0].length; i++) {
    let current = 0;
    let op = input[input.length - 1][i];
    if (op == '*') current = 1;

    for (let l = 0; l < input.length - 1; l++) {
        if (op == '+') {
            current += parseInt(input[l][i]);
        } else if (op == '*') {
            current *= parseInt(input[l][i]);
        }
    }

    result += current;
}

console.log(result);
console.timeEnd('Time');