import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let firstDigit = Math.max(...input[i].slice(0, input[i].length - 1));
    let indexFirstDigit = input[i].indexOf(firstDigit);
    let secondDigit = Math.max(...input[i].slice(indexFirstDigit + 1));

    result += firstDigit * 10 + secondDigit;
}

console.log(result);
console.timeEnd('Time');