import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

class Position {
    x: number;
    y: number;
}

let head: Position = { x: 0, y: 0 };
let tail: Position = { x: 0, y: 0 };
let allTailPos = new Set<string>();
allTailPos.add(tail.x + ',' + tail.y);

for (let i = 0; i < input.length; i++) {
    let direction: string = input[i][0];
    let steps: number = parseInt(input[i][1]);
    for (let s = 0; s < steps; s++) {
        if (direction == 'R') {
            head.x++;
        } else if (direction == 'U') {
            head.y--;
        } else if (direction == 'L') {
            head.x--;
        } else if (direction == 'D') {
            head.y++;
        }
        moveTail();
    }
}

result = allTailPos.size;
console.log(result);

function moveTail() {
    if (head.y == tail.y) {
        if (head.x == tail.x + 2) {
            tail.x++;
        } else if (head.x == tail.x - 2) {
            tail.x--;
        }
    } else if (head.x == tail.x) {
        if (head.y == tail.y + 2) {
            tail.y++;
        } else if (head.y == tail.y - 2) {
            tail.y--;
        }
    } else {
        if ((head.x == tail.x + 2 && head.y == tail.y - 1) || (head.x == tail.x + 1 && head.y == tail.y - 2)) {
            tail.x++;
            tail.y--;
        } else if ((head.x == tail.x + 2 && head.y == tail.y + 1) || (head.x == tail.x + 1 && head.y == tail.y + 2)) {
            tail.x++;
            tail.y++;
        } else if ((head.x == tail.x - 2 && head.y == tail.y - 1) || (head.x == tail.x - 1 && head.y == tail.y - 2)) {
            tail.x--;
            tail.y--;
        } else if ((head.x == tail.x - 2 && head.y == tail.y + 1) || (head.x == tail.x - 1 && head.y == tail.y + 2)) {
            tail.x--;
            tail.y++;
        }
    }
    allTailPos.add(tail.x + ',' + tail.y);
}

console.timeEnd('Time');