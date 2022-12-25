import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = Number.MAX_VALUE;

class Position {
    x: number;
    y: number;
}

class Blizzard {
    position: Position;
    direction: Position;
}

class Path {
    position: Position;
    minutes: number;
    manhattanDistance: number;
}

let blizzards: Blizzard[] = [];
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '>') blizzards.push({ position: { x: x, y: y }, direction: { x: 1, y: 0 } });
        if (input[y][x] == 'v') blizzards.push({ position: { x: x, y: y }, direction: { x: 0, y: 1 } });
        if (input[y][x] == '<') blizzards.push({ position: { x: x, y: y }, direction: { x: -1, y: 0 } });
        if (input[y][x] == '^') blizzards.push({ position: { x: x, y: y }, direction: { x: 0, y: -1 } });
    }
}

let grid: string[][][] = new Array(500);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(input.length);
    for (let y = 0; y < grid[i].length; y++) {
        grid[i][y] = new Array(input[y].length);
        for (let x = 0; x < grid[i][y].length; x++) {
            if (i == 0) {
                if (input[y][x] == '.' || input[y][x] == '#') {
                    grid[i][y][x] = input[y][x];
                } else {
                    grid[i][y][x] = 'b';
                }
            } else {
                if (grid[i - 1][y][x] != 'b') {
                    grid[i][y][x] = grid[i - 1][y][x];
                } else {
                    grid[i][y][x] = '.';
                }
            }
        }
    }
    if (i > 0) {
        for (let blizzard of blizzards) {
            blizzard.position.x += blizzard.direction.x;
            blizzard.position.y += blizzard.direction.y;
            if (blizzard.position.x == 0) blizzard.position.x = grid[0][0].length - 2;
            if (blizzard.position.x == grid[0][0].length - 1) blizzard.position.x = 1;
            if (blizzard.position.y == 0) blizzard.position.y = grid[0].length - 2;
            if (blizzard.position.y == grid[0].length - 1) blizzard.position.y = 1;
            grid[i][blizzard.position.y][blizzard.position.x] = 'b';
        }
    }
}

let startingPosition: Position = { x: -1, y: 0 };
let destination: Position = { x: -1, y: grid[0].length - 1 };
for (let x = 0; x < grid[0][0].length; x++) {
    if (grid[0][0][x] == '.') startingPosition.x = x;
    if (grid[0][grid[0].length - 1][x] == '.') destination.x = x;
}

let paths: Path[] = [{ position: { x: startingPosition.x, y: startingPosition.y }, minutes: 0, manhattanDistance: manhattanDistance(startingPosition.x, startingPosition.y) }];
let checkedPaths = new Set<string>();
for (let p = 0; paths.length != 0; p++) {
    let currentPath = paths.shift();

    if (currentPath.position.x == destination.x && currentPath.position.y == destination.y) {
        result = currentPath.minutes;
    } else {
        currentPath.minutes++;
        if (currentPath.minutes + currentPath.manhattanDistance < result) {
            if (!checkedPaths.has(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes) && !pathAlreadyIncluded(currentPath) && grid[currentPath.minutes][currentPath.position.y][currentPath.position.x] == '.') paths.push({ position: { x: currentPath.position.x, y: currentPath.position.y }, minutes: currentPath.minutes, manhattanDistance: manhattanDistance(currentPath.position.x, currentPath.position.y) });
            if (!checkedPaths.has(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes) && !pathAlreadyIncluded({ position: { x: currentPath.position.x, y: currentPath.position.y + 1 }, minutes: currentPath.minutes, manhattanDistance: currentPath.manhattanDistance }) && currentPath.position.y + 1 < grid[currentPath.minutes].length && grid[currentPath.minutes][currentPath.position.y + 1][currentPath.position.x] == '.') paths.push({ position: { x: currentPath.position.x, y: currentPath.position.y + 1 }, minutes: currentPath.minutes, manhattanDistance: manhattanDistance(currentPath.position.x, currentPath.position.y + 1) });
            if (!checkedPaths.has(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes) && !pathAlreadyIncluded({ position: { x: currentPath.position.x, y: currentPath.position.y - 1 }, minutes: currentPath.minutes, manhattanDistance: currentPath.manhattanDistance }) && currentPath.position.y - 1 >= 0 && grid[currentPath.minutes][currentPath.position.y - 1][currentPath.position.x] == '.') paths.push({ position: { x: currentPath.position.x, y: currentPath.position.y - 1 }, minutes: currentPath.minutes, manhattanDistance: manhattanDistance(currentPath.position.x, currentPath.position.y - 1) });
            if (!checkedPaths.has(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes) && !pathAlreadyIncluded({ position: { x: currentPath.position.x + 1, y: currentPath.position.y }, minutes: currentPath.minutes, manhattanDistance: currentPath.manhattanDistance }) && currentPath.position.x + 1 < grid[currentPath.minutes][currentPath.position.y].length && grid[currentPath.minutes][currentPath.position.y][currentPath.position.x + 1] == '.') paths.push({ position: { x: currentPath.position.x + 1, y: currentPath.position.y }, minutes: currentPath.minutes, manhattanDistance: manhattanDistance(currentPath.position.x + 1, currentPath.position.y) });
            if (!checkedPaths.has(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes) && !pathAlreadyIncluded({ position: { x: currentPath.position.x - 1, y: currentPath.position.y }, minutes: currentPath.minutes, manhattanDistance: currentPath.manhattanDistance }) && currentPath.position.x - 1 >= 0 && grid[currentPath.minutes][currentPath.position.y][currentPath.position.x - 1] == '.') paths.push({ position: { x: currentPath.position.x - 1, y: currentPath.position.y }, minutes: currentPath.minutes, manhattanDistance: manhattanDistance(currentPath.position.x - 1, currentPath.position.y) });
        }
    }

    checkedPaths.add(currentPath.position.x + ',' + currentPath.position.y + ',' + currentPath.minutes);
    paths.sort(sort);
}

console.log(result);

function manhattanDistance(x: number, y: number): number {
    return Math.abs(x - destination.x) + Math.abs(y - destination.y);
}

function pathAlreadyIncluded(path: Path): boolean {
    for (let p = 0; p < paths.length; p++) {
        if (path.position.x == paths[p].position.x && path.position.y == paths[p].position.y && path.minutes >= paths[p].minutes) return true;
    }
    return false;
}

function sort(a: Path, b: Path): number {
    if (a.manhattanDistance > b.manhattanDistance) {
        return 1;
    } else if (a.manhattanDistance < b.manhattanDistance) {
        return -1;
    } else {
        if (a.minutes > b.minutes) {
            return 1;
        } else {
            return -1;
        }
    }
}

console.timeEnd('Time');