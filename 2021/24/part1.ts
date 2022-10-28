import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let currentValues = new Map<number, string>();
let newValues = new Map<number, string>();
newValues.set(0, '');
let maxZ = 1;
let result = 0;

for (let i = 0; i < 14; i++) {
    currentValues = new Map(newValues);
    newValues = new Map();
    if (input[i * 18 + 4][2] == '1') {
        maxZ *= 26;
    } else {
        maxZ /= 26;
    }
    for (let value of currentValues.entries()) {
        for (let num = 1; num <= 9; num++) {
            let currentResult = processInput(input.slice(i * 18, i * 18 + 18), { w: 0, x: 0, y: 0, z: value[0] }, num.toString());
            if (currentResult.z <= maxZ) {
                if (newValues.has(currentResult.z)) {
                    if (newValues.get(currentResult.z) < value[1] + num.toString()) {
                        newValues.set(currentResult.z, value[1] + num.toString());
                    }
                } else {
                    newValues.set(currentResult.z, value[1] + num.toString());
                }
            }
        }
    }
}

result = parseInt(newValues.get(0));
console.log(result);

function processInput(instructions, value, inputValue) {
    let newValue = { w: value.w, x: value.x, y: value.z, z: value.z };
    let inputPos = 0;
    for (let instruction of instructions) {
        if (instruction[0] == 'inp') {
            newValue[instruction[1]] = parseInt(inputValue.charAt(inputPos));
            inputPos++;
        } else if (instruction[0] == 'add') {
            newValue[instruction[1]] = newValue[instruction[1]] + getValue(instruction[2], newValue);
        } else if (instruction[0] == 'mul') {
            newValue[instruction[1]] = newValue[instruction[1]] * getValue(instruction[2], newValue);
        } else if (instruction[0] == 'div') {
            newValue[instruction[1]] = Math.floor(newValue[instruction[1]] / getValue(instruction[2], newValue));
        } else if (instruction[0] == 'mod') {
            newValue[instruction[1]] = newValue[instruction[1]] % getValue(instruction[2], newValue);
        } else if (instruction[0] == 'eql') {
            if (newValue[instruction[1]] == getValue(instruction[2], newValue)) {
                newValue[instruction[1]] = 1;
            } else {
                newValue[instruction[1]] = 0;
            }
        }
    }
    return newValue;
}

function getValue(instruction, value) {
    if (instruction == 'w' || instruction == 'x' || instruction == 'y' || instruction == 'z') {
        return value[instruction];
    } else {
        return parseInt(instruction);
    }
}

console.timeEnd('Time');