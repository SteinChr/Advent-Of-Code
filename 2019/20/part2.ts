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
    level: number;
}

class Portal {
    pos: string;
    levelChange: number;
}

let portals = new Map<string, Portal>();
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
                    let levelChange = isOutsidePortal(x, y);

                    portals.set(portalsTemp.get(input[y - 2][x] + input[y - 1][x]), { pos: getStringOfCoords(x, y), levelChange: levelChange * -1 });
                    portals.set(getStringOfCoords(x, y), { pos: portalsTemp.get(input[y - 2][x] + input[y - 1][x]), levelChange: levelChange });
                } else {
                    portalsTemp.set(input[y - 2][x] + input[y - 1][x], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y + 1][x] != '#' && input[y + 1][x] != '.' && input[y + 1][x] != ' ' && input[y + 1][x] != 'o') {
                if (portalsTemp.has(input[y + 1][x] + input[y + 2][x])) {
                    let levelChange = isOutsidePortal(x, y);

                    portals.set(portalsTemp.get(input[y + 1][x] + input[y + 2][x]), { pos: getStringOfCoords(x, y), levelChange: levelChange * -1 });
                    portals.set(getStringOfCoords(x, y), { pos: portalsTemp.get(input[y + 1][x] + input[y + 2][x]), levelChange: levelChange });
                } else {
                    portalsTemp.set(input[y + 1][x] + input[y + 2][x], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y][x - 1] != '#' && input[y][x - 1] != '.' && input[y][x - 1] != ' ' && input[y][x - 1] != 'o') {
                if (portalsTemp.has(input[y][x - 2] + input[y][x - 1])) {
                    let levelChange = isOutsidePortal(x, y);

                    portals.set(portalsTemp.get(input[y][x - 2] + input[y][x - 1]), { pos: getStringOfCoords(x, y), levelChange: levelChange * -1 });
                    portals.set(getStringOfCoords(x, y), { pos: portalsTemp.get(input[y][x - 2] + input[y][x - 1]), levelChange: levelChange });
                } else {
                    portalsTemp.set(input[y][x - 2] + input[y][x - 1], getStringOfCoords(x, y));
                }

                input[y][x] = 'o';
            } else if (input[y][x + 1] != '#' && input[y][x + 1] != '.' && input[y][x + 1] != ' ' && input[y][x + 1] != 'o') {
                if (portalsTemp.has(input[y][x + 1] + input[y][x + 2])) {
                    let levelChange = isOutsidePortal(x, y);

                    portals.set(portalsTemp.get(input[y][x + 1] + input[y][x + 2]), { pos: getStringOfCoords(x, y), levelChange: levelChange * -1 });
                    portals.set(getStringOfCoords(x, y), { pos: portalsTemp.get(input[y][x + 1] + input[y][x + 2]), levelChange: levelChange });
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

for (let i = 0; result == Number.MAX_VALUE; i++) {
    findPath(i);
}

function findPath(maxLevel: number) {
    let paths: Path[] = [{ pos: start, length: 0, visited: [getVisitedOfCoords(start.x, start.y, 0)], level: 0 }];

    while (paths.length != 0) {
        let currentPath = paths.shift();

        if (currentPath.pos.x == destination.x && currentPath.pos.y == destination.y && currentPath.level == 0 && currentPath.length < result) result = currentPath.length;

        for (let d = 0; d < dir.length; d++) {
            if (!currentPath.visited.includes(getVisitedOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y, currentPath.level))) {
                if (input[currentPath.pos.y + dir[d].y][currentPath.pos.x + dir[d].x] == '.') {
                    paths.push({ pos: { x: currentPath.pos.x + dir[d].x, y: currentPath.pos.y + dir[d].y }, length: currentPath.length + 1, visited: [...currentPath.visited, getVisitedOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y, currentPath.level)], level: currentPath.level });
                } else if (input[currentPath.pos.y + dir[d].y][currentPath.pos.x + dir[d].x] == 'o') {
                    let portalTarget: Portal = portals.get(getStringOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y));
                    let newPos: Pos = { x: parseInt(portalTarget.pos.split('_')[0]), y: parseInt(portalTarget.pos.split('_')[1]) };
                    if (currentPath.level + portalTarget.levelChange >= 0 && currentPath.level + portalTarget.levelChange <= maxLevel) paths.push({ pos: { x: newPos.x, y: newPos.y }, length: currentPath.length + 2, visited: [...currentPath.visited, getVisitedOfCoords(currentPath.pos.x + dir[d].x, currentPath.pos.y + dir[d].y, currentPath.level), getVisitedOfCoords(newPos.x, newPos.y, currentPath.level + portalTarget.levelChange)], level: currentPath.level + portalTarget.levelChange });
                }
            }
        }
    }
}

console.log(result);

function isOutsidePortal(x: number, y: number): number {
    if (y == 2 || y == input.length - 3 || x == 2 || x == input[0].length - 3) return -1;

    return 1;
}

function getStringOfCoords(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

function getVisitedOfCoords(x: number, y: number, l: number): string {
    return x.toString() + '_' + y.toString() + '_' + l.toString();
}

console.timeEnd('Time');