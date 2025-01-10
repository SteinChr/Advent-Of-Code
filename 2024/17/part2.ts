import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').map(y => y.split(/\s|,/)));
let result = 0;

let registers: number[] = [];
let program: number[] = [];

for (let i = 0; i < input[0].length; i++) {
    registers.push(parseInt(input[0][i][2]));
}

for (let i = 1; i < input[1][0].length; i++) {
    program.push(parseInt(input[1][0][i]));
}

let finalWantedOutput = program.join(',');

let programIndex = program.length - 1;
let currentWantedOutput = program.slice(programIndex).toString();
programIndex--;

let tryValue = 0;

while (true) {
    setInitialValues();
    registers[0] = tryValue;
    let output = doOperation();

    if (output == finalWantedOutput) {
        result = tryValue;
        break;
    }

    if (output == currentWantedOutput) {
        tryValue *= 8;
        currentWantedOutput = program.slice(programIndex).join(',');
        programIndex--;
    } else {
        tryValue++;
    }    
}

console.log(result);

function setInitialValues() {
    registers = [];

    for (let i = 0; i < input[0].length; i++) {
        registers.push(parseInt(input[0][i][2]));
    }
}

function doOperation(): string {
    let outputs: number[] = [];

    for (let instructionPointer = 0; instructionPointer < program.length; instructionPointer += 2) {
        let opcode = program[instructionPointer];
        let literalOperand = program[instructionPointer + 1];
        let comboOperand = findComboOperand(program[instructionPointer + 1]);

        if (opcode == 0) {
            registers[0] = Math.floor(registers[0] / Math.pow(2, comboOperand));
        } else if (opcode == 1) {
            registers[1] = registers[1] ^ literalOperand;
        } else if (opcode == 2) {
            registers[1] = comboOperand % 8;
            if (registers[1] < 0) registers[1] += 8;
        } else if (opcode == 3) {
            if (registers[0] != 0) {
                instructionPointer = literalOperand;
                instructionPointer -= 2;
            }
        } else if (opcode == 4) {
            registers[1] = registers[1] ^ registers[2];
        } else if (opcode == 5) {
            outputs.push((comboOperand % 8) >= 0 ? comboOperand % 8 : (comboOperand % 8) + 8);
        } else if (opcode == 6) {
            registers[1] = Math.floor(registers[0] / Math.pow(2, comboOperand));
        } else if (opcode == 7) {
            registers[2] = Math.floor(registers[0] / Math.pow(2, comboOperand));
        }
    }

    return outputs.join(',');
}

function findComboOperand(num: number): number {
    if (num <= 3) return num;
    if (num == 4) return registers[0];
    if (num == 5) return registers[1];
    if (num == 6) return registers[2];
}

console.timeEnd('Time');