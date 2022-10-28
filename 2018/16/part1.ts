import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n\r\n\r\n')[0].split('\r\n\r\n');
let before: number[][] = input.map(x => x.split('\r\n')[0].split('Before: [')[1].split(']')[0].split(', ').map(y => parseInt(y)));
let sampleInstrucctions: number[][] = input.map(x => x.split('\r\n')[1].split(' ').map(y => parseInt(y)));
let after: number[][] = input.map(x => x.split('\r\n')[2].split('After:  [')[1].split(']')[0].split(', ').map(y => parseInt(y)));

let result = 0;

for (let i = 0; i < before.length; i++) {
    if (getNumberOfPossilbleOpcodes(before[i], sampleInstrucctions[i], after[i]) >= 3) result++;
}

console.log(result);

function getNumberOfPossilbleOpcodes(before: number[], instrucctions: number[], after: number[]): number {
    let numberOfPossibleOpcodes: number = 0;
    if (compareArrays(addr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(addi(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(mulr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(muli(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(banr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(bani(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(borr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(bori(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(setr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(seti(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(gtir(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(gtri(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(gtrr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(eqir(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(eqri(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    if (compareArrays(eqrr(before.slice(), instrucctions.slice()), after.slice())) numberOfPossibleOpcodes++;
    return numberOfPossibleOpcodes;
}

function compareArrays(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
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