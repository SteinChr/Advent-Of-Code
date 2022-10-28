import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\s|\r\n/);
let positionPlayer1 = parseInt(input[4]);
let positionPlayer2 = parseInt(input[10]);
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let currentDicePosition = 1;
let timesRolled = 0;
let result = 0;
while (scorePlayer1 < 1000 && scorePlayer2 < 1000) {
    for (let i = 0; i < 3; i++) {
        timesRolled++;
        positionPlayer1 += currentDicePosition;
        currentDicePosition++;
        if (currentDicePosition == 101) currentDicePosition = 1;
    }
    while (positionPlayer1 > 10) {
        positionPlayer1 -= 10;
    }
    scorePlayer1 += positionPlayer1;
    if (scorePlayer1 >= 1000) break;

    for (let i = 0; i < 3; i++) {
        timesRolled++;
        positionPlayer2 += currentDicePosition;
        currentDicePosition++;
        if (currentDicePosition == 101) currentDicePosition = 1;
    }
    while (positionPlayer2 > 10) {
        positionPlayer2 -= 10;
    }
    scorePlayer2 += positionPlayer2;
}
if (scorePlayer1 >= 1000) {
    result = scorePlayer2 * timesRolled;
} else {
    result = scorePlayer1 * timesRolled;
}
console.log(result);
console.timeEnd('Time');