import { readFileSync } from 'fs';
console.time('Time');
let input1 = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n\r\n\r\n')[0].split('\r\n\r\n');
let input2 = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n\r\n\r\n')[1].split('\r\n');
let before: number[][] = input1.map(x => x.split('\r\n')[0].split('Before: [')[1].split(']')[0].split(', ').map(y => parseInt(y)));
let sampleInstrucctions: number[][] = input1.map(x => x.split('\r\n')[1].split(' ').map(y => parseInt(y)));
let after: number[][] = input1.map(x => x.split('\r\n')[2].split('After:  [')[1].split(']')[0].split(', ').map(y => parseInt(y)));
let instrucctions: number[][] = input2.map(x => x.split(' ').map(y => parseInt(y)));
let register: number[] = [0, 0, 0, 0];

let result = 0;

let opcodes: string[] = new Array(16);
let possibleOpcodes: string[][] = new Array(16);
findOpcodes();

for (let i = 0; i < instrucctions.length; i++) {
    register = eval(opcodes[instrucctions[i][0]])(register, instrucctions[i]);
}

result = register[0];
console.log(result);

function findOpcodes() {
    let foundOpcodes: number = 0;
    for (let i = 0; i < possibleOpcodes.length; i++) {
        possibleOpcodes[i] = []
        possibleOpcodes[i].push('addr');
        possibleOpcodes[i].push('addi');
        possibleOpcodes[i].push('mulr');
        possibleOpcodes[i].push('muli');
        possibleOpcodes[i].push('banr');
        possibleOpcodes[i].push('bani');
        possibleOpcodes[i].push('borr');
        possibleOpcodes[i].push('bori');
        possibleOpcodes[i].push('setr');
        possibleOpcodes[i].push('seti');
        possibleOpcodes[i].push('gtir');
        possibleOpcodes[i].push('gtri');
        possibleOpcodes[i].push('gtrr');
        possibleOpcodes[i].push('eqir');
        possibleOpcodes[i].push('eqri');
        possibleOpcodes[i].push('eqrr');
    }

    for (let i = 0; i < before.length; i++) {
        getNumberOfPossilbleOpcodes(before[i], sampleInstrucctions[i], after[i]);
    }

    while (foundOpcodes < 16) {
        for (let i = 0; i < possibleOpcodes.length; i++) {
            if (possibleOpcodes[i].length == 1) {
                foundOpcodes++;
                opcodes[i] = possibleOpcodes[i][0];
                possibleOpcodes[i].splice(0, 1);
                for (let l = 0; l < possibleOpcodes.length; l++) {
                    if (i != l && possibleOpcodes[l].includes(opcodes[i])) {
                        possibleOpcodes[l].splice(possibleOpcodes[l].indexOf(opcodes[i]), 1);
                    }
                }
            }
        }
    }
}

function getNumberOfPossilbleOpcodes(before: number[], instrucctions: number[], after: number[]) {
    if (!compareArrays(addr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('addr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('addr'), 1);
    if (!compareArrays(addi(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('addi')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('addi'), 1);
    if (!compareArrays(mulr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('mulr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('mulr'), 1);
    if (!compareArrays(muli(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('muli')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('muli'), 1);
    if (!compareArrays(banr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('banr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('banr'), 1);
    if (!compareArrays(bani(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('bani')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('bani'), 1);
    if (!compareArrays(borr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('borr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('borr'), 1);
    if (!compareArrays(bori(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('bori')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('bori'), 1);
    if (!compareArrays(setr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('setr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('setr'), 1);
    if (!compareArrays(seti(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('seti')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('seti'), 1);
    if (!compareArrays(gtir(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('gtir')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('gtir'), 1);
    if (!compareArrays(gtri(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('gtri')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('gtri'), 1);
    if (!compareArrays(gtrr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('gtrr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('gtrr'), 1);
    if (!compareArrays(eqir(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('eqir')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('eqir'), 1);
    if (!compareArrays(eqri(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('eqri')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('eqri'), 1);
    if (!compareArrays(eqrr(before.slice(), instrucctions.slice()), after.slice()) && possibleOpcodes[instrucctions[0]].includes('eqrr')) possibleOpcodes[instrucctions[0]].splice(possibleOpcodes[instrucctions[0]].indexOf('eqrr'), 1);
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