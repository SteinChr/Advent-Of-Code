import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let outputValues = input.map(x => x.split(' | ')[1]).map(x => x.split(' '));
let result = 0;
for (let i = 0; i < outputValues.length; i++) {
    for (let l = 0; l < outputValues[i].length; l++) {
        if (outputValues[i][l].length == 2 ||
            outputValues[i][l].length == 4 ||
            outputValues[i][l].length == 3 ||
            outputValues[i][l].length == 7) {
                result++;
            }
    }
}
console.log(result);
console.timeEnd('Time');