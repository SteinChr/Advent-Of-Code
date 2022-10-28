import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let answers = input.split('\r\n\r\n');
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let containsLetter = 0;
let totalYes = 0;
let currentAnswer = [];

for (let i = 0; i < answers.length; i++) {
    currentAnswer = answers[i].split('\r\n');
    for (let l = 0; l < alphabet.length; l++) {
        containsLetter = 0;
        for (let g = 0; g < currentAnswer.length; g++) {
            if (currentAnswer[g].includes(alphabet[l])) {
                containsLetter++;
            }

        }
        if (containsLetter >= currentAnswer.length) totalYes++;
    }
}

console.log(totalYes);
console.timeEnd('Time');