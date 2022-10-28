import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\r\n|\s->\s|,/).map(x => parseInt(x));
let result = 0;
let grid: any[] = [];
for (let i = 0; i < 1000; i++) {
    grid[i] = [];
    for (let l = 0; l < 1000; l++) {
        grid[i] += ['0'];
    }
}

for (let i = 0; i < input.length;) {
    let x1 = input[i];
    let y1 = input[i + 1];
    let x2 = input[i + 2];
    let y2 = input[i + 3];
    if (x1 == x2) {
        if (y1 < y2) {
            for (let y = y1; y <= y2; y++) {
                grid[y] = grid[y].substr(0, x1) + (parseInt(grid[y].substr(x1, 1)) + 1).toString() + grid[y].substr(x1 + 1);
            }
        } else {
            for (let y = y2; y <= y1; y++) {
                grid[y] = grid[y].substr(0, x1) + (parseInt(grid[y].substr(x1, 1)) + 1).toString() + grid[y].substr(x1 + 1);
            }
        }
        i += 4;
    } else if (y1 == y2) {
        if (x1 < x2) {
            for (let x = x1; x <= x2; x++) {
                grid[y1] = grid[y1].substr(0, x) + (parseInt(grid[y1].substr(x, 1)) + 1).toString() + grid[y1].substr(x + 1);
            }
        } else {
            for (let x = x2; x <= x1; x++) {
                grid[y1] = grid[y1].substr(0, x) + (parseInt(grid[y1].substr(x, 1)) + 1).toString() + grid[y1].substr(x + 1);
            }
        }
        i += 4;
    } else {
        input.splice(i, 4);
    }
}
for (let i = 0; i < grid.length; i++) {
    for (let l = 0; l < grid[0].length; l++) {
        if (parseInt(grid[i][l]) >= 2) result++;
    }
}
console.log(result);
console.timeEnd('Time');