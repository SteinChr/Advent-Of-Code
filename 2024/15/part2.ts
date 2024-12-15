import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

class Pos {
    x: number;
    y: number;
}

let grid: string[][] = input[0].split('\r\n').map(x => x.split(''));
let instructions: string[] = input[1].split(/\r\n|/);

let extendedGrid: string[][] = new Array(grid.length);
for (let i = 0; i < extendedGrid.length; i++) {
    extendedGrid[i] = new Array(grid[0].length * 2);
}

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == '#') {
            extendedGrid[y][x * 2] = '#';
            extendedGrid[y][x * 2 + 1] = '#';
        } else if (grid[y][x] == 'O') {
            extendedGrid[y][x * 2] = '[';
            extendedGrid[y][x * 2 + 1] = ']';
        } else if (grid[y][x] == '.') {
            extendedGrid[y][x * 2] = '.';
            extendedGrid[y][x * 2 + 1] = '.';
        } else if (grid[y][x] == '@') {
            extendedGrid[y][x * 2] = '@';
            extendedGrid[y][x * 2 + 1] = '.';
        }
    }
}

let robotPos: Pos = { x: -1, y: -1 };
let directions = new Map<string, Pos>();

directions.set('^', { x: 0, y: -1 });
directions.set('>', { x: 1, y: 0 });
directions.set('v', { x: 0, y: 1 });
directions.set('<', { x: -1, y: 0 });

for (let y = 0; y < extendedGrid.length; y++) {
    for (let x = 0; x < extendedGrid[y].length; x++) {
        if (extendedGrid[y][x] == '@') robotPos = { x: x, y: y };
    }
}

for (let i = 0; i < instructions.length; i++) {
    let currentDirection = directions.get(instructions[i]);

    if (extendedGrid[robotPos.y + currentDirection.y][robotPos.x + currentDirection.x] == '.') {
        extendedGrid[robotPos.y][robotPos.x] = '.';
        robotPos.y += currentDirection.y;
        robotPos.x += currentDirection.x;
        extendedGrid[robotPos.y][robotPos.x] = '@';
    } else if (extendedGrid[robotPos.y + currentDirection.y][robotPos.x + currentDirection.x] == '[' || extendedGrid[robotPos.y + currentDirection.y][robotPos.x + currentDirection.x] == ']') {
        if (currentDirection.y == 0) {
            for (let p = 2; true; p++) {
                if (extendedGrid[robotPos.y + currentDirection.y * p][robotPos.x + currentDirection.x * p] == '.') {
                    extendedGrid[robotPos.y + currentDirection.y * p].splice(robotPos.x + currentDirection.x * p, 1);
                    extendedGrid[robotPos.y + currentDirection.y * p].splice(robotPos.x, 0, '.');

                    robotPos.y += currentDirection.y;
                    robotPos.x += currentDirection.x;

                    break;
                } else if (extendedGrid[robotPos.y + currentDirection.y * p][robotPos.x + currentDirection.x * p] == '#') {
                    break;
                }
            }
        } else {
            let toCheck: Pos[] = [{ x: robotPos.x, y: robotPos.y + currentDirection.y }];
            let move: Pos[] = [];
            let possible: boolean = true;

            while (toCheck.length != 0) {
                let currentToCheck = toCheck.shift();

                if (extendedGrid[currentToCheck.y][currentToCheck.x] == ']') {
                    toCheck.push({ x: currentToCheck.x, y: currentToCheck.y + currentDirection.y });
                    toCheck.push({ x: currentToCheck.x - 1, y: currentToCheck.y + currentDirection.y });

                    move.push({ x: currentToCheck.x, y: currentToCheck.y });
                    move.push({ x: currentToCheck.x - 1, y: currentToCheck.y });
                } else if (extendedGrid[currentToCheck.y][currentToCheck.x] == '[') {
                    toCheck.push({ x: currentToCheck.x, y: currentToCheck.y + currentDirection.y });
                    toCheck.push({ x: currentToCheck.x + 1, y: currentToCheck.y + currentDirection.y });

                    move.push({ x: currentToCheck.x, y: currentToCheck.y });
                    move.push({ x: currentToCheck.x + 1, y: currentToCheck.y });
                } else if (extendedGrid[currentToCheck.y][currentToCheck.x] == '#') {
                    possible = false;
                    break;
                }
            }

            let moved = new Set<string>();

            if (possible) {
                move.sort(compare);
                if (currentDirection.y == 1) move.reverse();

                for (let m = 0; m < move.length; m++) {
                    if (!moved.has(move[m].y + '_' + move[m].x)) {
                        extendedGrid[move[m].y + currentDirection.y][move[m].x] = extendedGrid[move[m].y][move[m].x];
                        extendedGrid[move[m].y][move[m].x] = '.';

                        moved.add(move[m].y + '_' + move[m].x);
                    }
                }

                extendedGrid[robotPos.y][robotPos.x] = '.';
                robotPos.y += currentDirection.y;
                robotPos.x += currentDirection.x;
                extendedGrid[robotPos.y][robotPos.x] = '@';
            }
        }
    }
}

for (let y = 0; y < extendedGrid.length; y++) {
    for (let x = 0; x < extendedGrid[y].length; x++) {
        if (extendedGrid[y][x] == '[') result += 100 * y + x;
    }
}

console.log(result);

function compare(a, b): number {
    if (a.y != b.y) {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
            return 1;
        }
    } else {
        if (a.x < b.x) {
            return -1;
        } else if (a.x > b.x) {
            return 1;
        }
    }
    return 0;
}

console.timeEnd('Time');