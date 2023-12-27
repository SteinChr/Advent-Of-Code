import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,|~/).map(y => parseInt(y)));
let result = 0;

class Brick {
    x1: number;
    y1: number;
    z1: number;
    x2: number;
    y2: number;
    z2: number;
    fallen: boolean;
}

let bricks: Brick[] = [];
for (let i = 0; i < input.length; i++) {
    bricks.push({ x1: input[i][0], y1: input[i][1], z1: input[i][2], x2: input[i][3], y2: input[i][4], z2: input[i][5], fallen: false });
}

const gridSize = [10, 500];

let grid: string[][][] = new Array(gridSize[1]);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize[0]);
    for (let l = 0; l < grid[i].length; l++) {
        grid[i][l] = new Array(gridSize[0]);
        for (let j = 0; j < grid[i][l].length; j++) {
            grid[i][l][j] = '.';
        }
    }
}

for (let i = 0; i < bricks.length; i++) {
    setBrickInGrid(bricks[i], '#');
}

while (true) {
    if (!brickFall()) break;
}

let originalGrid: string[][][] = new Array(grid.length);
for (let i = 0; i < originalGrid.length; i++) {
    originalGrid[i] = new Array(grid[i].length);
    for (let l = 0; l < originalGrid[i].length; l++) {
        originalGrid[i][l] = grid[i][l].slice();
    }
}

let originalBricks: Brick[] = new Array(bricks.length);
for (let i = 0; i < bricks.length; i++) {
    bricks[i].fallen = false;
    originalBricks[i] = { x1: bricks[i].x1, y1: bricks[i].y1, z1: bricks[i].z1, x2: bricks[i].x2, y2: bricks[i].y2, z2: bricks[i].z2, fallen: false };
}

for (let i = 0; i < bricks.length; i++) {
    result += testBrick(bricks[i]);

    for (let z = 0; z < originalGrid.length; z++) {
        for (let y = 0; y < originalGrid[z].length; y++) {
            grid[z][y] = originalGrid[z][y].slice();
        }
    }

    for (let l = 0; l < originalBricks.length; l++) {
        bricks[l] = { x1: originalBricks[l].x1, y1: originalBricks[l].y1, z1: originalBricks[l].z1, x2: originalBricks[l].x2, y2: originalBricks[l].y2, z2: originalBricks[l].z2, fallen: false };
    }
}

console.log(result);

function testBrick(brick: Brick): number {
    setBrickInGrid(brick, '.');

    brick.z1 = -1;
    brick.z2 = -1;

    while (true) {
        if (!brickFall()) break;
    }

    return bricks.filter(x => x.fallen).length;
}

function brickFall(): boolean {
    let changesMade: boolean = false;
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].z1 > 1 && bricks[i].z2 > 1) {
            if (bricks[i].x1 != bricks[i].x2) {
                let fallPossible: boolean = true;
                for (let x = Math.min(bricks[i].x1, bricks[i].x2); x <= Math.max(bricks[i].x1, bricks[i].x2); x++) {
                    if (grid[bricks[i].z1 - 1][bricks[i].y1][x] == '#') {
                        fallPossible = false;
                        break;
                    }
                }
                if (fallPossible) {
                    bricks[i].fallen = true;
                    changesMade = true;

                    setBrickInGrid(bricks[i], '.');
                    bricks[i].z1--;
                    bricks[i].z2--;
                    setBrickInGrid(bricks[i], '#');
                }
            } else if (bricks[i].y1 != bricks[i].y2) {
                let fallPossible: boolean = true;
                for (let y = Math.min(bricks[i].y1, bricks[i].y2); y <= Math.max(bricks[i].y1, bricks[i].y2); y++) {
                    if (grid[bricks[i].z1 - 1][y][bricks[i].x1] == '#') {
                        fallPossible = false;
                        break;
                    }
                }
                if (fallPossible) {
                    bricks[i].fallen = true;
                    changesMade = true;

                    setBrickInGrid(bricks[i], '.');
                    bricks[i].z1--;
                    bricks[i].z2--;
                    setBrickInGrid(bricks[i], '#');
                }
            } else if (bricks[i].z1 < bricks[i].z2) {
                if (grid[bricks[i].z1 - 1][bricks[i].y1][bricks[i].x1] == '.') {
                    bricks[i].fallen = true;
                    changesMade = true;

                    grid[bricks[i].z1 - 1][bricks[i].y1][bricks[i].x1] = '#';
                    grid[bricks[i].z2][bricks[i].y1][bricks[i].x1] = '.';
                    bricks[i].z1--;
                    bricks[i].z2--;
                }
            } else {
                if (grid[bricks[i].z2 - 1][bricks[i].y1][bricks[i].x1] == '.') {
                    bricks[i].fallen = true;
                    changesMade = true;

                    grid[bricks[i].z2 - 1][bricks[i].y1][bricks[i].x1] = '#';
                    grid[bricks[i].z1][bricks[i].y1][bricks[i].x1] = '.';
                    bricks[i].z1--;
                    bricks[i].z2--;
                }
            }
        }
    }
    return changesMade;
}

function setBrickInGrid(brick: Brick, symbol: string) {
    if (brick.x1 != brick.x2) {
        for (let x = Math.min(brick.x1, brick.x2); x <= Math.max(brick.x1, brick.x2); x++) {
            grid[brick.z1][brick.y1][x] = symbol;
        }
    } else if (brick.y1 != brick.y2) {
        for (let y = Math.min(brick.y1, brick.y2); y <= Math.max(brick.y1, brick.y2); y++) {
            grid[brick.z1][y][brick.x1] = symbol;
        }
    } else if (brick.z1 != brick.z2) {
        for (let z = Math.min(brick.z1, brick.z2); z <= Math.max(brick.z1, brick.z2); z++) {
            grid[z][brick.y1][brick.x1] = symbol;
        }
    } else {
        grid[brick.z1][brick.y1][brick.x1] = symbol;
    }
}

console.timeEnd('Time');