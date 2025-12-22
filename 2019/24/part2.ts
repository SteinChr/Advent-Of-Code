import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    d: number;
    x: number;
    y: number;
}

const gridDepth = 300;

let grid: string[][][] = new Array(gridDepth);

for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(input.length);

    for (let l = 0; l < grid[i].length; l++) {
        grid[i][l] = new Array(input[0].length).fill('.');
    }
}

for (let y = 0; y < grid[Math.floor(gridDepth / 2)].length; y++) {
    for (let x = 0; x < grid[Math.floor(gridDepth / 2)][y].length; x++) {
        grid[Math.floor(gridDepth / 2)][y][x] = input[y][x];
    }
}

for (let m = 0; m < 200; m++) {
    let changeState: Pos[] = [];

    for (let d = 1; d < grid.length - 1; d++) {
        for (let y = 0; y < grid[d].length; y++) {
            for (let x = 0; x < grid[d][y].length; x++) {
                if (y != 2 || x != 2) {
                    let adjacent: number = 0;

                    if (y > 0 && (y - 1 != 2 || x != 2) && grid[d][y - 1][x] == '#') adjacent++;
                    if (x < grid[d][y].length - 1 && (y != 2 || x + 1 != 2) && grid[d][y][x + 1] == '#') adjacent++;
                    if (y < grid[d].length - 1 && (y + 1 != 2 || x != 2) && grid[d][y + 1][x] == '#') adjacent++;
                    if (x > 0 && (y != 2 || x - 1 != 2) && grid[d][y][x - 1] == '#') adjacent++;

                    if (x == 0 && grid[d - 1][2][1] == '#') adjacent++;
                    if (y == 0 && grid[d - 1][1][2] == '#') adjacent++;
                    if (x == grid[d][y].length - 1 && grid[d - 1][2][3] == '#') adjacent++;
                    if (y == grid[d].length - 1 && grid[d - 1][3][2] == '#') adjacent++;

                    if (x == 1 && y == 2) {
                        for (let y1 = 0; y1 < grid[d + 1].length; y1++) {
                            if (grid[d + 1][y1][0] == '#') adjacent++;
                        }
                    }

                    if (x == 2 && y == 1) {
                        for (let x1 = 0; x1 < grid[d + 1][0].length; x1++) {
                            if (grid[d + 1][0][x1] == '#') adjacent++;
                        }
                    }

                    if (x == 3 && y == 2) {
                        for (let y1 = 0; y1 < grid[d + 1].length; y1++) {
                            if (grid[d + 1][y1][grid[d + 1][y1].length - 1] == '#') adjacent++;
                        }
                    }

                    if (x == 2 && y == 3) {
                        for (let x1 = 0; x1 < grid[d + 1][grid[d + 1].length - 1].length; x1++) {
                            if (grid[d + 1][grid[d + 1].length - 1][x1] == '#') adjacent++;
                        }
                    }

                    if ((grid[d][y][x] == '.' && (adjacent == 1 || adjacent == 2)) || (grid[d][y][x] == '#' && adjacent != 1)) changeState.push({ d: d, x: x, y: y });
                }
            }
        }
    }

    for (let i = 0; i < changeState.length; i++) {
        if (grid[changeState[i].d][changeState[i].y][changeState[i].x] == '#') {
            grid[changeState[i].d][changeState[i].y][changeState[i].x] = '.';
        } else {
            grid[changeState[i].d][changeState[i].y][changeState[i].x] = '#';
        }
    }
}

for (let d = 0; d < grid.length; d++) {
    for (let y = 0; y < grid[d].length; y++) {
        for (let x = 0; x < grid[d][y].length; x++) {
            if (grid[d][y][x] == '#') result++;
        }
    }
}

console.log(result);
console.timeEnd('Time');