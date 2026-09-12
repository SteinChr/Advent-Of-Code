import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\t|\s/).map(x => parseInt(x));
let result = 0;

let seen = new Set<string>();

for (let i = 1; true; i++) {
    let blocks = Math.max(...input);
    let index = input.indexOf(blocks);

    input[index] = 0;
    index++;

    while (blocks > 0) {
        if (index >= input.length) index = 0;

        input[index]++;
        index++;
        blocks--;
    }

    let inputString = input.join('_');

    if (seen.has(inputString)) {
        result = i;
        break;
    }

    seen.add(inputString);
}

console.log(result);
console.timeEnd('Time');