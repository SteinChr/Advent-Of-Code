import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

class Coordinate {
    x: number;
    y: number;
}

let asciiCodes: number[] = intcode(input.slice(), []);

let stringGrid = '';

for (let i = 0; i < asciiCodes.length; i++) {
    stringGrid += String.fromCharCode(asciiCodes[i]);
}

let grid: string[][] = stringGrid.split('\n').map(x => x.split(''));

grid.push(new Array(grid[0].length).fill('.'));
grid.unshift(new Array(grid[0].length).fill('.'));

for (let y = 0; y < grid.length; y++) {
    grid[y].push('.');
    grid[y].unshift('.');
}

let pos: Coordinate = { x: 0, y: 0 };
let dir: Coordinate = { x: 0, y: 0 };

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] != '.' && grid[y][x] != '#') {
            pos.x = x;
            pos.y = y;

            if (grid[y][x] == '<') dir = { x: -1, y: 0 };
            if (grid[y][x] == '>') dir = { x: 1, y: 0 };
            if (grid[y][x] == '^') dir = { x: 0, y: -1 };
            if (grid[y][x] == 'v') dir = { x: 0, y: 1 };
        }
    }
}

let currentStraightAhead = 0;
let path = '';

while (true) {
    if (grid[pos.y + dir.y][pos.x + dir.x] == '#') {
        currentStraightAhead++;

        pos.x += dir.x;
        pos.y += dir.y;
    } else if (grid[pos.y + dir.x][pos.x + dir.y] == '#' || grid[pos.y + dir.x * -1][pos.x + dir.y * -1] == '#') {
        if (currentStraightAhead != 0) path += currentStraightAhead.toString() + ',';
        currentStraightAhead = 0;

        if (grid[pos.y - 1][pos.x] == '#' && dir.y == 0) {
            if (dir.x == -1) path += 'R';
            if (dir.x == 1) path += 'L';

            dir.x = 0;
            dir.y = -1;
        } else if (grid[pos.y + 1][pos.x] == '#' && dir.y == 0) {
            if (dir.x == -1) path += 'L';
            if (dir.x == 1) path += 'R';

            dir.x = 0;
            dir.y = 1;
        } else if (grid[pos.y][pos.x - 1] == '#' && dir.x == 0) {
            if (dir.y == -1) path += 'L';
            if (dir.y == 1) path += 'R';

            dir.x = -1;
            dir.y = 0;
        } else if (grid[pos.y][pos.x + 1] == '#' && dir.x == 0) {
            if (dir.y == -1) path += 'R';
            if (dir.y == 1) path += 'L';

            dir.x = 1;
            dir.y = 0;
        }

        path += ',';
    } else {
        path += currentStraightAhead.toString();
        break;
    }
}

let patternGroups: string[] = [];
let patternFound: boolean = false;

findPatterns(path.replace(/R,/g, 'R').replace(/L,/g, 'L').split(','), 1, []);

for (let i = 0; i < patternGroups.length; i++) {
    patternGroups[i] = patternGroups[i].replace(/R/g, 'R,').replace(/L/g, 'L,');
}

let mainRoutine = '';

while (path.length != 0) {
    for (let i = 0; i < patternGroups.length; i++) {
        if (path.startsWith(patternGroups[i])) {
            mainRoutine += i;
            path = path.slice(patternGroups[i].length + 1);
        }
    }
}

let inputInstructions: number[] = [];

for (let i = 0; i < mainRoutine.length; i++) {
    if (mainRoutine[i] == '0') inputInstructions.push('A'.charCodeAt(0));
    if (mainRoutine[i] == '1') inputInstructions.push('B'.charCodeAt(0));
    if (mainRoutine[i] == '2') inputInstructions.push('C'.charCodeAt(0));

    if (i < mainRoutine.length - 1) {
        inputInstructions.push(','.charCodeAt(0));
    } else {
        inputInstructions.push(10);
    }
}

for (let g = 0; g < patternGroups.length; g++) {
    for (let i = 0; i < patternGroups[g].length; i++) {
        inputInstructions.push(patternGroups[g].charCodeAt(i));
    }

    inputInstructions.push(10);
}

