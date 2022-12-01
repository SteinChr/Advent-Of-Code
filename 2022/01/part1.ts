import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

for (let i = 0; i < input.length; i++) {
    let allItems = input[i].split('\r\n').map(x => parseInt(x));
    let totalCalories = 0;
    for (let j = 0; j < allItems.length; j++) {
        totalCalories += allItems[j];
    }
    if (totalCalories > result) result = totalCalories;
}

console.log(result);
console.timeEnd('Time');