import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));
let result: string = '';

class Path {
    x: number;
    y: number;
    length: number;
    manhattanDistance: number;
    visited: string;
}

class Pos {
    x: number;
    y: number;
}

let directions: Pos[] = [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }];

let gridSize: number = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i][0] > gridSize) gridSize = input[i][0];
    if (input[i][1] > gridSize) gridSize = input[i][1];
}

gridSize++;

let startSearchAt: number = 0;

for (let i = 1; true; i += 500) {
    if (findPath(i, false) == 0) break;
    startSearchAt = i + 1;
}

result = input[findPath(startSearchAt, true) - 1].join(',');
console.log(result);

function findPath(bytes: number, continueSearch: boolean): number {
    if (input.length <= bytes) return 0;

    let grid: string[][] = new Array(gridSize);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(gridSize).fill('.');
    }

    for (let i = 0; i < bytes; i++) {
        grid[input[i][1]][input[i][0]] = '#';
    }

    let pathFound = false;

    do {
        pathFound = false;

        let paths: Path[] = [{ x: 0, y: 0, length: 0, manhattanDistance: manhattanDistance(0, 0), visited: '' }];

        let lowestCosts: number[][] = new Array(grid.length);

        for (let i = 0; i < lowestCosts.length; i++) {
            lowestCosts[i] = new Array(grid[0].length).fill(Number.MAX_VALUE);
        }

        while (paths.length != 0) {
            let currentPath = paths.shift();

            if (currentPath.x == gridSize - 1 && currentPath.y == gridSize - 1) {
                pathFound = true;
                break;
            } else {
                for (let d = 0; d < directions.length; d++) {
                    if (currentPath.x + directions[d].x >= 0 && currentPath.x + directions[d].x < grid[0].length && currentPath.y + directions[d].y >= 0 && currentPath.y + directions[d].y < grid.length) {
                        if (grid[currentPath.y + directions[d].y][currentPath.x + directions[d].x] == '.' && !currentPath.visited.includes(getStringFromPos(currentPath.x + directions[d].x, currentPath.y + directions[d].y)) && lowestCosts[currentPath.y + directions[d].y][currentPath.x + directions[d].x] > currentPath.length + 1) {
                            paths.push({ x: currentPath.x + directions[d].x, y: currentPath.y + directions[d].y, length: currentPath.length + 1, manhattanDistance: manhattanDistance(currentPath.x + directions[d].x, currentPath.y + directions[d].y), visited: currentPath.visited + getStringFromPos(currentPath.x + directions[d].x, currentPath.y + directions[d].y) });
                            lowestCosts[currentPath.y + directions[d].y][currentPath.x + directions[d].x] = currentPath.length + 1;
                        }
                    }
                }
            }

            paths.sort(compare);
        }

        if (pathFound && continueSearch) {
            grid[input[bytes][1]][input[bytes][0]] = '#';
            bytes++;
        }
    } while (pathFound && continueSearch);

    if (continueSearch || (!continueSearch && pathFound)) return bytes;
    return 0;
}

function getStringFromPos(x: number, y: number): string {
    return '_' + x.toString() + '.' + y.toString() + '_';
}

function compare(a: Path, b: Path): number {
    if (a.manhattanDistance < b.manhattanDistance) {
        return -1;
    } else if (a.manhattanDistance > b.manhattanDistance) {
        return 1;
    }
}

function manhattanDistance(x: number, y: number): number {
    return Math.abs(x - (gridSize - 1)) + Math.abs(y - (gridSize - 1));
}

console.timeEnd('Time');