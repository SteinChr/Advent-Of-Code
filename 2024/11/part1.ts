import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ').map(x => parseInt(x));
let result = 0;

for (let b = 0; b < 25; b++) {
    let newElements: number[] = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] == 0) {
            newElements.push(1);
        } else if (input[i].toString().length % 2 == 0) {
            newElements.push(parseInt(input[i].toString().substr(0, input[i].toString().length / 2)));
            newElements.push(parseInt(input[i].toString().slice(input[i].toString().length / 2)));
        } else {
            newElements.push(input[i] * 2024);
        }
    }

    input = newElements.slice();
}

result = input.length;

console.log(result);
console.timeEnd('Time');