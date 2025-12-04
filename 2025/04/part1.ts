import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        let adjacent = 0;

        if (input[y][x] == '@') {
            if (y > 0) {
                if (x > 0 && input[y - 1][x - 1] == '@') adjacent++;
                if (input[y - 1][x] == '@') adjacent++;
                if (x < input[y].length - 1 && input[y - 1][x + 1] == '@') adjacent++;
            }

            if (y < input.length - 1) {
                if (x > 0 && input[y + 1][x - 1] == '@') adjacent++;
                if (input[y + 1][x] == '@') adjacent++;
                if (x < input[y].length - 1 && input[y + 1][x + 1] == '@') adjacent++;
            }

            if (x > 0 && input[y][x - 1] == '@') adjacent++;
            if (x < input[y].length - 1 && input[y][x + 1] == '@') adjacent++;

            if (adjacent < 4) result++;
        }
    }
}

console.log(result);
console.timeEnd('Time');