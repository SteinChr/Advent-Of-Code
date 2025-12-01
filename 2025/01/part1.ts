import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let result = 0;

let rotations = input.split('\r\n');
let dial = 50;

for (let i = 0; i < rotations.length; i++) {
    let dir = rotations[i][0];
    let steps = parseInt(rotations[i].slice(1));

    if (dir == 'R') {
        dial += steps;
    } else {
        dial -= steps;
    }

    while (dial < 0) {
        dial += 100;
    }

    while (dial > 99) {
        dial -= 100;
    }

    if (dial == 0) result++;
}

console.log(result);
console.timeEnd('Time');