import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Coordinate {
    x: number;
    y: number;
}

let galaxies: Coordinate[] = [];

let rowSize: number[] = new Array(input.length);
let columnSize: number[] = new Array(input[0].length);

const expansion = 1000000;

for (let i = input.length - 1; i >= 0; i--) {
    if (input[i].filter(x => x == '#').length == 0) {
        rowSize[i] = expansion;
    } else {
        rowSize[i] = 1;
    }
}

for (let x = input[0].length - 1; x >= 0; x--) {
    let emptyCol: boolean = true;

    for (let y = 0; y < input.length && emptyCol; y++) {
        if (input[y][x] == '#') emptyCol = false;
    }

    if (emptyCol) {
        columnSize[x] = expansion;
    } else {
        columnSize[x] = 1;
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') {
            galaxies.push({ x: x, y: y });
        }
    }
}

for (let i = 0; i < galaxies.length; i++) {
    for (let l = i + 1; l < galaxies.length; l++) {
        result += manhattanDistance(galaxies[i].x, galaxies[i].y, galaxies[l].x, galaxies[l].y);
    }
}

console.log(result);

function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    let manhattanDistance = 0;

    for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
        manhattanDistance += columnSize[x];
    }

    for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
        manhattanDistance += rowSize[y];
    }

    return manhattanDistance;
}

console.timeEnd('Time');