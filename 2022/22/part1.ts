import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

class Position {
    x: number;
    y: number;
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
        let numberOfStepsPossible = 0;
        let wrap: Position = { x: 0, y: 0 };
        stepLoop: for (let s = 1; s <= numberOfStepsGiven; s++) {
            if (grid[currentPosition.y + currentDirection.y * s + wrap.y][currentPosition.x + currentDirection.x * s + wrap.x] == '.') {
                numberOfStepsPossible++;
            } else if (grid[currentPosition.y + currentDirection.y * s + wrap.y][currentPosition.x + currentDirection.x * s + wrap.x] == 'x') {
                let wrapFound: boolean = false;
                let wrapConfirmed: boolean = false;
                let possibleWrap: Position = { x: 0, y: 0 };
                for (let w = 1; !wrapConfirmed; !wrapFound ? w++ : w--) {
                    if (wrapFound && grid[currentPosition.y + currentDirection.y * w * -1 + wrap.y][currentPosition.x + currentDirection.x * w * -1 + wrap.x] == '.') {
                        wrapConfirmed = true;
                        numberOfStepsPossible++;
                        wrap.y += possibleWrap.y;
                        wrap.x += possibleWrap.x;
                    } else if (wrapFound && grid[currentPosition.y + currentDirection.y * w * -1 + wrap.y][currentPosition.x + currentDirection.x * w * -1 + wrap.x] == '#') {
                        break stepLoop;
                    }
                    if (!wrapFound && grid[currentPosition.y + currentDirection.y * w * -1 + wrap.y][currentPosition.x + currentDirection.x * w * -1 + wrap.x] == 'x') {
                        wrapFound = true;
                        possibleWrap.y = currentDirection.y * (w + numberOfStepsPossible) * -1;
                        possibleWrap.x = currentDirection.x * (w + numberOfStepsPossible) * -1;
                    }
                }
            } else {
                break;
            }
        }
        currentPosition.x += numberOfStepsPossible * currentDirection.x + wrap.x;
        currentPosition.y += numberOfStepsPossible * currentDirection.y + wrap.y;
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