import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = Number.MAX_VALUE;

class Pos {
    x: number;
    y: number;
}

class Path {
    pos: Pos;
    length: number;
    visited: string[];
}

let portals = new Map<string, string>();
let portalsTemp = new Map<string, string>();

let start: { x: number, y: number } = { x: -1, y: -1 };
let destination: { x: number, y: number } = { x: -1, y: -1 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == ' ') {
            input[y][x] = '#';
        } else if (input[y][x] == '.') {
            if (input[y - 1][x] != '#' && input[y - 1][x] != '.' && input[y - 1][x] != ' ' && input[y - 1][x] != 'o') {
                if (portalsTemp.has(input[y - 2][x] + input[y - 1][x])) {
                    portals.set(portalsTemp.get(input[y - 2][x] + input[y - 1][x]), getStringOfCoords(x, y));
                    portals.set(getStringOfCoords(x, y), portalsTemp.get(input[y - 2][x] + input[y - 1][x]));
                } else {
                    portalsTemp.set(input[y - 2][x] + input[y - 1][x], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y + 1][x] != '#' && input[y + 1][x] != '.' && input[y + 1][x] != ' ' && input[y + 1][x] != 'o') {
                if (portalsTemp.has(input[y + 1][x] + input[y + 2][x])) {
                    portals.set(portalsTemp.get(input[y + 1][x] + input[y + 2][x]), getStringOfCoords(x, y));
                    portals.set(getStringOfCoords(x, y), portalsTemp.get(input[y + 1][x] + input[y + 2][x]));
                } else {
                    portalsTemp.set(input[y + 1][x] + input[y + 2][x], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y][x - 1] != '#' && input[y][x - 1] != '.' && input[y][x - 1] != ' ' && input[y][x - 1] != 'o') {
                if (portalsTemp.has(input[y][x - 2] + input[y][x - 1])) {
                    portals.set(portalsTemp.get(input[y][x - 2] + input[y][x - 1]), getStringOfCoords(x, y));
                    portals.set(getStringOfCoords(x, y), portalsTemp.get(input[y][x - 2] + input[y][x - 1]));
                } else {
                    portalsTemp.set(input[y][x - 2] + input[y][x - 1], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y][x + 1] != '#' && input[y][x + 1] != '.' && input[y][x + 1] != ' ' && input[y][x + 1] != 'o') {
                if (portalsTemp.has(input[y][x + 1] + input[y][x + 2])) {
                    portals.set(portalsTemp.get(input[y][x + 1] + input[y][x + 2]), getStringOfCoords(x, y));
                    portals.set(getStringOfCoords(x, y), portalsTemp.get(input[y][x + 1] + input[y][x + 2]));
                } else {
                    portalsTemp.set(input[y][x + 1] + input[y][x + 2], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            }
        }
    }
}

start.x = parseInt(portalsTemp.get('AA').split('_')[0]);
start.y = parseInt(portalsTemp.get('AA').split('_')[1]);

destination.x = parseInt(portalsTemp.get('ZZ').split('_')[0]);
destination.y = parseInt(portalsTemp.get('ZZ').split('_')[1]);

input[start.y][start.x] = '.';
input[destination.y][destination.x] = '.';

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '.' && input[y][x] != 'o') input[y][x] = '#';
    }
}

let dir: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
let paths: Path[] = [{ pos: start, length: 0, visited: [getStringOfCoords(start.x, start.y)] }];

while (paths.length != 0) {
    let currentPath = paths.shift();

    if (currentPath.pos.x == destination.x && currentPath.pos.y == destination.y && currentPath.length < result) result = currentPath.length;

    for (let d = 0; d < dir.length; d++) {
        if (!currentPath.visited.includes(getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y))) {
            if (input[currentPath.pos.y + dir[d].y][currentPath.pos.x + dir[d].x] == '.') {
                paths.push({ pos: { x: currentPath.pos.x + dir[d].x, y: currentPath.pos.y + dir[d].y }, length: currentPath.length + 1, visited: [...currentPath.visited, getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y)] });
            } else if (input[currentPath.pos.y + dir[d].y][currentPath.pos.x + dir[d].x] == 'o') {
                let newPos: Pos = { x: parseInt(portals.get(getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y)).split('_')[0]), y: parseInt(portals.get(getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y)).split('_')[1]) };
                paths.push({ pos: { x: newPos.x, y: newPos.y }, length: currentPath.length + 2, visited: [...currentPath.visited, getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y), getStringOfCoords(newPos.x, newPos.y)] });
            }
        }
    }
}

console.log(result);

function getStringOfCoords(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

console.timeEnd('Time');