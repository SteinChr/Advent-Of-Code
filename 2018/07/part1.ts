import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let instructions: string[][] = new Array(input.length);
for (let i = 0; i < input.length; i++) {
    instructions[i] = [input[i].split(' ')[1], input[i].split(' ')[7]];
}
const numberOfLetters = 26;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].slice(0, numberOfLetters);
let result: string = '';

while (instructions.length != 0) {
    let nextLetter = getNextInstrucction();
    let newInstructions = instructions.slice();
    for (let i = instructions.length - 1; i >= 0; i--) {
        if (instructions[i][0] == nextLetter) {
            newInstructions.splice(i, 1);
        }
    }
    instructions = newInstructions.slice();
    result += nextLetter;
}

if (result.length < letters.length) {
    for (let l = 0; l < letters.length; l++) {
        if (!result.split('').includes(letters[l])) {
            result += letters[l];
        }
    }
}
console.log(result);

function getNextInstrucction(): string {
    for (let l = 0; l < letters.length; l++) {
        let possible = false;
        if (!result.split('').includes(letters[l])) {
            possible = true;
            for (let i = 0; i < instructions.length; i++) {
                if (instructions[i][1] == letters[l]) {
                    possible = false;
                    break;
                }
            }
        }
        if (possible) return letters[l];
    }
}

console.timeEnd('Time');