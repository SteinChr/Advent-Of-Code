import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

class Tile {
    x: number;
    y: number;
    id: number
}

let counter = 0;
let relativeBase = 0;
let programHalted: boolean = false;

let tiles: Tile[] = [];

while (!programHalted) {
    let output: number[] = intcode();
    if (!programHalted) tiles.push({ x: output[0], y: output[1], id: output[2] });
}

for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].id == 2) result++;
}

console.log(result);

function intcode(): number[] {
    let output1: number;
    let output2: number;
    let output3: number;

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
        } else if (opcode == 4) {
            counter += 2;
            if (output1 === undefined) {
                output1 = parameter1;
            } else if (output2 === undefined) {
                output2 = parameter1;
            } else {
                output3 = parameter1;
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
    return [output1, output2, output3];
}

console.timeEnd('Time');