import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let indexOfInstructionPointer = parseInt(input[0][1]);
let instructionPointer = 0;
input.shift();

let registers: number[] = [0, 0, 0, 0, 0, 0];
let opcodes: string[] = [];
let instructions: number[][] = [];
let registerToWatch = 0;
let opcodeToWatch = 0;
let result = 0;

for (let i = 0; i < input.length; i++) {
    opcodes.push(input[i][0]);
    instructions.push(input[i].slice(1).map(x => parseInt(x)));
}
for (let i = 0; i < instructions.length; i++) {
    instructions[i].unshift(-1);
}

for (let i = 0; i < opcodes.length; i++) {
    if (opcodes[i] == 'eqrr' && (instructions[i][1] == 0 || instructions[i][2] == 0)) {
        registerToWatch = instructions[i][1] + instructions[i][2];
        opcodeToWatch = i;
    }
}

tryDevice(0, opcodeToWatch);
console.log(result);

function tryDevice(registerZero: number, opcodeToWatch: number) {
    let repeat = new Set<number>();
    registers = [registerZero, 0, 0, 0, 0, 0];
    instructionPointer = 0;

    for (let i = 0; true; i++) {
        registers[indexOfInstructionPointer] = instructionPointer;

        if (opcodes[instructionPointer] == 'addr') registers = addr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'addi') registers = addi(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'mulr') registers = mulr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'muli') registers = muli(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'banr') registers = banr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'bani') registers = bani(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'borr') registers = borr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'bori') registers = bori(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'setr') registers = setr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'seti') registers = seti(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'gtir') registers = gtir(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'gtri') registers = gtri(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'gtrr') registers = gtrr(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'eqir') registers = eqir(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'eqri') registers = eqri(registers, instructions[instructionPointer]);
        if (opcodes[instructionPointer] == 'eqrr') registers = eqrr(registers, instructions[instructionPointer]);

        if (instructionPointer == opcodeToWatch) {
            if (repeat.has(registers[registers.length - 1])) break;

            repeat.add(registers[registers.length - 1]);
            result = registers[registers.length - 1];
        }

        instructionPointer = registers[indexOfInstructionPointer];
        instructionPointer++;
    }
}

function addr(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] + register[instrucctions[2]];
    return register;
}
function addi(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] + instrucctions[2];
    return register;
}
function mulr(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] * register[instrucctions[2]];
    return register;
}
function muli(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] * instrucctions[2];
    return register;
}
function banr(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] & register[instrucctions[2]];
    return register;
}
function bani(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] & instrucctions[2];
    return register;
}
function borr(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] | register[instrucctions[2]];
    return register;
}
function bori(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]] | instrucctions[2];
    return register;
}
function setr(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = register[instrucctions[1]];
    return register;
}
function seti(register: number[], instrucctions: number[]): number[] {
    register[instrucctions[3]] = instrucctions[1];
    return register;
}
function gtir(register: number[], instrucctions: number[]): number[] {
    if (instrucctions[1] > register[instrucctions[2]]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}
function gtri(register: number[], instrucctions: number[]): number[] {
    if (register[instrucctions[1]] > instrucctions[2]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}
function gtrr(register: number[], instrucctions: number[]): number[] {
    if (register[instrucctions[1]] > register[instrucctions[2]]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}
function eqir(register: number[], instrucctions: number[]): number[] {
    if (instrucctions[1] == register[instrucctions[2]]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}
function eqri(register: number[], instrucctions: number[]): number[] {
    if (register[instrucctions[1]] == instrucctions[2]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}
function eqrr(register: number[], instrucctions: number[]): number[] {
    if (register[instrucctions[1]] == register[instrucctions[2]]) {
        register[instrucctions[3]] = 1;
    } else {
        register[instrucctions[3]] = 0;
    }
    return register;
}

console.timeEnd('Time');