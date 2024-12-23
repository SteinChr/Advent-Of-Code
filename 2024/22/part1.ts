import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;

for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < 2000; l++) {
        let secretNumber = input[i];

        let tempResult = secretNumber * 64;
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        tempResult = Math.floor(secretNumber / 32);
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        tempResult = secretNumber * 2048;
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        input[i] = secretNumber;
    }

    result += input[i];
}

console.log(result);
console.timeEnd('Time');