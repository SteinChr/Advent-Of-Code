import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let counter = 0;
const userInput = 1;
let output = 0;
let relativeBase = 0;

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
        numbers[numbers[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = userInput;
        counter += 2;
    } else if (opcode == 4) {
        output = parameter1;
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
        console.log(output);
        break;
    }
}

console.timeEnd('Time');