inputInstructions.push('n'.charCodeAt(0));
inputInstructions.push(10);

input[0] = 2;
let intcodeOutput = intcode(input.slice(), inputInstructions);
result = intcodeOutput[intcodeOutput.length - 1];

console.log(result);

function findPatterns(instructions: string[], depth: number, allPatterns: string[]) {
    if (!patternFound) {
        if (depth <= 3) {
            for (let i = 0; i < instructions.length; i++) {
                for (let l = 0; l < instructions.length; l++) {
                    if (i <= l) {
                        let patternToTest = instructions.slice(i, l + 1).join(',');
                        if (checkLengthOfPattern(patternToTest) <= 20 && !patternToTest.includes('.') && patternToTest.includes(',')) createPossibilities(instructions, depth, patternToTest, allPatterns);
                    }
                }
            }
        } else {
            if (instructions.filter(x => x != '.').length == 0) {
                patternGroups.push(...allPatterns);
                patternFound = true;
            }
        }
    }
}

function createPossibilities(instructions: string[], depth: number, currentPattern: string, allPatterns: string[]) {
    if (!patternFound) {
        let currentPatternArray = currentPattern.split(',');
        let currentPatterLength = currentPatternArray.length;

        let noChanges = true;

        for (let i = 0; i < instructions.length; i++) {
            let possibleStartPos: boolean = true;

            for (let p = 0; p < currentPatterLength; p++) {
                if (currentPatternArray[p] != instructions[i + p]) possibleStartPos = false;
            }

            if (possibleStartPos) {
                createPossibilities([...instructions.slice(0, i), '.', ...instructions.slice(i + currentPatterLength)], depth, currentPattern, allPatterns);
                noChanges = false;
            }
        }

        if (noChanges) findPatterns(instructions, depth + 1, [...allPatterns, currentPattern]);
    }
}

function checkLengthOfPattern(pattern: string): number {
    return pattern.length + pattern.split('').filter(x => x == ',').length + 1;
}

function intcode(numbers: number[], userInputs: number[]): number[] {
    let counter = 0;
    let userInputCounter = 0;
    let relativeBase = 0;
    let output: number[] = [];

    while (true) {
        let opcode = numbers[counter] % 100;
        let parameterMode1 = Math.floor(numbers[counter] / 100) % 10;
        let parameterMode2 = Math.floor(numbers[counter] / 1000) % 10;
        let parameterMode3 = Math.floor(numbers[counter] / 10000) % 10;

        let parameter1 = 0;
        let parameter2 = 0;

        if (parameterMode1 == 0) {
            parameter1 = numbers[numbers[counter + 1]];
        } else if (parameterMode1 == 1) {
            parameter1 = numbers[counter + 1];
        } else if (parameterMode1 == 2) {
            parameter1 = numbers[numbers[counter + 1] + relativeBase];
        }

        if (parameterMode2 == 0) {
            parameter2 = numbers[numbers[counter + 2]];
        } else if (parameterMode2 == 1) {
            parameter2 = numbers[counter + 2];
        } else if (parameterMode2 == 2) {
            parameter2 = numbers[numbers[counter + 2] + relativeBase];
        }

        if (parameter1 == null) parameter1 = 0;
        if (parameter2 == null) parameter2 = 0;
        if (numbers[numbers[counter + 3]] == null) numbers[numbers[counter + 3]] = 0;

        if (opcode == 1) {
            numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 + parameter2;
            counter += 4;
        } else if (opcode == 2) {
            numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 * parameter2;
            counter += 4;
        } else if (opcode == 3) {
            numbers[numbers[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = userInputs[userInputCounter];
            userInputCounter++;
            counter += 2;
        } else if (opcode == 4) {
            output.push(parameter1);
            counter += 2;
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
                numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 8) {
            if (parameter1 == parameter2) {
                numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                numbers[numbers[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 9) {
            relativeBase += parameter1;
            counter += 2;
        } else if (opcode == 99) {
            return output;
        }
    }
}

console.timeEnd('Time');