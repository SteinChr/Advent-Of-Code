import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class PosAndDir {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
}

class Pos {
    x: number;
    y: number;
}

let startingPos: PosAndDir = { x: -1, y: -1, dirX: 0, dirY: 0 };
let currentPos: PosAndDir = { x: -1, y: -1, dirX: 0, dirY: 0 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '.' && input[y][x] != '#') {
            startingPos.x = x;
            startingPos.y = y;
            if (input[y][x] == '^') startingPos.dirY = -1;
            if (input[y][x] == 'v') startingPos.dirY = 1;
            if (input[y][x] == '<') startingPos.dirX = -1;
            if (input[y][x] == '>') startingPos.dirX = 1;
        }
    }
}

currentPos = { x: startingPos.x, y: startingPos.y, dirX: startingPos.dirX, dirY: startingPos.dirY };

let originalPath: Pos[] = [];

while (true) {
    if (currentPos.x + currentPos.dirX < 0 || currentPos.x + currentPos.dirX >= input[0].length || currentPos.y + currentPos.dirY < 0 || currentPos.y + currentPos.dirY >= input.length) {
        break;
    }

    followPath();
    originalPath.push({ x: currentPos.x, y: currentPos.y });
}

let foundPositionsForObstacle: string = '';

for (let i = 0; i < originalPath.length; i++) {
    if (input[originalPath[i].y][originalPath[i].x] == '.' && (originalPath[i].x != startingPos.x || originalPath[i].y != startingPos.y) && !foundPositionsForObstacle.includes(getStringFromPos(originalPath[i]))) {
        let path: string = '';
        
        input[originalPath[i].y][originalPath[i].x] = '#';
        currentPos = { x: startingPos.x, y: startingPos.y, dirX: startingPos.dirX, dirY: startingPos.dirY };

        while (true) {
            if (currentPos.x + currentPos.dirX < 0 || currentPos.x + currentPos.dirX >= input[0].length || currentPos.y + currentPos.dirY < 0 || currentPos.y + currentPos.dirY >= input.length) {
                break;
            }

            followPath();

            let currentPosString = getStringAndDirFromPos(currentPos);

            if (path.includes(currentPosString)) {
                result++;
                foundPositionsForObstacle += getStringFromPos(originalPath[i]);
                break;
            }

            path += currentPosString;
        }

        input[originalPath[i].y][originalPath[i].x] = '.';
    }
}

function followPath() {
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
}

function getStringFromPos(pos: Pos): string {
    return '_' + pos.x + '.' + pos.y + '_';
}

function getStringAndDirFromPos(pos: PosAndDir): string {
    return '_' + pos.x + '.' + pos.y + '.' + pos.dirX + '.' + pos.dirY + '_';
}

console.log(result);
console.timeEnd('Time');