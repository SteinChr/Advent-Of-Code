import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

let instructions: string[] = ['NOT C T', 'AND D T', 'NOT B J', 'AND D J', 'OR T J', 'NOT A T', 'OR T J', 'WALK'];

let instructionsAscii: number[] = [];

for (let i = 0; i < instructions.length; i++) {
    for (let l = 0; l < instructions[i].length; l++) {
        instructionsAscii.push(instructions[i][l].charCodeAt(0));
    }

    instructionsAscii.push(10);
}

let out = intcode(input, instructionsAscii);
if (out[out.length - 1] > 1000) result = out.pop();

let outString: string[] = [];

for (let i = 0; i < out.length; i++) {
    outString.push(String.fromCharCode(out[i]));
}

console.log(outString.join(''));
console.log(result);

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