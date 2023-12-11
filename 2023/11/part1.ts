import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Coordinate {
    x: number;
    y: number;
}

let galaxies: Coordinate[] = [];

for (let i = input.length - 1; i >= 0; i--) {
    if (input[i].filter(x => x == '#').length == 0) {
        input.splice(i, 0, new Array(input[0].length).fill('.'));
    }
}

for (let x = input[0].length - 1; x >= 0; x--) {
    let emptyCol: boolean = true;

    for (let y = 0; y < input.length && emptyCol; y++) {
        if (input[y][x] == '#') emptyCol = false;
    }

    if (emptyCol) {
        for (let y = 0; y < input.length; y++) {
            input[y].splice(x, 0, '.');
        }
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
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

console.timeEnd('Time');