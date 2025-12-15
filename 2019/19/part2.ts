import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

const gridSize = 5000;

let grid: number[][] = [];
for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize).fill(0);
}

let minXToCheck = 0;
let maxXToCheck = 20;

for (let y = 0; y < gridSize; y++) {
    for (let x = minXToCheck; x < maxXToCheck; x++) {
        input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
        grid[y][x] = intcode(x, y);
    }

    if (y >= 15) {
        minXToCheck = grid[y].indexOf(1) - 5;
        maxXToCheck = grid[y].lastIndexOf(1) + 5;
    }

    if (y % 100 == 0) {
        let squareStartCoord = checkForSquare(grid);
        
        if (squareStartCoord.x != -1) {
            result = squareStartCoord.x * 10000 + squareStartCoord.y;
            break;
        }
    }
}

console.log(result);

function checkForSquare(grid: number[][]): { x: number, y: number } {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 1) {
                let squarePossible: boolean = true;

                for (let y1 = y; y1 < y + 100 && squarePossible; y1++) {
                    if (grid.length <= y1 || grid[y1][x] != 1) squarePossible = false;
                }

                for (let x1 = x; x1 < x + 100 && squarePossible; x1++) {
                    if (grid[y].length <= x1 || grid[y][x1] != 1) squarePossible = false;
                }

                if (squarePossible) {
                    return { x: x, y: y };
                }
            }
        }
    }

    return { x: -1, y: -1 };
}

function intcode(x: number, y: number): number {
    let output: number = -1;

    let counter = 0;
    let relativeBase = 0;

    let programHalted: boolean = false;
    let xAlreadyAsked: boolean = false;

    while (true) {
        let opcode = input[counter] % 100;
        let parameterMode1 = Math.floor(input[counter] / 100) % 10;
        let parameterMode2 = Math.floor(input[counter] / 1000) % 10;
        let parameterMode3 = Math.floor(input[counter] / 10000) % 10;

        let parameter1 = 0;
        let parameter2 = 0;

        if (parameterMode1 == 0) {
            parameter1 = input[input[counter + 1]];
        } else if (parameterMode1 == 1) {
            parameter1 = input[counter + 1];
        } else if (parameterMode1 == 2) {
            parameter1 = input[input[counter + 1] + relativeBase];
        }

        if (parameterMode2 == 0) {
            parameter2 = input[input[counter + 2]];
        } else if (parameterMode2 == 1) {
            parameter2 = input[counter + 2];
        } else if (parameterMode2 == 2) {
            parameter2 = input[input[counter + 2] + relativeBase];
        }

        if (opcode == 1) {
            input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 + parameter2;
            counter += 4;
        } else if (opcode == 2) {
            input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 * parameter2;
            counter += 4;
        } else if (opcode == 3) {
            if (xAlreadyAsked) {
                input[input[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = y;
            } else {
                input[input[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = x;
                xAlreadyAsked = true;
            }
            counter += 2;
        } else if (opcode == 4) {
            counter += 2;
            output = parameter1;
            break;
        } else if (opcode == 5) {
            if (parameter1 != 0) {
                counter = parameter2;
            } else {
                counter += 3;
            }
        } else if (opcode == 6) {
            if (parameter1 == 0) {
                counter = parameter2;
            } else {
                counter += 3;
            }
        } else if (opcode == 7) {
            if (parameter1 < parameter2) {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 8) {
            if (parameter1 == parameter2) {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 9) {
            relativeBase += parameter1;
            counter += 2;
        } else if (opcode == 99) {
            programHalted = true;
            break;
        }
    }
    return output;
}

console.timeEnd('Time');