import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',');
let result = 0;

class Pos {
    x: number;
    y: number;
}

let pos: Pos = { x: 0, y: 0 };

for (let i = 0; i < input.length; i++) {
    if (input[i] == 'n') {
        pos.y--;
    } else if (input[i] == 's') {
        pos.y++;
    } else if (input[i] == 'ne') {
        pos.x++;
        pos.y--;
    } else if (input[i] == 'se') {
        pos.x++;
    } else if (input[i] == 'nw') {
        pos.x--;
    } else if (input[i] == 'sw') {
        pos.x--;
        pos.y++;
    }
}

result = getDistance(pos);
console.log(result);

function getDistance(pos: Pos): number {
    return Math.max(Math.abs(pos.x), Math.abs(pos.y), Math.abs(pos.x + pos.y));
}

console.timeEnd('Time');