import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let counter = 0;
const userInput = 5;
let output = 0;

while (true) {
    let opcode = numbers[counter] % 100;
    let parameterMode1 = Math.floor(numbers[counter] / 100) % 10;
    let parameterMode2 = Math.floor(numbers[counter] / 1000) % 10;
    let parameter1 = 0;
    let parameter2 = 0;

    if (parameterMode1 == 0) {
        parameter1 = numbers[numbers[counter + 1]];
    } else {
        parameter1 = numbers[counter + 1];
    }

    if (parameterMode2 == 0) {
        parameter2 = numbers[numbers[counter + 2]];
    } else {
        parameter2 = numbers[counter + 2];
    }

    if (opcode == 1) {
        numbers[numbers[counter + 3]] = parameter1 + parameter2;
        counter += 4;
    } else if (opcode == 2) {
        numbers[numbers[counter + 3]] = parameter1 * parameter2;
        counter += 4;
    } else if (opcode == 3) {
        numbers[numbers[counter + 1]] = userInput;
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
            numbers[numbers[counter + 3]] = 1;
        } else {
            numbers[numbers[counter + 3]] = 0;
        }
        counter += 4;
    } else if (opcode == 8) {
        if (parameter1 == parameter2) {
            numbers[numbers[counter + 3]] = 1;
        } else {
            numbers[numbers[counter + 3]] = 0;
        }
        counter += 4;
    } else if (opcode == 99) {
        console.log(output);
        break;
    }
}

console.timeEnd('Time');