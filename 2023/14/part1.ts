import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'O') {
            for (let currentY = y - 1; currentY >= 0 && input[currentY][x] == '.'; currentY--) {
                input[currentY + 1][x] = '.';
                input[currentY][x] = 'O';
            }
        }
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'O') result += input.length - y;
    }
}

console.log(result);
console.timeEnd('Time');