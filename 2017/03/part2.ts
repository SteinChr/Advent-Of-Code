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

let sqaures = new Map<string, number>();
sqaures.set(getStringFromPos(pos), 1);

while (true) {
    pos.x += dir.x;
    pos.y += dir.y;

    let sum = 0;

    for (let y = pos.y - 1; y <= pos.y + 1; y++) {
        for (let x = pos.x - 1; x <= pos.x + 1; x++) {
            if (!(x == pos.x && y == pos.y)) {
                let stringPos = getStringFromPos({ x: x, y: y });
                if (sqaures.has(stringPos)) sum += sqaures.get(stringPos);
            }
        }
    }

    if (sum > input) {
        result = sum;
        break;
    }

    sqaures.set(getStringFromPos(pos), sum);

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

console.log(result);

function getStringFromPos(pos: Pos): string {
    return pos.x + '_' + pos.y;
}

console.timeEnd('Time');