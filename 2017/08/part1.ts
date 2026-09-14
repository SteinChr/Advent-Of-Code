import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = Number.MIN_VALUE;

class Instruction {
    register: string;
    change: number;
    conditionRegister: string;
    conditionOperator: string;
    conditionNumber: number;
}

let instructions: Instruction[] = [];

for (let i = 0; i < input.length; i++) {
    instructions.push({ register: input[i][0], change: input[i][1] == 'inc' ? parseInt(input[i][2]) : parseInt(input[i][2]) * -1, conditionRegister: input[i][4], conditionOperator: input[i][5], conditionNumber: parseInt(input[i][6]) });
}

let register = new Map<string, number>();

for (let i = 0; i < instructions.length; i++) {
    if (!register.has(instructions[i].register)) register.set(instructions[i].register, 0);
    if (!register.has(instructions[i].conditionRegister)) register.set(instructions[i].conditionRegister, 0);

    let conditionFulfilled: boolean = false;

    if (instructions[i].conditionOperator == '>') {
        if (register.get(instructions[i].conditionRegister) > instructions[i].conditionNumber) conditionFulfilled = true;
    } else if (instructions[i].conditionOperator == '<') {
        if (register.get(instructions[i].conditionRegister) < instructions[i].conditionNumber) conditionFulfilled = true;
    } else if (instructions[i].conditionOperator == '>=') {
        if (register.get(instructions[i].conditionRegister) >= instructions[i].conditionNumber) conditionFulfilled = true;
    } else if (instructions[i].conditionOperator == '<=') {
        if (register.get(instructions[i].conditionRegister) <= instructions[i].conditionNumber) conditionFulfilled = true;
    } else if (instructions[i].conditionOperator == '==') {
        if (register.get(instructions[i].conditionRegister) == instructions[i].conditionNumber) conditionFulfilled = true;
    } else if (instructions[i].conditionOperator == '!=') {
        if (register.get(instructions[i].conditionRegister) != instructions[i].conditionNumber) conditionFulfilled = true;
    }

    if (conditionFulfilled) {
        register.set(instructions[i].register, register.get(instructions[i].register) + instructions[i].change);
    }
}

register.forEach((value, key) => {
    if (result < value) result = value;
});

console.log(result);
console.timeEnd('Time');