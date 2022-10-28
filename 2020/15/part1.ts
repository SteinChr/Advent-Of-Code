import {readFileSync} from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let startingNumbers = input.split(',');
let numbers = [];
let result = 0;

for (let i = 0; i < 2020; i++) {
    if (i < startingNumbers.length) {
        numbers.push(parseInt(startingNumbers[i]));
    } else if (numbers.indexOf(numbers[numbers.length - 1]) != numbers.length - 1) {
        numbers.push(numbers.length - 1 - numbers.indexOf(numbers[numbers.length - 1]));
        numbers[numbers.indexOf(numbers[numbers.length - 2])] = -1;
    } else if (numbers.indexOf(numbers[numbers.length - 1]) == numbers.length - 1) {
        numbers.push(0);
    }
}

result = numbers[2019];
console.log(result);
console.timeEnd('Time');