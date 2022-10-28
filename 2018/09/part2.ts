import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ');
let numberOfPlayers = parseInt(input[0]);
let numberOfMarbles = parseInt(input[6]) * 100;
let scores = new Array(numberOfPlayers).fill(0);
let currentPlayer = 0;
let result = 0;

interface Marble {
    previous: Marble | null;
    next: Marble | null;
    value: number;
}

let currentMarble: Marble = { previous: null, next: null, value: 0 };

for (let i = 1; i <= numberOfMarbles; i++) {
    if (i % 23 != 0) {
        if (currentMarble.next) {
            let newMarble: Marble = { previous: currentMarble.next, next: currentMarble.next.next, value: i };
            currentMarble.next.next.previous = newMarble;
            currentMarble.next.next = newMarble;
            currentMarble = newMarble;
        } else {
            let newMarble: Marble = { previous: currentMarble, next: currentMarble, value: i };
            currentMarble.previous = newMarble;
            currentMarble.next = newMarble;
            currentMarble = newMarble;
        }
    } else {
        for (let j = 0; j < 6; j++) {
            currentMarble = currentMarble.previous;
        }
        scores[currentPlayer] += i;
        scores[currentPlayer] += currentMarble.previous.value;

        currentMarble.previous.previous.next = currentMarble;
        currentMarble.previous = currentMarble.previous.previous;
    }
    currentPlayer++;
    if (currentPlayer >= numberOfPlayers) currentPlayer = 0;
}

result = Math.max(...scores);
console.log(result);
console.timeEnd('Time');