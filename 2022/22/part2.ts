import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

class Position {
    x: number;
    y: number;
}

class Wrap {
    position: Position;
    direction: Position;
}

let grid = input[0].map(x => x.replace(/\s/g, 'x').split(''));
let lineLengths = grid.map(x => x.length);
let maxLineLength = Math.max(...lineLengths);
for (let i = 0; i < grid.length; i++) {
    while (grid[i].length < maxLineLength) {
        grid[i].push('x');
    }
}
grid.unshift(new Array(maxLineLength).fill('x'));
grid.push(new Array(maxLineLength).fill('x'));
for (let y = 0; y < grid.length; y++) {
    grid[y].unshift('x');
    grid[y].push('x');
}

let splittedInstructionsInput: string[] = input[1][0].split('');
let currentInstruction: string = '';
let instructions: string[] = [];
for (let i = 0; i < splittedInstructionsInput.length; i++) {
    if (splittedInstructionsInput[i] == 'R' || splittedInstructionsInput[i] == 'L') {
        instructions.push(currentInstruction);
        instructions.push(splittedInstructionsInput[i]);
        currentInstruction = '';
    } else {
        currentInstruction += splittedInstructionsInput[i];
    }
}
if (currentInstruction != '') instructions.push(currentInstruction);

let currentDirection: Position = { x: 1, y: 0 };
let currentPosition: Position = { x: -1, y: -1 };
outerLoop: for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == '.') {
            currentPosition = { x: x, y: y };
            break outerLoop;
        }
    }
}

const sideLength = grid[0].length;

for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] == 'R') {
        if (currentDirection.x == 1 && currentDirection.y == 0) {
            currentDirection = { x: 0, y: 1 };
        } else if (currentDirection.x == 0 && currentDirection.y == 1) {
            currentDirection = { x: -1, y: 0 };
        } else if (currentDirection.x == -1 && currentDirection.y == 0) {
            currentDirection = { x: 0, y: -1 };
        } else if (currentDirection.x == 0 && currentDirection.y == -1) {
            currentDirection = { x: 1, y: 0 };
        }
    } else if (instructions[i] == 'L') {
        if (currentDirection.x == 1 && currentDirection.y == 0) {
            currentDirection = { x: 0, y: -1 };
        } else if (currentDirection.x == 0 && currentDirection.y == -1) {
            currentDirection = { x: -1, y: 0 };
        } else if (currentDirection.x == -1 && currentDirection.y == 0) {
            currentDirection = { x: 0, y: 1 };
        } else if (currentDirection.x == 0 && currentDirection.y == 1) {
            currentDirection = { x: 1, y: 0 };
        }
    } else {
        let numberOfStepsGiven = parseInt(instructions[i]);
        let wrap: Wrap = { position: { x: 0, y: 0 }, direction: { x: 0, y: 0 } };
        for (let s = 1; s <= numberOfStepsGiven; s++) {
            if (grid[currentPosition.y + currentDirection.y][currentPosition.x + currentDirection.x] == '.') {
                currentPosition.x += currentDirection.x;
                currentPosition.y += currentDirection.y;
            } else if (grid[currentPosition.y + currentDirection.y][currentPosition.x + currentDirection.x] == 'x') {
                wrap = wrapAroundCube({ x: currentPosition.x + currentDirection.x, y: currentPosition.y + currentDirection.y });
                if (grid[wrap.position.y][wrap.position.x] == '.') {
                    currentPosition = wrap.position;
                    currentDirection = wrap.direction;
                    wrap = { position: { x: 0, y: 0 }, direction: { x: 0, y: 0 } };
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
}

function wrapAroundCube(pos: Position): Wrap {
    if (sideLength < 50) { // test input
        if (pos.y == 4 && pos.x >= 5 && pos.x <= 8) { // 3 up
            return ({ position: { x: 9, y: pos.x - 4 }, direction: { x: 1, y: 0 } });
        } else if (pos.y >= 5 && pos.y <= 8 && pos.x == 13) { // 4 right
            return ({ position: { x: 21 - pos.y, y: 9 }, direction: { x: 0, y: 1 } });
        } else if (pos.y == 13 && pos.x <= 12) { // 5 down
            return ({ position: { x: 13 - pos.x, y: 8 }, direction: { x: 0, y: -1 } });
        }
    } else { // real input
        if (pos.y == 0 && pos.x <= 100) { // 1 up
            return ({ position: { x: 1, y: 100 + pos.x }, direction: { x: 1, y: 0 } });
        } else if (pos.y <= 50 && pos.x == 50) { // 1 left
            return ({ position: { x: 1, y: 151 - pos.y }, direction: { x: 1, y: 0 } });
        } else if (pos.y == 0 && pos.x >= 101) { // 2 up
            return ({ position: { x: pos.x - 100, y: 200 }, direction: { x: 0, y: -1 } });
        } else if (pos.x == 151) { // 2 right
            return ({ position: { x: 100, y: 151 - pos.y }, direction: { x: -1, y: 0 } });
        } else if (pos.y == 51 && pos.x >= 101) { // 2 down
            return ({ position: { x: 100, y: pos.x - 50 }, direction: { x: -1, y: 0 } });
        } else if (pos.y >= 51 && pos.y <= 100 && pos.x == 50) { // 3 left
            return ({ position: { x: pos.y - 50, y: 101 }, direction: { x: 0, y: 1 } });
        } else if (pos.y >= 51 && pos.y <= 100 && pos.x == 101) { // 3 right
            return ({ position: { x: 50 + pos.y, y: 50 }, direction: { x: 0, y: -1 } });
        } else if (pos.y == 100 && pos.x <= 50) { // 4 up
            return ({ position: { x: 51, y: 50 + pos.x }, direction: { x: 1, y: 0 } });
        } else if (pos.y <= 150 && pos.x == 0) { // 4 left
            return ({ position: { x: 51, y: 151 - pos.y }, direction: { x: 1, y: 0 } });
        } else if (pos.y >= 101 && pos.x == 101) { // 5 right
            return ({ position: { x: 150, y: 151 - pos.y }, direction: { x: -1, y: 0 } });
        } else if (pos.y == 151 && pos.x >= 51 && pos.x <= 100) { // 5 down
            return ({ position: { x: 50, y: 100 + pos.x }, direction: { x: -1, y: 0 } });
        } else if (pos.y >= 151 && pos.x == 0) { // 6 left
            return ({ position: { x: pos.y - 100, y: 1 }, direction: { x: 0, y: 1 } });
        } else if (pos.y >= 151 && pos.x == 51) { // 6 right
            return ({ position: { x: pos.y - 100, y: 150 }, direction: { x: 0, y: -1 } });
        } else if (pos.y == 201) { // 6 down
            return ({ position: { x: 100 + pos.x, y: 1 }, direction: { x: 0, y: 1 } });
        }
    }
}

let directionNumber = -1;
if (currentDirection.x == 1 && currentDirection.y == 0) directionNumber = 0;
if (currentDirection.x == 0 && currentDirection.y == 1) directionNumber = 1;
if (currentDirection.x == -1 && currentDirection.y == 0) directionNumber = 2;
if (currentDirection.x == 0 && currentDirection.y == -1) directionNumber = 3;

result = currentPosition.y * 1000 + currentPosition.x * 4 + directionNumber;
console.log(result);
console.timeEnd('Time');