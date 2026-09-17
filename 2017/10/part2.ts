import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let result = '';

let newListOfLengths: number[] = [];

for (let i = 0; i < input.length; i++) {
    newListOfLengths.push(input[i].charCodeAt(0));
}

newListOfLengths.push(...[17, 31, 73, 47, 23]);

let currentPos = 0;
let skipSize = 0;

let list: number[] = [];
const listSize = 256;

for (let i = 0; i < listSize * 2; i++) {
    list.push(i % listSize);
}

for (let r = 0; r < 64; r++) {
    for (let i = 0; i < newListOfLengths.length; i++) {
        list = [...list.slice(0, currentPos), ...list.slice(currentPos, currentPos + newListOfLengths[i]).reverse(), ...list.slice(currentPos + newListOfLengths[i])];

        for (let l = 0; l < listSize; l++) {
            if (l < currentPos) list[l] = list[l + listSize];
            if (l >= currentPos) list[l + listSize] = list[l];
        }

        currentPos += newListOfLengths[i] + skipSize;
        currentPos %= listSize;

        skipSize++;
    }
}

let denseHash: number[] = [];

for (let i = 0; i < list.length / 2; i += 16) {
    denseHash.push(list[i] ^ list[i + 1] ^ list[i + 2] ^ list[i + 3] ^ list[i + 4] ^ list[i + 5] ^ list[i + 6] ^ list[i + 7] ^ list[i + 8] ^ list[i + 9] ^ list[i + 10] ^ list[i + 11] ^ list[i + 12] ^ list[i + 13] ^ list[i + 14] ^ list[i + 15]);
}

for (let i = 0; i < denseHash.length; i++) {
    result += denseHash[i].toString(16).padStart(2, '0');
}

console.log(result);
console.timeEnd('Time');