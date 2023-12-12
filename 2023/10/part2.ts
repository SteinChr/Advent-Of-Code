import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
    dirX?: number;
    dirY?: number;
}

let loopCoordinates: string[] = [];
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
    loopCoordinates.push(currentPosition.x.toString() + '-' + currentPosition.y.toString());

    currentPosition.x += currentPosition.dirX;
    currentPosition.y += currentPosition.dirY;

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

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (!loopCoordinates.includes(x.toString() + '-' + y.toString())) input[y][x] = '.';
    }
}

for (let y = input.length - 1; y >= 0; y--) {
    input[y] = ['.', ...input[y].join('.').split(''), '.'];
    if (y != 0) input.splice(y, 0, new Array(input[0].length * 2 + 1).fill('.'));
}
input.unshift(new Array(input[0].length).fill('.'));
input.push(new Array(input[0].length).fill('.'));

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (x > 0 && x < input[y].length - 1 && '-LFS'.includes(input[y][x - 1]) && '-J7S'.includes(input[y][x + 1])) input[y][x] = '-';
        if (y > 0 && y < input.length - 1 && '|7FS'.includes(input[y - 1][x]) && '|LJS'.includes(input[y + 1][x])) input[y][x] = '|';
    }
}

let pointsToCheck: Position[] = [{ x: 0, y: 0 }];

while (pointsToCheck.length != 0) {
    let currentPoint = pointsToCheck.shift();
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if (x != y && currentPoint.y + y >= 0 && currentPoint.y + y < input.length && currentPoint.x + x >= 0 && currentPoint.x + x < input[0].length && input[currentPoint.y + y][currentPoint.x + x] == '.') {
                pointsToCheck.push({ x: currentPoint.x + x, y: currentPoint.y + y });
                input[currentPoint.y + y][currentPoint.x + x] = 'O';
            }
        }
    }
}

for (let y = 1; y < input.length; y += 2) {
    for (let x = 1; x < input[y].length; x += 2) {
        if (input[y][x] == '.') result++;
    }
}

console.log(result);
console.timeEnd('Time');