import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let counter = 0;

numbers[1] = 12;
numbers[2] = 2;

while(true) {
    if (numbers[counter * 4] == 1) {
        numbers[numbers[counter * 4 + 3]] = numbers[numbers[counter * 4 + 1]] + numbers[numbers[counter * 4 + 2]];
    } else if (numbers[counter * 4] == 2) {
        numbers[numbers[counter * 4 + 3]] = numbers[numbers[counter * 4 + 1]] * numbers[numbers[counter * 4 + 2]];
    } else if (numbers[counter * 4] == 99) {
        break;
    }
    counter++;
}

console.log(numbers[0]);
console.timeEnd('Time');