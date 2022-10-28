import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s@\s|,|:\s|x|#/).filter(y => y != '').map(y => parseInt(y)));
let result = 0;
const gridSize = 1100;
let grid = new Array(gridSize);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize);
    for (let l = 0; l < grid[i].length; l++) {
        grid[i][l] = 0;
    }
}
for (let i = 0; i < input.length; i++) {
    const left = input[i][1];
    const top = input[i][2];
    const width = input[i][3];
    const height = input[i][4];

    for (let y = top; y < top + height; y++) {
        for (let x = left; x < left + width; x++) {
            grid[y][x]++;
        }
    }
}
for (let i = 0; i < input.length; i++) {
    const left = input[i][1];
    const top = input[i][2];
    const width = input[i][3];
    const height = input[i][4];
    let searchedClaim = true;

    for (let y = top; y < top + height; y++) {
        for (let x = left; x < left + width; x++) {
            if (grid[y][x] != 1) searchedClaim = false;
        }
    }
    if (searchedClaim) result = input[i][0];
}
console.log(result);
console.timeEnd('Time');