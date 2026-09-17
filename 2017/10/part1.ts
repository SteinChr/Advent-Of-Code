import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/,\s|,/).map(x => parseInt(x));
let result = 0;

const listSize = 256; // 5 for test input, 256 for real input
let list: number[] = [];

for (let i = 0; i < listSize * 2; i++) {
    list.push(i % listSize);
}

let currentPos = 0;
let skipSize = 0;

for (let i = 0; i < input.length; i++) {
    list = [...list.slice(0, currentPos), ...list.slice(currentPos, currentPos + input[i]).reverse(), ...list.slice(currentPos + input[i])];

    for (let l = 0; l < listSize; l++) {
        if (l < currentPos) list[l] = list[l + listSize];
        if (l >= currentPos) list[l + listSize] = list[l];
    }

    currentPos += input[i] + skipSize;
    currentPos %= listSize;

    skipSize++;
}

result = list[0] * list[1];
console.log(result);
console.timeEnd('Time');