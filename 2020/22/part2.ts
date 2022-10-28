import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let playersString = input.split('\r\n\r\n').map(p => p.split(':\r\n')[1].split('\r\n'));
let players = playersString.map(p => p.map(p => parseInt(p)));
let winner = -1;
let result = 0;

winner = game(players, 1);

for (let i = 0; i < players[winner].length; i++) {
    result += players[winner][i] * (players[winner].length - i);
}

console.log(result);

function game(players: number[][], level: number) {
    let playedCards: string[][] = new Array(2).fill([]);
    let winner = -1;
    while (players[0].length != 0 && players[1].length != 0) {
        if (playedCards[0].includes(players[0].join(',')) || playedCards[1].includes(players[1].join(','))) {
            return 0;
        }
        playedCards[0].push(players[0].join(','));
        playedCards[1].push(players[1].join(','));
        if (players[0][0] < players[0].length && players[1][0] < players[1].length) {
            winner = game([players[0].slice(1, players[0][0] + 1), players[1].slice(1, players[1][0] + 1)], level + 1);
        } else {
            if (players[0][0] > players[1][0]) winner = 0;
            else if (players[1][0] > players[0][0]) winner = 1;
        }
        if (winner == 0) {
            players[0].push(players[0][0]);
            players[0].push(players[1][0]);
            players[0].shift();
            players[1].shift();
        } else if (winner == 1) {
            players[1].push(players[1][0]);
            players[1].push(players[0][0]);
            players[0].shift();
            players[1].shift();
        }
    }

    if (players[0].length == 0) {
        winner = 1;
    } else if (players[1].length == 0) {
        winner = 0;
    }

    return winner;
}

console.timeEnd('Time');