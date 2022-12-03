import { chownSync, readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

for (let i = 0; i < input.length; i++) {
    let compartmentOne: string[] = input[i].slice(0, input[i].length / 2).split('');
    let compartmentTwo: string[] = input[i].slice(input[i].length / 2).split('');
    for (let l = 0; l < compartmentOne.length; l++) {
        if (compartmentTwo.includes(compartmentOne[l])) {
            addScore(compartmentOne[l]);
            break;
        }
    }

}

console.log(result);

function addScore(letter: string) {
    if (letter == letter.toLowerCase()) {
        result += letter.charCodeAt(0) - 96;
    } else {
        result += letter.charCodeAt(0) - 64 + 26;
    }
}

console.timeEnd('Time');