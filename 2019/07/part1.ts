import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let phases = [];
let possibleResults = [];
let result = 0;

createPhases();

for (let i = 0; i < phases.length; i++) {
    result = 0;
    for (let l = 0; l < 5; l++) {
        result = intcode(phases[i][l], result);
    }
    possibleResults.push(result);
}

result = Math.max(...possibleResults);
console.log(result);

function intcode(phaseSetting, inputSignal) {
    let counter = 0;
    let output = 0;
    let inputCounter = 0;

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
            if (inputCounter == 0) {
                numbers[numbers[counter + 1]] = phaseSetting;
            } else if (inputCounter == 1) {
                numbers[numbers[counter + 1]] = inputSignal;
            }
            counter += 2;
            inputCounter++;
        } else if (opcode == 4) {
            output = parameter1;
            break;
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
            break;
        }
    }
    return output;
}

function createPhases() {
    for (let i = 1234; i <= 43210; i++) {
        let possible = true;
        let currentPhase = [...i + ''].map(c => parseInt(c));

        if (currentPhase.some(c => c == 5)
            || currentPhase.some(c => c == 6)
            || currentPhase.some(c => c == 7)
            || currentPhase.some(c => c == 8)
            || currentPhase.some(c => c == 9)) {
            possible = false;
        }

        for (let l = 0; l < currentPhase.length; l++) {
            if (currentPhase.filter(c => c == currentPhase[l]).length > 1) {
                possible = false;
            }
        }

        if (currentPhase.length == 4) {
            if (currentPhase.includes(0)) {
                possible = false;
            } else {
                currentPhase.splice(0, 0, 0);
            }
        }

        if (possible == true) {
            phases.push(currentPhase);
        }
    }
}

console.timeEnd('Time');