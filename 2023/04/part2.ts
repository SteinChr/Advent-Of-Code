import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s\|\s/));
let result = 0;

class Scratchcard {
    cardId: number;
    winningNumbers: number[];
    yourNumbers: number[];
    numberOfMatches: number;
    totalNumberOfCards: number; // copies including the original one
}

let scratchcards: Scratchcard[] = [];

for (let i = 0; i < input.length; i++) {
    let id = parseInt(input[i][0].split(' ').filter(x => x != '')[1])
    let winningNumbers = input[i][1].split(' ').filter(x => x != '').map(y => parseInt(y));
    let yourNumbers = input[i][2].split(' ').filter(x => x != '').map(y => parseInt(y));

    scratchcards.push({ cardId: id, winningNumbers: winningNumbers, yourNumbers: yourNumbers, numberOfMatches: 0, totalNumberOfCards: 1 });
}

for (let i = 0; i < scratchcards.length; i++) {
    let matches = 0;

    for (let l = 0; l < scratchcards[i].winningNumbers.length; l++) {
        if (scratchcards[i].yourNumbers.includes(scratchcards[i].winningNumbers[l])) matches++;
    }
    
    scratchcards[i].numberOfMatches = matches;
}

for (let i = 0; i < scratchcards.length; i++) {
    for (let m = 1; m <= scratchcards[i].numberOfMatches; m++) {
        scratchcards[i + m].totalNumberOfCards += scratchcards[i].totalNumberOfCards;
    }
}

for (let i = 0; i < scratchcards.length; i++) {
    result += scratchcards[i].totalNumberOfCards;
}

console.log(result);
console.timeEnd('Time');