import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let result = 0;
let basins = [];
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if ((l === input[i].length - 1 || input[i].charAt(l) < input[i].charAt(l + 1)) &&
            (i === input.length - 1 || input[i].charAt(l) < input[i + 1].charAt(l)) &&
            (l === 0 || input[i].charAt(l) < input[i].charAt(l - 1)) &&
            (i === 0 || input[i].charAt(l) < input[i - 1].charAt(l))) {
            basins.push(getSize(i, l));
        }
    }
}
basins.sort((a, b) => b - a);
result = basins[0] * basins[1] * basins[2];
console.log(result);

function getSize(y, x): number {
    let size = 0;
    if (y >= 0 && y < input.length && x >= 0 && x < input[y].length) {
        if (input[y].charAt(x) != '9' && input[y].charAt(x) != '.') {
            input[y] = input[y].substring(0, x) + '.' + input[y].substring(x + 1);
            size++;
            size += getSize(y, x + 1);
            size += getSize(y, x - 1);
            size += getSize(y + 1, x);
            size += getSize(y - 1, x);
        }
    }
    return size;
}

console.timeEnd('Time');