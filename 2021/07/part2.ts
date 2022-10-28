import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let fuelValues = [];
let result = 0;
for (let i = Math.min(...input); i < Math.max(...input); i++) {
    let fuel = 0;
    for (let r = Math.min(...input); r < input.length; r++) {
        for (let p = 1; p <= Math.abs(input[r] - i); p++) {
            fuel += p;
        }
    }
    fuelValues.push(fuel);
}
result = Math.min(...fuelValues);
console.log(result);
console.timeEnd('Time');