import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let allCalories: number[] = [];
let result = 0;

for (let i = 0; i < input.length; i++) {
    let allItems = input[i].split('\r\n').map(x => parseInt(x));
    let totalCalories = 0;
    for (let j = 0; j < allItems.length; j++) {
        totalCalories += allItems[j];
    }
    allCalories.push(totalCalories);
}

allCalories.sort((a, b) => b - a);
result = allCalories[0] + allCalories[1] + allCalories[2];

console.log(result);
console.timeEnd('Time');