import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

class Position {
    x: number;
    y: number;
}

let knots: Position[] = [];
for (let i = 0; i < 10; i++) {
    knots.push({ x: 0, y: 0 });
}
let allTail9Pos = new Set<string>();
allTail9Pos.add(knots[9].x + ',' + knots[9].y);

for (let i = 0; i < input.length; i++) {
    let direction: string = input[i][0];
    let steps: number = parseInt(input[i][1]);
    for (let s = 0; s < steps; s++) {
        if (direction == 'R') {
            knots[0].x++;
        } else if (direction == 'U') {
            knots[0].y--;
        } else if (direction == 'L') {
            knots[0].x--;
        } else if (direction == 'D') {
            knots[0].y++;
        }
        moveTails();
    }
}

result = allTail9Pos.size;
console.log(result);

function moveTails() {
    for (let i = 0; i < 9; i++) {
        if (knots[i].y == knots[i + 1].y) {
            if (knots[i].x == knots[i + 1].x + 2) {
                knots[i + 1].x++;
            } else if (knots[i].x == knots[i + 1].x - 2) {
                knots[i + 1].x--;
            }
        } else if (knots[i].x == knots[i + 1].x) {
            if (knots[i].y == knots[i + 1].y + 2) {
                knots[i + 1].y++;
            } else if (knots[i].y == knots[i + 1].y - 2) {
                knots[i + 1].y--;
            }
        } else {
            if ((knots[i].x == knots[i + 1].x + 2 && knots[i].y == knots[i + 1].y - 1) || (knots[i].x == knots[i + 1].x + 1 && knots[i].y == knots[i + 1].y - 2) || (knots[i].x == knots[i + 1].x + 2 && knots[i].y == knots[i + 1].y - 2)) {
                knots[i + 1].x++;
                knots[i + 1].y--;
            } else if ((knots[i].x == knots[i + 1].x + 2 && knots[i].y == knots[i + 1].y + 1) || (knots[i].x == knots[i + 1].x + 1 && knots[i].y == knots[i + 1].y + 2) || (knots[i].x == knots[i + 1].x + 2 && knots[i].y == knots[i + 1].y + 2)) {
                knots[i + 1].x++;
                knots[i + 1].y++;
            } else if ((knots[i].x == knots[i + 1].x - 2 && knots[i].y == knots[i + 1].y - 1) || (knots[i].x == knots[i + 1].x - 1 && knots[i].y == knots[i + 1].y - 2) || (knots[i].x == knots[i + 1].x - 2 && knots[i].y == knots[i + 1].y - 2)) {
                knots[i + 1].x--;
                knots[i + 1].y--;
            } else if ((knots[i].x == knots[i + 1].x - 2 && knots[i].y == knots[i + 1].y + 1) || (knots[i].x == knots[i + 1].x - 1 && knots[i].y == knots[i + 1].y + 2) || (knots[i].x == knots[i + 1].x - 2 && knots[i].y == knots[i + 1].y + 2)) {
                knots[i + 1].x--;
                knots[i + 1].y++;
            }
        }
    }
    allTail9Pos.add(knots[9].x + ',' + knots[9].y);
}

console.timeEnd('Time');