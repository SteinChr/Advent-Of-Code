import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let digits: number[] = [];
    let currentStartIndex = 0;

    for (let d = 0; d < 12; d++) {
        let newDigit = Math.max(...input[i].slice(currentStartIndex, input[i].length - (11 - d)));
        digits.push(newDigit);
        currentStartIndex += input[i].slice(currentStartIndex).indexOf(newDigit) + 1;
    }

    result += parseInt(digits.join(''));
}

console.log(result);
console.timeEnd('Time');