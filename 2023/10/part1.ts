import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
}

let currentPosition: Position = { x: 0, y: 0, dirX: 0, dirY: 0 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') currentPosition = { x: x, y: y, dirX: 0, dirY: 0 };
    }
}

if (currentPosition.y > 0 && '|7F'.includes(input[currentPosition.y - 1][currentPosition.x])) {
    currentPosition.dirY = -1;
} else if (currentPosition.x < input[currentPosition.y].length - 1 && '-J7'.includes(input[currentPosition.y][currentPosition.x + 1])) {
    currentPosition.dirX = 1;
} else if (currentPosition.y < input.length - 1 && '|LJ'.includes(input[currentPosition.y + 1][currentPosition.x])) {
    currentPosition.dirY = 1;
}

do {
    currentPosition.x += currentPosition.dirX;
    currentPosition.y += currentPosition.dirY;
    result++;

    if (input[currentPosition.y][currentPosition.x] == 'L') {
        if (currentPosition.dirY == 1) {
            currentPosition.dirX = 1;
            currentPosition.dirY = 0;
        } else {
            currentPosition.dirX = 0;
            currentPosition.dirY = -1;
        }
    } else if (input[currentPosition.y][currentPosition.x] == 'J') {
        if (currentPosition.dirY == 1) {
            currentPosition.dirX = -1;
            currentPosition.dirY = 0;
        } else {
            currentPosition.dirX = 0;
            currentPosition.dirY = -1;
        }
    } else if (input[currentPosition.y][currentPosition.x] == '7') {
        if (currentPosition.dirY == -1) {
            currentPosition.dirX = -1;
            currentPosition.dirY = 0;
        } else {
            currentPosition.dirX = 0;
            currentPosition.dirY = 1;
        }
    } else if (input[currentPosition.y][currentPosition.x] == 'F') {
        if (currentPosition.dirY == -1) {
            currentPosition.dirX = 1;
            currentPosition.dirY = 0;
        } else {
            currentPosition.dirX = 0;
            currentPosition.dirY = 1;
        }
    }
} while (input[currentPosition.y][currentPosition.x] != 'S');

result /= 2;

console.log(result);
console.timeEnd('Time');