// Unfortunately, this code does not solve the test input

import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

let shapes = new Map<number, string[][]>();

for (let i = 0; i < input.length - 1; i++) {
    shapes.set(parseInt(input[i][0]), input[i].slice(1).map(x => x.split('')));
}

let areaOfShapes: number[] = [];

for (let i = 0; i < shapes.size; i++) {
    let currentGrid = shapes.get(i);

    let area = 0;

    for (let y = 0; y < currentGrid.length; y++) {
        for (let x = 0; x < currentGrid[y].length; x++) {
            if (currentGrid[y][x] == '#') area++;
        }
    }
    
    areaOfShapes.push(area);
}

let regions: { length: number, width: number, quantities: number[] }[] = [];

for (let i = 0; i < input[input.length - 1].length; i++) {
    let current = input[input.length - 1][i].split(/x|:\s|\s/).map(x => parseInt(x));
    regions.push({ length: current[0], width: current[1], quantities: current.slice(2) });
}

for (let r = 0; r < regions.length; r++) {
    let areaNeeded = 0;

    for (let q = 0; q < regions[r].quantities.length; q++) {
        areaNeeded += regions[r].quantities[q] * areaOfShapes[q];
    }

    if (areaNeeded <= regions[r].length * regions[r].width) result++;
}

console.log(result);
console.timeEnd('Time');