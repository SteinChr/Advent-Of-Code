import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let gammaRate = '';
let epsilonRate = '';
let result = 0;
for (let i = 0; i < input[0].length; i++) {
    let zeroes = 0;
    let ones = 0;
    for (let l = 0; l < input.length; l++) {
        if (input[l].charAt(i) == '0') {
            zeroes++;
        } else {
            ones++;
        }
    }
    if (zeroes > ones) {
        gammaRate += 0;
        epsilonRate += 1;
    } else {
        gammaRate += 1;
        epsilonRate += 0;
    }
}
result = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
console.log(result);
console.timeEnd('Time');