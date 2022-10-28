import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(', ').map(y => parseInt(y)));
const gridSize = 500;
const maxSize = 10000;
let result = 0;
let grid = new Array(gridSize);
for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize);
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = -1;
    }
}
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let totalManhattanDistances = 0;
        for (let i = 0; i < input.length; i++) {
            totalManhattanDistances += calculateManhattanDistance(x, y, input[i][0], input[i][1]);
        }
        if (totalManhattanDistances < maxSize) result++;
    }
}
console.log(result);

function calculateManhattanDistance(x1, y1, x2, y2): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

console.timeEnd('Time');