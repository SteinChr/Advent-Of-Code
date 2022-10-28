import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let woodedAcres = 0;
let lumberyards = 0;
let result = 0;

for (let i = 0; i < 10; i++) {
    let startGrid = new Array(input.length);
    for (let l = 0; l < startGrid.length; l++) {
        startGrid[l] = input[l].slice();
    }

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (startGrid[y][x] == '.') {
                if (countAdjacent(x, y, '|', startGrid) >= 3) input[y][x] = '|';
            } else if (startGrid[y][x] == '|') {
                if (countAdjacent(x, y, '#', startGrid) >= 3) input[y][x] = '#';
            } else if (startGrid[y][x] == '#') {
                if (!(countAdjacent(x, y, '#', startGrid) >= 1 && countAdjacent(x, y, '|', startGrid) >= 1)) input[y][x] = '.';
            }
        }
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '|') woodedAcres++;
        if (input[y][x] == '#') lumberyards++;
    }
}

result = woodedAcres * lumberyards;
console.log(result);

function countAdjacent(x: number, y: number, target: string, grid: string[][]): number {
    let matching: number = 0;

    if (y > 0) {
        if (grid[y - 1][x] == target) matching++;
        if (x > 0 && grid[y - 1][x - 1] == target) matching++;
        if (x < grid[y].length - 1 && grid[y - 1][x + 1] == target) matching++;
    }

    if (x > 0 && grid[y][x - 1] == target) matching++;
    if (x < grid[y].length && grid[y][x + 1] == target) matching++;

    if (y < grid.length - 1) {
        if (grid[y + 1][x] == target) matching++;
        if (x > 0 && grid[y + 1][x - 1] == target) matching++;
        if (x < grid[y].length - 1 && grid[y + 1][x + 1] == target) matching++;
    }

    return matching;
}

console.timeEnd('Time');