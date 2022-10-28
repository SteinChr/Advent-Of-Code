import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/pos=<|>,\sr=|,/).slice(1));
let result = 0;

class Nanobot {
    x: number;
    y: number;
    z: number;
    r: number;
    manhattanDistanceToOrigin: number;
}

class PriorityQueue {
    value: number;
    type: number;
}

let bots: Nanobot[] = new Array(input.length);
for (let i = 0; i < input.length; i++) {
    bots[i] = { x: parseInt(input[i][0]), y: parseInt(input[i][1]), z: parseInt(input[i][2]), r: parseInt(input[i][3]), manhattanDistanceToOrigin: 0 };
}

for (let i = 0; i < bots.length; i++) {
    bots[i].manhattanDistanceToOrigin = manhattanDistance(bots[i].x, bots[i].y, bots[i].z, 0, 0, 0);
}

let queue: PriorityQueue[] = [];
for (let i = 0; i < bots.length; i++) {
    queue.push({ value: bots[i].manhattanDistanceToOrigin - bots[i].r, type: 1 });
    queue.push({ value: bots[i].manhattanDistanceToOrigin + bots[i].r, type: -1});
}

queue.sort((a, b) => a.value - b.value);

let count = 0;
let maxCount = 0;
for (let i = 0; i < queue.length; i++) {
    count += queue[i].type;
    if (count > maxCount) {
        maxCount = count;
        result = queue[i].value;
    }
}

console.log(result);

function manhattanDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);
}

console.timeEnd('Time');