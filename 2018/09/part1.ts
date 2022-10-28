import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ');
let numberOfPlayers = parseInt(input[0]);
let numberOfMarbles = parseInt(input[6]);
let scores = new Array(numberOfPlayers).fill(0);
let circle = [0];
let currentPlayer = 0;
let currentMarble = 0;
let result = 0;

for (let i = 1; i <= numberOfMarbles; i++) {
    if (i % 23 != 0) {
        let index = currentMarble + 2;
        
        while (index > circle.length) {
            index -= circle.length;
        }

        circle.splice(index, 0, i);
        currentMarble = index;
    } else {
        let index = currentMarble - 7;
        if (index < 0) index += circle.length;

        scores[currentPlayer] += i;
        scores[currentPlayer] += circle[index];

        circle.splice(currentMarble - 7, 1);

        currentMarble = currentMarble - 7;
        if (currentMarble < 0) currentMarble += circle.length + 1;
    }
    currentPlayer++;
    if (currentPlayer >= numberOfPlayers) currentPlayer = 0;
}

result = Math.max(...scores);
console.log(result);
console.timeEnd('Time');