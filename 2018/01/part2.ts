import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
const frequencyChanges = input.split(/\r?\n|,\w?/).map(x => parseInt(x));
let result = 0;
const resultArray = new Set<number>();
resultArray.add(0);
let firstFrequencyTwice = 0;
let repeat = true;
while (repeat) {
    for (let i = 0; i < frequencyChanges.length; i++) {
        result += frequencyChanges[i];
        if (resultArray.has(result)) {
            firstFrequencyTwice = result;
            console.log(result);
            repeat = false;
            break;
        }
        resultArray.add(result);
    }
}
console.timeEnd('Time');