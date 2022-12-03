import { chownSync, readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

for (let i = 0; i < input.length; i += 3) {
    let rucksackOne: string[] = input[i].split('');
    let rucksackTwo: string[] = input[i + 1].split('');
    let rucksackThree: string[] = input[i + 2].split('');
    for (let l = 0; l < rucksackOne.length; l++) {
        if (rucksackTwo.includes(rucksackOne[l]) &&
            rucksackThree.includes(rucksackOne[l])) {
            addScore(rucksackOne[l]);
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