import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let playersString = input.split('\r\n\r\n').map(p => p.split(':\r\n')[1].split('\r\n'));
let players = playersString.map(p => p.map(p => parseInt(p)));
let winner = -1;
let result = 0;

while (players[0].length != 0 && players[1].length != 0) {
    if (players[0][0] > players[1][0]) {
        players[0].push(players[0][0]);
        players[0].push(players[1][0]);
        players[0].shift();
        players[1].shift();
    } else if (players[1][0] > players[0][0]) {
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

for (let i = 0; i < players[winner].length; i++) {
    result += players[winner][i] * (players[winner].length - i);
}

console.log(result);
console.timeEnd('Time');