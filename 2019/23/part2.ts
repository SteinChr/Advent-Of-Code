import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

const numbersOfComputers = 50;

let copiedInput: number[][] = [];
for (let i = 0; i < numbersOfComputers; i++) {
    copiedInput.push(input.slice());
}

intcode(copiedInput);

console.log(result);

function intcode(numbers: number[][]) {
    let counter: number[] = new Array(numbersOfComputers).fill(0);
    let relativeBase: number[] = new Array(numbersOfComputers).fill(0);

    let output: number[][] = new Array(numbersOfComputers);
    let userInputs: number[][] = new Array(numbersOfComputers);

    for (let i = 0; i < userInputs.length; i++) {
        output[i] = [];
        userInputs[i] = [i];
    }

    let nat: number[] = [];
    let natCounter: number = 0;
    let natYValues: number[] = [];

    while (true) {
        if (userInputs.join('').length == 0 && output.join('').length == 0) {
            natCounter++;
        } else {
            natCounter = 0;
        }

        if (natCounter > 5000) {
            if (natYValues.includes(nat[1])) {
                result = nat[1];
                return;
            }

            userInputs[0].push(nat[0]);
            userInputs[0].push(nat[1]);

            natYValues.push(nat[1]);
            nat.splice(0, 2);
            natCounter = 0;
        }

        for (let c = 0; c < numbersOfComputers; c++) {
            let opcode = numbers[c][counter[c]] % 100;
            let parameterMode1 = Math.floor(numbers[c][counter[c]] / 100) % 10;
            let parameterMode2 = Math.floor(numbers[c][counter[c]] / 1000) % 10;
            let parameterMode3 = Math.floor(numbers[c][counter[c]] / 10000) % 10;

            let parameter1 = 0;
            let parameter2 = 0;

            if (parameterMode1 == 0) {
                parameter1 = numbers[c][numbers[c][counter[c] + 1]];
            } else if (parameterMode1 == 1) {
                parameter1 = numbers[c][counter[c] + 1];
            } else if (parameterMode1 == 2) {
                parameter1 = numbers[c][numbers[c][counter[c] + 1] + relativeBase[c]];
            }

            if (parameterMode2 == 0) {
                parameter2 = numbers[c][numbers[c][counter[c] + 2]];
            } else if (parameterMode2 == 1) {
                parameter2 = numbers[c][counter[c] + 2];
            } else if (parameterMode2 == 2) {
                parameter2 = numbers[c][numbers[c][counter[c] + 2] + relativeBase[c]];
            }

            if (parameter1 == null) parameter1 = 0;
            if (parameter2 == null) parameter2 = 0;
            if (numbers[c][numbers[c][counter[c] + 3]] == null) numbers[c][numbers[c][counter[c] + 3]] = 0;

            if (opcode == 1) {
                numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = parameter1 + parameter2;
                counter[c] += 4;
            } else if (opcode == 2) {
                numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = parameter1 * parameter2;
                counter[c] += 4;
            } else if (opcode == 3) {
                if (userInputs[c].length > 0) {
                    numbers[c][numbers[c][counter[c] + 1] + (parameterMode1 == 2 ? relativeBase[c] : 0)] = userInputs[c].shift();
                } else {
                    numbers[c][numbers[c][counter[c] + 1] + (parameterMode1 == 2 ? relativeBase[c] : 0)] = -1;
                }
                counter[c] += 2;
            } else if (opcode == 4) {
                output[c].push(parameter1);
                counter[c] += 2;

                if (output[c].length == 3) {
                    if (output[c][0] == 255) {
                        nat.splice(0, 2);

                        nat.push(output[c][1]);
                        nat.push(output[c][2]);
                    } else {
                        userInputs[output[c][0]].push(output[c][1]);
                        userInputs[output[c][0]].push(output[c][2]);
                    }

                    output[c].splice(0, 3);
                }
            } else if (opcode == 5) {
                if (parameter1 != 0) {
                    counter[c] = parameter2;
                } else {
                    counter[c] += 3;
                }
            } else if (opcode == 6) {
                if (parameter1 == 0) {
                    counter[c] = parameter2;
                } else {
                    counter[c] += 3;
                }
            } else if (opcode == 7) {
                if (parameter1 < parameter2) {
                    numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = 1;
                } else {
                    numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = 0;
                }
                counter[c] += 4;
            } else if (opcode == 8) {
                if (parameter1 == parameter2) {
                    numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = 1;
                } else {
                    numbers[c][numbers[c][counter[c] + 3] + (parameterMode3 == 2 ? relativeBase[c] : 0)] = 0;
                }
                counter[c] += 4;
            } else if (opcode == 9) {
                relativeBase[c] += parameter1;
                counter[c] += 2;
            } else if (opcode == 99) {
                return;
            }
        }
    }
}

console.timeEnd('Time');