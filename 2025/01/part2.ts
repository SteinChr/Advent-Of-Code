import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let result = 0;

let rotations = input.split('\r\n');
let dial = 50;

for (let i = 0; i < rotations.length; i++) {
    let dir = rotations[i][0];
    let steps = parseInt(rotations[i].slice(1));

    for (let s = 0; s < steps; s++) {
        if (dir == 'R') dial++;
        if (dir == 'L') dial--;

        if (dial == 100) dial = 0;
        if (dial == -1) dial = 99;

        if (dial == 0) result++;
    }
}

console.log(result);
console.timeEnd('Time');