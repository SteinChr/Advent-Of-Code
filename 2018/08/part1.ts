import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ').map(x => parseInt(x));
let result = 0;

openNode(0);

function openNode(startIndex) {
    let childNodes = input[startIndex];
    let metaData = input[startIndex + 1];

    for (let c = 0; c < childNodes; c++) {
        openNode(startIndex + 2);
    }

    for (let m = startIndex; m < metaData + startIndex; m++) {
        result += input[m + 2];
    }
    input.splice(startIndex, metaData + 2);
}

console.log(result);
console.timeEnd('Time');