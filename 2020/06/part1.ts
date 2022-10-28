import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let answers = input.split('\r\n\r\n');
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let totalYes = 0;

for (let l = 0; l < answers.length; l++) {
    answers[l] = answers[l].replace(/(\r\n)/gm, "");
}

for (let i = 0; i < answers.length; i++) {
    for (let l = 0; l < alphabet.length; l++) {
        if (answers[i].includes(alphabet[l])) {
            totalYes++;
        }
    }
}

console.log(totalYes);
console.timeEnd('Time');