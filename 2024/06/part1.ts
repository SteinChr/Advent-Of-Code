import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
}

let currentPos: Pos = { x: -1, y: -1, dirX: 0, dirY: 0 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '.' && input[y][x] != '#') {
            currentPos.x = x;
            currentPos.y = y;
            if (input[y][x] == '^') currentPos.dirY = -1;
            if (input[y][x] == 'v') currentPos.dirY = 1;
            if (input[y][x] == '<') currentPos.dirX = -1;
            if (input[y][x] == '>') currentPos.dirX = 1;

            input[y][x] = 'o';
        }
    }
}

while (true) {
    if (currentPos.x + currentPos.dirX < 0 || currentPos.x + currentPos.dirX >= input[0].length || currentPos.y + currentPos.dirY < 0 || currentPos.y + currentPos.dirY >= input.length) {
        break;
    }

    if (input[currentPos.y + currentPos.dirY][currentPos.x + currentPos.dirX] != '#') {
        currentPos.x += currentPos.dirX;
        currentPos.y += currentPos.dirY;
    } else {
        if (currentPos.dirX == 1) {
            currentPos.dirX = 0;
            currentPos.dirY = 1;
        } else if (currentPos.dirY == 1) {
            currentPos.dirX = -1;
            currentPos.dirY = 0;
        } else if (currentPos.dirX == -1) {
            currentPos.dirX = 0;
            currentPos.dirY = -1;
        } else if (currentPos.dirY == -1) {
            currentPos.dirX = 1;
            currentPos.dirY = 0;
        }
    }

    input[currentPos.y][currentPos.x] = 'o';
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'o') result++;
    }
}

console.log(result);
console.timeEnd('Time');