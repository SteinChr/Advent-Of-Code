import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
}

let directions: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }];

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        for (let d = 0; d < directions.length; d++) {
            if (directions[d].y * 3 + y >= 0 && directions[d].y * 3 + y < input.length && directions[d].x * 3 + x >= 0 && directions[d].x * 3 + x < input[0].length) {
                if (input[y][x] + input[y + directions[d].y][x + directions[d].x] + input[y + directions[d].y * 2][x + directions[d].x * 2] + input[y + directions[d].y * 3][x + directions[d].x * 3] == 'XMAS') {
                    result++;
                }
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');