import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number
}

let directions: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

let start: Pos = { x: 0, y: 0 };
let end: Pos = { x: 0, y: 0 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') {
            start = { x: x, y: y };
            input[y][x] = '0';
        }

        if (input[y][x] == 'E') {
            end = { x: x, y: y };
            input[y][x] = '.';
        }
    }
}

let currentPos: Pos = { x: start.x, y: start.y };
let lengthWithoutCheating = 0;

while (currentPos.x != end.x || currentPos.y != end.y) {
    for (let d of directions) {
        if (input[currentPos.y + d.y][currentPos.x + d.x] == '.') {
            currentPos.x += d.x;
            currentPos.y += d.y;
            lengthWithoutCheating++;

            if (d.x == 1) input[currentPos.y][currentPos.x] = lengthWithoutCheating.toString();
            if (d.x == -1) input[currentPos.y][currentPos.x] = lengthWithoutCheating.toString();
            if (d.y == 1) input[currentPos.y][currentPos.x] = lengthWithoutCheating.toString();
            if (d.y == -1) input[currentPos.y][currentPos.x] = lengthWithoutCheating.toString();
        }
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '#') {
            for (let d of directions) {
                if (y + d.y * 2 > 0 && y + d.y * 2 < input.length && x + d.x * 2 > 0 && x + d.x * 2 < input[0].length) {
                    if (input[y + d.y * 2][x + d.x * 2] != '#') {
                        if (parseInt(input[y + d.y * 2][x + d.x * 2]) - parseInt(input[y][x]) - 2 >= 100) result++;
                    }
                }
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');