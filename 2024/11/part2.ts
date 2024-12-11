import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ').map(x => parseInt(x));
let result = 0;

let numbers = new Map<number, number>();
for (let i = 0; i < input.length; i++) {
    numbers.set(input[i], 1);
}

for (let b = 0; b < 75; b++) {
    let newNumbers = new Map<number, number>();

    for (let [key, value] of numbers) {   
        if (key == 0) {
            if (newNumbers.has(1)) {
                newNumbers.set(1, newNumbers.get(1) + numbers.get(key));
            } else {
                newNumbers.set(1, numbers.get(key));
            }
        } else if (key.toString().length % 2 == 0) {
            let left = parseInt(key.toString().substr(0, key.toString().length / 2));
            let right = parseInt(key.toString().slice(key.toString().length / 2));

            if (newNumbers.has(left)) {
                newNumbers.set(left, newNumbers.get(left) + numbers.get(key));
            } else {
                newNumbers.set(left, numbers.get(key));

            }

            if (newNumbers.has(right)) {
                newNumbers.set(right, newNumbers.get(right) + numbers.get(key));
            } else {
                newNumbers.set(right, numbers.get(key));
            }
        } else {
            if (newNumbers.has(key * 2024)) {
                newNumbers.set(key * 2024, newNumbers.get(key * 2024) + numbers.get(key));
            } else {
                newNumbers.set(key * 2024, numbers.get(key));
            }
        }
    }

    numbers = newNumbers;
}

for (let [key, value] of numbers) {
    result += value;
}

console.log(result);
console.timeEnd('Time');