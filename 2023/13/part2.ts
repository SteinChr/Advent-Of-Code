import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').map(y => y.split('')));
let result = 0;

class MirrorLine {
    type: string;
    coordinate: number;
}

for (let p = 0; p < input.length; p++) {
    let oldMirrorLine = findMirror(input[p], { type: '', coordinate: -1 });

    smudgeLoop: for (let y = 0; y < input[p].length; y++) {
        for (let x = 0; x < input[p][y].length; x++) {
            if (input[p][y][x] == '.') {
                input[p][y][x] = '#';
            } else if (input[p][y][x] == '#') {
                input[p][y][x] = '.';
            }

            let newMirrorLine = findMirror(input[p], oldMirrorLine);

            if (newMirrorLine.type != '') {
                if (newMirrorLine.type == 'v') {
                    result += newMirrorLine.coordinate
                } else if (newMirrorLine.type == 'h') {
                    result += newMirrorLine.coordinate * 100;
                }
                break smudgeLoop;
            }

            if (input[p][y][x] == '.') {
                input[p][y][x] = '#';
            } else if (input[p][y][x] == '#') {
                input[p][y][x] = '.';
            }
        }
    }
}

console.log(result);

function findMirror(grid: string[][], oldMirrorLine: MirrorLine): MirrorLine {
    let mirrorFound: boolean = false;
    let mirrorLine: MirrorLine = { type: '', coordinate: -1 };

    for (let y = 0; y < grid.length - 1 && !mirrorFound; y++) {
        let horizontalMirror: boolean = true;

        distanceLoop: for (let d = 0; true; d++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (y - d < 0 || y + d + 1 >= grid.length) break distanceLoop;
                if (grid[y - d][x] != grid[y + d + 1][x]) {
                    horizontalMirror = false;
                    break distanceLoop;
                }
            }
        }

        if (horizontalMirror && (oldMirrorLine.type != 'h' || oldMirrorLine.coordinate != y + 1)) {
            mirrorFound = true;
            mirrorLine.type = 'h';
            mirrorLine.coordinate = y + 1;
        }
    }

    for (let x = 0; x < grid[0].length - 1 && !mirrorFound; x++) {
        let verticalMirror: boolean = true;

        distanceLoop: for (let d = 0; true; d++) {
            for (let y = 0; y < grid.length; y++) {
                if (x - d < 0 || x + d + 1 >= grid[0].length) break distanceLoop;
                if (grid[y][x - d] != grid[y][x + d + 1]) {
                    verticalMirror = false;
                    break distanceLoop;
                }
            }
        }
        
        if (verticalMirror && (oldMirrorLine.type != 'v' || oldMirrorLine.coordinate != x + 1)) {
            mirrorFound = true;
            mirrorLine.type = 'v';
            mirrorLine.coordinate = x + 1;
        }
    }

    return mirrorLine;
}

console.timeEnd('Time');