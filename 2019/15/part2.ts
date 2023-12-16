import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(n => parseInt(n));
const searchRadius = 30;

class Position {
    x: number;
    y: number;
}

class PosChange {
    xChange: number;
    yChange: number;
}

let posChanges = new Map<number, PosChange>();
posChanges.set(1, { xChange: 0, yChange: -1 });
posChanges.set(2, { xChange: 0, yChange: 1 });
posChanges.set(3, { xChange: -1, yChange: 0 });
posChanges.set(4, { xChange: 1, yChange: 0 });

class PositionToSearch {
    numbers: number[];
    counter: number;
    relativeBase: number;
    pos: Position;
    steps: number;
}

let positionsToSearch: PositionToSearch[] = [{ numbers: input, counter: 0, relativeBase: 0, pos: { x: searchRadius + 1, y: searchRadius + 1 }, steps: 0 }];
let oxygenStartPosition: Position = { x: -1, y: -1 };

let grid: string[][] = [];
for (let i = 0; i <= searchRadius * 2 + 2; i++) {
    grid[i] = new Array(searchRadius * 2 + 3).fill('+');
}
grid[positionsToSearch[0].pos.y][positionsToSearch[0].pos.x] = '.';

for (let l = 0; positionsToSearch.length != 0; l++) {
    let currentPositionToSearch = positionsToSearch.shift();

    for (let i = 1; i <= 4; i++) {
        if (grid[currentPositionToSearch.pos.y + posChanges.get(i).yChange][currentPositionToSearch.pos.x + posChanges.get(i).xChange] == '+') {
            let intcodeOutput = intcode({ ...currentPositionToSearch, numbers: currentPositionToSearch.numbers.slice() }, i);
            if (intcodeOutput[0] == 1) {
                let newXPos = intcodeOutput[1].pos.x + posChanges.get(i).xChange;
                let newYPos = intcodeOutput[1].pos.y + posChanges.get(i).yChange;
                if (newXPos >= 0 && newXPos < grid[0].length && newYPos >= 0 && newYPos < grid.length) positionsToSearch.push({ numbers: intcodeOutput[1].numbers, counter: intcodeOutput[1].counter, relativeBase: intcodeOutput[1].relativeBase, pos: { x: newXPos, y: newYPos }, steps: intcodeOutput[1].steps + 1 });
            }
        }
    }
}

grid[oxygenStartPosition.y][oxygenStartPosition.x] = 'O';

for (let m = 1; true; m++) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'O') {
                if (grid[y - 1][x] == '.') grid[y - 1][x] = 'n';
                if (grid[y + 1][x] == '.') grid[y + 1][x] = 'n';
                if (grid[y][x - 1] == '.') grid[y][x - 1] = 'n';
                if (grid[y][x + 1] == '.') grid[y][x + 1] = 'n';
            }
        }
    }

    for (let y1 = 0; y1 < grid.length; y1++) {
        for (let x1 = 0; x1 < grid[y1].length; x1++) {
            if (grid[y1][x1] == 'n') grid[y1][x1] = 'O';
        }
    }

    if (checkIfOxygenIsCompleted()) {
        console.log(m);
        break;
    }
}

function checkIfOxygenIsCompleted(): boolean {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '.') return false;
        }
    }
    return true;
}

function intcode(currentPositionToSearch: PositionToSearch, userInput: number): [number, PositionToSearch] {
    let output = -1;

    while (true) {
        let opcode = currentPositionToSearch.numbers[currentPositionToSearch.counter] % 100;
        let parameterMode1 = Math.floor(currentPositionToSearch.numbers[currentPositionToSearch.counter] / 100) % 10;
        let parameterMode2 = Math.floor(currentPositionToSearch.numbers[currentPositionToSearch.counter] / 1000) % 10;
        let parameterMode3 = Math.floor(currentPositionToSearch.numbers[currentPositionToSearch.counter] / 10000) % 10;

        let parameter1 = 0;
        let parameter2 = 0;

        if (parameterMode1 == 0) {
            parameter1 = currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 1]];
        } else if (parameterMode1 == 1) {
            parameter1 = currentPositionToSearch.numbers[currentPositionToSearch.counter + 1];
        } else if (parameterMode1 == 2) {
            parameter1 = currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 1] + currentPositionToSearch.relativeBase];
        }

        if (parameterMode2 == 0) {
            parameter2 = currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 2]];
        } else if (parameterMode2 == 1) {
            parameter2 = currentPositionToSearch.numbers[currentPositionToSearch.counter + 2];
        } else if (parameterMode2 == 2) {
            parameter2 = currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 2] + currentPositionToSearch.relativeBase];
        }

        if (parameter1 == null) parameter1 = 0;
        if (parameter2 == null) parameter2 = 0;
        if (currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3]] == null) currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3]] = 0;

        if (opcode == 1) {
            currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = parameter1 + parameter2;
            currentPositionToSearch.counter += 4;
        } else if (opcode == 2) {
            currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = parameter1 * parameter2;
            currentPositionToSearch.counter += 4;
        } else if (opcode == 3) {
            currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 1] + (parameterMode1 == 2 ? currentPositionToSearch.relativeBase : 0)] = userInput;
            currentPositionToSearch.counter += 2;
        } else if (opcode == 4) {
            output = parameter1;
            currentPositionToSearch.counter += 2;
            break;
        } else if (opcode == 5) {
            if (parameter1 != 0) {
                currentPositionToSearch.counter = parameter2;
            } else {
                currentPositionToSearch.counter += 3;
            }
        } else if (opcode == 6) {
            if (parameter1 == 0) {
                currentPositionToSearch.counter = parameter2;
            } else {
                currentPositionToSearch.counter += 3;
            }
        } else if (opcode == 7) {
            if (parameter1 < parameter2) {
                currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = 1;
            } else {
                currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = 0;
            }
            currentPositionToSearch.counter += 4;
        } else if (opcode == 8) {
            if (parameter1 == parameter2) {
                currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = 1;
            } else {
                currentPositionToSearch.numbers[currentPositionToSearch.numbers[currentPositionToSearch.counter + 3] + (parameterMode3 == 2 ? currentPositionToSearch.relativeBase : 0)] = 0;
            }
            currentPositionToSearch.counter += 4;
        } else if (opcode == 9) {
            currentPositionToSearch.relativeBase += parameter1;
            currentPositionToSearch.counter += 2;
        }
    }

    if (output == 0) {
        grid[currentPositionToSearch.pos.y + posChanges.get(userInput).yChange][currentPositionToSearch.pos.x + posChanges.get(userInput).xChange] = '#';
    } else if (output >= 1) {
        grid[currentPositionToSearch.pos.y + posChanges.get(userInput).yChange][currentPositionToSearch.pos.x + posChanges.get(userInput).xChange] = '.';
        if (output == 2) {
            oxygenStartPosition.x = currentPositionToSearch.pos.x + posChanges.get(userInput).xChange;
            oxygenStartPosition.y = currentPositionToSearch.pos.y + posChanges.get(userInput).yChange;
        }
    }

    return [output, currentPositionToSearch];
}

console.timeEnd('Time');