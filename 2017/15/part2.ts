import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

let a = parseInt(input[0][4]);
let b = parseInt(input[1][4]);

const aFactor = 16807;
const bFactor = 48271;
const modValue = 2147483647;

const valueBinaryComparison = parseInt(('1111111111111111'), 2) + 1;

let aValues = [];
let bValues = [];

while (aValues.length < 5000000 || bValues.length < 5000000) {
    a = (a * aFactor) % modValue;
    b = (b * bFactor) % modValue;

    if (a % 4 == 0) aValues.push(a);
    if (b % 8 == 0) bValues.push(b);
}

for (let i = 0; i < 5000000; i++) {
    if (aValues[i] % valueBinaryComparison == bValues[i] % valueBinaryComparison) result++;
}

console.log(result);
console.timeEnd('Time');