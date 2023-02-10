import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let numbersForEachAmp = [numbers.slice(), numbers.slice(), numbers.slice(), numbers.slice(), numbers.slice()];
let counter = [0, 0, 0, 0, 0];
let inputCounter = [0, 0, 0, 0, 0];
let phases = [];
let possibleResults = [];
let result = 0;

createPhases();

let programHalted: boolean = false;
for (let i = 0; i < phases.length; i++) {
    numbersForEachAmp = [numbers.slice(), numbers.slice(), numbers.slice(), numbers.slice(), numbers.slice()];
    counter = [0, 0, 0, 0, 0];
    inputCounter = [0, 0, 0, 0, 0];
    programHalted = false;
    let outputOfLastAmp = 0;
    result = 0;
    for (let l = 0; !programHalted; l++) {
        if (l % 5 == 0) result = outputOfLastAmp;
        outputOfLastAmp = intcode(phases[i][l % 5], outputOfLastAmp, l % 5);
    }
    possibleResults.push(result);
}

result = Math.max(...possibleResults);
console.log(result);

function intcode(phaseSetting, inputSignal, amp) {
    let output = 0;

    while (true) {
        let opcode = numbersForEachAmp[amp][counter[amp]] % 100;
        let parameterMode1 = Math.floor(numbersForEachAmp[amp][counter[amp]] / 100) % 10;
        let parameterMode2 = Math.floor(numbersForEachAmp[amp][counter[amp]] / 1000) % 10;
        let parameter1 = 0;
        let parameter2 = 0;

        if (parameterMode1 == 0) {
            parameter1 = numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 1]];
        } else {
            parameter1 = numbersForEachAmp[amp][counter[amp] + 1];
        }

        if (parameterMode2 == 0) {
            parameter2 = numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 2]];
        } else {
            parameter2 = numbersForEachAmp[amp][counter[amp] + 2];
        }

        if (opcode == 1) {
            numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = parameter1 + parameter2;
            counter[amp] += 4;
        } else if (opcode == 2) {
            numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = parameter1 * parameter2;
            counter[amp] += 4;
        } else if (opcode == 3) {
            if (inputCounter[amp] == 0) {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 1]] = phaseSetting;
            } else {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 1]] = inputSignal;
            }
            counter[amp] += 2;
            inputCounter[amp]++;
        } else if (opcode == 4) {
            output = parameter1;
            counter[amp] += 2;
            break;
        } else if (opcode == 5) {
            if (parameter1 != 0) {
                counter[amp] = parameter2;
            } else {
                counter[amp] += 3;
            }
        } else if (opcode == 6) {
            if (parameter1 == 0) {
                counter[amp] = parameter2;
            } else {
                counter[amp] += 3;
            }
        } else if (opcode == 7) {
            if (parameter1 < parameter2) {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = 1;
            } else {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = 0;
            }
            counter[amp] += 4;
        } else if (opcode == 8) {
            if (parameter1 == parameter2) {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = 1;
            } else {
                numbersForEachAmp[amp][numbersForEachAmp[amp][counter[amp] + 3]] = 0;
            }
            counter[amp] += 4;
        } else if (opcode == 99) {
            programHalted = true;
            break;
        }
    }
    return output;
}

function createPhases() {
    for (let i = 56789; i <= 98765; i++) {
        let possible = true;
        let currentPhase = [...i + ''].map(c => parseInt(c));

        if (currentPhase.some(c => c == 0)
            || currentPhase.some(c => c == 1)
            || currentPhase.some(c => c == 2)
            || currentPhase.some(c => c == 3)
            || currentPhase.some(c => c == 4)) {
            possible = false;
        }

        for (let l = 0; l < currentPhase.length; l++) {
            if (currentPhase.filter(c => c == currentPhase[l]).length > 1) {
                possible = false;
            }
        }

        if (possible == true) {
            phases.push(currentPhase);
        }
    }
}

console.timeEnd('Time');