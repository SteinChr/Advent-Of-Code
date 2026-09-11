import { readFileSync } from 'fs';
console.time('Time');
let input = parseInt(readFileSync('./input.txt', 'utf-8'));
let result = 0;

class Pos {
    x: number;
    y: number;
}

let pos: Pos = { x: 0, y: 0 };
let dir: Pos = { x: 1, y: 0 };

let counter = 0;
let rep = 1;
let changeRepNextTime: boolean = false;

for (let i = 2; i <= input; i++) {
    pos.x += dir.x;
    pos.y += dir.y;

    counter++;

    if (rep == counter) {
        counter = 0;

        if (dir.x == 1 && dir.y == 0) {
            dir.x = 0;
            dir.y = -1;
        } else if (dir.x == 0 && dir.y == -1) {
            dir.x = -1;
            dir.y = 0;
        } else if (dir.x == -1 && dir.y == 0) {
            dir.x = 0;
            dir.y = 1;
        } else if (dir.x == 0 && dir.y == 1) {
            dir.x = 1;
            dir.y = 0;
        }

        if (changeRepNextTime) {
            changeRepNextTime = false;
            rep++;
        } else {
            changeRepNextTime = true;
        }
    }
}

result = Math.abs(pos.x) + Math.abs(pos.y);
console.log(result);
console.timeEnd('Time');