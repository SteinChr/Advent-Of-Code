import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

let numbers = [];

for (let i = 0; i < 10000; i++) {
    numbers.push(...input);
}

let offset: number = parseInt(numbers.slice(0, 7).join(''));
numbers.splice(0, offset);

for (let p = 0; p < 100; p++) {
    let counter = 0;

    for (let i = numbers.length - 1; i >= 0; i--) {
        counter += numbers[i];
        counter %= 10;
        numbers[i] = counter;
    }
}

result = parseInt(numbers.slice(0, 8).join(''));
console.log(result);
console.timeEnd('Time');