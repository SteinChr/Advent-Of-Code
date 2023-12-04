import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s\|\s/));
let result = 0;

class Scratchcard {
    cardId: number;
    winningNumbers: number[];
    yourNumbers: number[];
}

let scratchcards: Scratchcard[] = [];

for (let i = 0; i < input.length; i++) {
    let id = parseInt(input[i][0].split(' ').filter(x => x != '')[1])
    let winningNumbers = input[i][1].split(' ').filter(x => x != '').map(y => parseInt(y));
    let yourNumbers = input[i][2].split(' ').filter(x => x != '').map(y => parseInt(y));

    scratchcards.push({ cardId: id, winningNumbers: winningNumbers, yourNumbers: yourNumbers });
}

for (let i = 0; i < scratchcards.length; i++) {
    let currentPoints = 0;

    for (let l = 0; l < scratchcards[i].winningNumbers.length; l++) {
        if (scratchcards[i].yourNumbers.includes(scratchcards[i].winningNumbers[l])) currentPoints = currentPoints == 0 ? 1 : currentPoints * 2;
    }

    result += currentPoints;
}

console.log(result);
console.timeEnd('Time');