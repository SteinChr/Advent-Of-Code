import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n').map(line => parseInt(line));
numbers.push(0);
numbers = numbers.sort((a, b) => a - b);
numbers.push(numbers[numbers.length - 1] + 3);
let differenceOf1 = 0;
let differenceOf3 = 0;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i + 1] - numbers[i] == 1) {
        differenceOf1++;
    } else if (numbers[i + 1] - numbers [i] == 3) {
        differenceOf3++;
    }
}

let result = differenceOf1 * differenceOf3;
console.log(result);
console.timeEnd('Time');