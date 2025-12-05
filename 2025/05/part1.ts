import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

let ranges = input[0].split('\r\n').map(x => x.split('-').map(y => parseInt(y)));
let ids = input[1].split('\r\n').map(x => parseInt(x));

for (let i = 0; i < ids.length; i++) {
    let fresh = false;

    for (let r = 0; r < ranges.length; r++) {
        if (ids[i] >= ranges[r][0] && ids[i] <= ranges[r][1]) {
            fresh = true;
            break;
        }
    }

    if (fresh) result++;
}

console.log(result);
console.timeEnd('Time');