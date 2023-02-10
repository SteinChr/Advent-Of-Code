import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

class Robot {
    xPos: number;
    yPos: number;
    xDir: number;
    yDir: number;
}

let counter = 0;
let relativeBase = 0;
let programHalted: boolean = false;
const gridSize = 250;
let robot: Robot = { xPos: gridSize / 2, yPos: gridSize / 2, xDir: 0, yDir: -1 };

let grid = new Array(gridSize);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize).fill(2);
}

while (!programHalted) {
    let outputOfIntcode = intcode(grid[robot.yPos][robot.xPos] % 2);
    grid[robot.yPos][robot.xPos] = outputOfIntcode[0];
    updateRobot(outputOfIntcode[1]);
}

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] != 2) result++;
    }
}

console.log(result);

function updateRobot(newDirection) {
    if (newDirection == 0) {
        if (robot.xDir == 0 && robot.yDir == -1) {
            robot.xDir = -1;
            robot.yDir = 0;
        } else if (robot.xDir == 1 && robot.yDir == 0) {
            robot.xDir = 0;
            robot.yDir = -1;
        } else if (robot.xDir == 0 && robot.yDir == 1) {
            robot.xDir = 1;
            robot.yDir = 0;
        } else if (robot.xDir == -1 && robot.yDir == 0) {
            robot.xDir = 0;
            robot.yDir = 1;
        }
    } else {
        if (robot.xDir == 0 && robot.yDir == -1) {
            robot.xDir = 1;
            robot.yDir = 0;
        } else if (robot.xDir == 1 && robot.yDir == 0) {
            robot.xDir = 0;
            robot.yDir = 1;
        } else if (robot.xDir == 0 && robot.yDir == 1) {
            robot.xDir = -1;
            robot.yDir = 0;
        } else if (robot.xDir == -1 && robot.yDir == 0) {
            robot.xDir = 0;
            robot.yDir = -1;
        }
    }
    robot.xPos += robot.xDir;
    robot.yPos += robot.yDir;
}

function intcode(inputColor): number[] {
    let output1: number;
    let output2: number;

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
            input[input[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = inputColor;
            counter += 2;
        } else if (opcode == 4) {
            counter += 2;
            if (output1 === undefined) {
                output1 = parameter1;
            } else {
                output2 = parameter1;
                break;
            }
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
    return [output1, output2];
}

console.timeEnd('Time');