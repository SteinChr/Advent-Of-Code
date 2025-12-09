import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    for (let l = i + 1; l < input.length; l++) {
        let area = (Math.abs(input[i][0] - input[l][0]) + 1) * (Math.abs(input[i][1] - input[l][1]) + 1);
        if (area > result) result = area;
    }
}

console.log(result);
console.timeEnd('Time');