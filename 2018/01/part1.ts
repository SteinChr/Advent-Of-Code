import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
const frequencyChanges = input.split(/\r?\n|,\w?/).map(x => parseInt(x));
let result = 0;
for (let i = 0; i < frequencyChanges.length; i++) {
    result += frequencyChanges[i];
}
console.log(result);
console.timeEnd('Time');