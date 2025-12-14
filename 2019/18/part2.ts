import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = Number.MAX_VALUE;

class Pos {
    x: number;
    y: number;
}

class Key {
    name: string;
    pos: Pos;
}

class Connection {
    key1: string;
    key2: string;
    length: number;
    keysNecessary: string[];
}

class Path {
    pos: Pos;
    visited: string[];
    keysNecessary: string[];
    length: number;
    shortest: boolean;
}

class ToCheck {
    pos: string[];
    keysCollected: string[];
    length: number;
    visited: string[];
}

let directions: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

let startPos: Pos[] = [];
let keys: Key[] = [];

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '@') {
            startPos.push({ x: x - 1, y: y - 1 });
            startPos.push({ x: x + 1, y: y - 1 });
            startPos.push({ x: x - 1, y: y + 1 });
            startPos.push({ x: x + 1, y: y + 1 });

            input[y][x] = '#';
            input[y][x + 1] = '#';
            input[y][x - 1] = '#';
            input[y + 1][x] = '#';
            input[y - 1][x] = '#';

            for (let i = 0; i < startPos.length; i++) {
                keys.push({ name: `@${i}`, pos: startPos[i] });
            }
        } else {
            if (input[y][x].charCodeAt(0) >= 97 && input[y][x].charCodeAt(0) <= 122) {
                keys.push({ name: input[y][x], pos: { x: x, y: y } });
            }
        }
    }
}

let connections: Connection[] = [];

for (let k1 = 0; k1 < keys.length; k1++) {
    for (let k2 = k1 + 1; k2 < keys.length; k2++) {
        let paths = findPath(keys[k1].pos, keys[k2].pos);
        if (paths.pos.x != -1) connections.push({ key1: keys[k1].name, key2: keys[k2].name, length: paths.length, keysNecessary: paths.keysNecessary });
    }
}

let toCheck = new Set<ToCheck>();
toCheck.add({ pos: ['@0', '@1', '@2', '@3'], keysCollected: [], length: 0, visited: [] });

let states = new Map<string, number>();

toCheck.forEach(currentToCheck => {
    if (currentToCheck.keysCollected.length == keys.length - 4 && currentToCheck.length < result) result = currentToCheck.length;

    for (let p = 0; p < currentToCheck.pos.length; p++) {
        for (let c = 0; c < connections.length; c++) {
            if (connections[c].key1 == currentToCheck.pos[p] && !['@0', '@1', '@2', '@3'].includes(connections[c].key2) && !currentToCheck.keysCollected.includes(connections[c].key2)) {
                let allKeysThere: boolean = true;

                for (let i = 0; i < connections[c].keysNecessary.length && allKeysThere; i++) {
                    if (!currentToCheck.keysCollected.includes(connections[c].keysNecessary[i])) allKeysThere = false;
                }

                if (allKeysThere) {
                    let newPos = currentToCheck.pos.slice();
                    newPos[p] = connections[c].key2;

                    let stateKey = getStateString(newPos, [...currentToCheck.keysCollected, connections[c].key2]);

                    if (states.has(stateKey)) {
                        if (states.get(stateKey) > currentToCheck.length + connections[c].length) {
                            toCheck.add({ pos: newPos, keysCollected: [...currentToCheck.keysCollected, connections[c].key2], length: currentToCheck.length + connections[c].length, visited: [...currentToCheck.visited, connections[c].key2] });
                            states.set(stateKey, currentToCheck.length + connections[c].length);
                        }
                    } else {
                        toCheck.add({ pos: newPos, keysCollected: [...currentToCheck.keysCollected, connections[c].key2], length: currentToCheck.length + connections[c].length, visited: [...currentToCheck.visited, connections[c].key2] });
                        states.set(stateKey, currentToCheck.length + connections[c].length);
                    }
                }
            }

            if (connections[c].key2 == currentToCheck.pos[p] && !['@0', '@1', '@2', '@3'].includes(connections[c].key1) && !currentToCheck.keysCollected.includes(connections[c].key1)) {
                let allKeysThere: boolean = true;

                for (let i = 0; i < connections[c].keysNecessary.length && allKeysThere; i++) {
                    if (!currentToCheck.keysCollected.includes(connections[c].keysNecessary[i])) allKeysThere = false;
                }

                if (allKeysThere) {
                    let newPos = currentToCheck.pos.slice();
                    newPos[p] = connections[c].key1;

                    let stateKey = getStateString(newPos, [...currentToCheck.keysCollected, connections[c].key1]);

                    if (states.has(stateKey)) {
                        if (states.get(stateKey) > currentToCheck.length + connections[c].length) {
                            toCheck.add({ pos: newPos, keysCollected: [...currentToCheck.keysCollected, connections[c].key1], length: currentToCheck.length + connections[c].length, visited: [...currentToCheck.visited, connections[c].key1] });
                            states.set(stateKey, currentToCheck.length + connections[c].length);
                        }
                    } else {
                        toCheck.add({ pos: newPos, keysCollected: [...currentToCheck.keysCollected, connections[c].key1], length: currentToCheck.length + connections[c].length, visited: [...currentToCheck.visited, connections[c].key1] });
                        states.set(stateKey, currentToCheck.length + connections[c].length);
                    }
                }
            }
        }
    }
});

console.log(result);

function findPath(start: Pos, destination: Pos): Path {
    let paths: Path[] = [{ pos: start, visited: [getStringFromCoords(start)], keysNecessary: [], length: 0, shortest: true }];

    let possiblePaths: Path[] = [];

    while (paths.length != 0) {
        let currentPath = paths.shift();

        for (let d = 0; d < directions.length; d++) {
            let newPos: Pos = { x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y };

            if (newPos.x == destination.x && newPos.y == destination.y) {
                possiblePaths.push({ pos: destination, visited: currentPath.visited, keysNecessary: currentPath.keysNecessary.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)), length: currentPath.length + 1, shortest: true });
            } else if (input[newPos.y][newPos.x] == '.') {
                if (!currentPath.visited.includes(getStringFromCoords(newPos))) {
                    paths.push({ pos: newPos, visited: [...currentPath.visited, getStringFromCoords(newPos)], keysNecessary: currentPath.keysNecessary.slice(), length: currentPath.length + 1, shortest: true });
                }
            } else if (input[newPos.y][newPos.x] != '#') {
                if (!currentPath.visited.includes(getStringFromCoords(newPos))) {
                    paths.push({ pos: newPos, visited: [...currentPath.visited, getStringFromCoords(newPos)], keysNecessary: [...currentPath.keysNecessary, input[newPos.y][newPos.x].toLowerCase()], length: currentPath.length + 1, shortest: true });
                }
            }
        }
    }

    for (let i = 0; i < possiblePaths.length; i++) {
        for (let l = i + 1; l < possiblePaths.length; l++) {
            if (possiblePaths[i].shortest && possiblePaths[l].shortest && possiblePaths[i].keysNecessary.join('') == possiblePaths[l].keysNecessary.join('')) {
                if (possiblePaths[i].length < possiblePaths[l].length) {
                    possiblePaths[l].shortest = false;
                } else {
                    possiblePaths[i].shortest = false;
                }
            }
        }
    }

    if (possiblePaths.length == 0) return { pos: { x: -1, y: -1 }, visited: [], keysNecessary: [], length: 0, shortest: false };

    return possiblePaths.find(x => x.shortest);
}

function getStringFromCoords(pos: Pos): string {
    return pos.x + '_' + pos.y;
}

function getStateString(pos: string[], keys: string[]): string {
    let uniqueKeys: string[] = [];

    for (let c = 0; c < keys.length; c++) {
        if (!uniqueKeys.includes(keys[c])) uniqueKeys.push(keys[c]);
    }

    uniqueKeys.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

    return pos.join('.') + '_' + uniqueKeys.join('.');
}

console.timeEnd('Time');