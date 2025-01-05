import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

class Pos {
    x: number;
    y: number;
}

class Path {
    pos: Pos;
    visited: string;
    arrowPath: string;
}

let directions: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

let numericKeypad: string[][] = [];
numericKeypad.push(['7', '8', '9']);
numericKeypad.push(['4', '5', '6']);
numericKeypad.push(['1', '2', '3']);
numericKeypad.push(['X', '0', 'A']);

let directionalKeypad: string[][] = [];
directionalKeypad.push(['X', '^', 'A']);
directionalKeypad.push(['<', 'v', '>']);

let pathsBetweenKeys = new Map<string, string>();

let nums: string[] = '0123456789A'.split('');
let arr: string[] = '><v^A'.split('');

for (let i = 0; i < nums.length; i++) {
    for (let l = 0; l < nums.length; l++) {
        findPath(numericKeypad, nums[i], nums[l]);
    }
}

for (let i = 0; i < arr.length; i++) {
    for (let l = 0; l < arr.length; l++) {
        findPath(directionalKeypad, arr[i], arr[l]);
    }
}

let alreadyFound = new Map<string, number>();

for (let i = 0; i < input.length; i++) {
    result += getLength(input[i], 26) * parseInt(input[i].slice(0, input[i].length - 1));
}

console.log(result);

function getLength(sequence: string, depth: number): number {
    if (alreadyFound.has(sequence + '-' + depth)) return alreadyFound.get(sequence + '-' + depth);

    let sequenceLength = 0;

    if (depth == 0) {
        sequenceLength = sequence.length;
    } else {
        let currentKey = 'A';

        for (let s = 0; s < sequence.length; s++) {
            sequenceLength += getLength(pathsBetweenKeys.get(currentKey + '-' + sequence[s]) + 'A', depth - 1);
            currentKey = sequence[s];
        }
    }

    alreadyFound.set(sequence + '-' + depth, sequenceLength);
    return sequenceLength;
}

function findPath(pad: string[][], start: string, end: string) {
    let startCoordinate: Pos = { x: -1, y: -1 };
    let endCoordinate: Pos = { x: -1, y: -1 };

    let possibleArrowSequences: string[] = [];

    for (let y = 0; y < pad.length; y++) {
        for (let x = 0; x < pad[y].length; x++) {
            if (pad[y][x] == start) startCoordinate = { x: x, y: y };
            if (pad[y][x] == end) endCoordinate = { x: x, y: y };
        }
    }

    let paths: Path[] = [{ pos: startCoordinate, visited: getStringFromPos(startCoordinate), arrowPath: '' }];
    
    while (paths.length != 0) {
        let currentPath = paths.shift();

        if (currentPath.pos.x == endCoordinate.x && currentPath.pos.y == endCoordinate.y) {
            if (checkPathOnEfficiency(currentPath.arrowPath)) {
                possibleArrowSequences.push(currentPath.arrowPath);
            }
        } else {
            for (let d of directions) {
                if (currentPath.pos.x + d.x >= 0 && currentPath.pos.x + d.x < pad[0].length && currentPath.pos.y + d.y >= 0 && currentPath.pos.y + d.y < pad.length) {
                    if (pad[currentPath.pos.y + d.y][currentPath.pos.x + d.x] != 'X' && !currentPath.visited.includes(getStringFromPos({ x: currentPath.pos.x + d.x, y: currentPath.pos.y + d.y }))) {
                        paths.push({ pos: { x: currentPath.pos.x + d.x, y: currentPath.pos.y + d.y }, visited: currentPath.visited + getStringFromPos({ x: currentPath.pos.x + d.x, y: currentPath.pos.y + d.y }), arrowPath: currentPath.arrowPath + getArrowFromDir(d) })
                    }
                }
            }
        }
    }

    if (possibleArrowSequences.length == 1) {
        pathsBetweenKeys.set(start + '-' + end, possibleArrowSequences[0]);
    } else {
        if (possibleArrowSequences[0].startsWith('<')) {
            pathsBetweenKeys.set(start + '-' + end, possibleArrowSequences[0]);
        } else {
            pathsBetweenKeys.set(start + '-' + end, possibleArrowSequences[1]);
        }
    }
}

function checkPathOnEfficiency(path: string): boolean {
    if ((path.includes('>') && path.includes('<')) || (path.includes('^') && path.includes('v'))) return false;

    let arrowsFound: string[] = [];
    let currentArrow: string = path[0];

    for (let i = 1; i < path.length; i++) {
        if (path[i] != currentArrow) {
            if (arrowsFound.includes(path[i])) return false;
            arrowsFound.push(currentArrow);
            currentArrow = path[i];
        }
    }

    return true;
}

function getStringFromPos(pos: Pos): string {
    return '_' + pos.x + '.' + pos.y + '_';
}

function getArrowFromDir(dir: Pos): string {
    if (dir.y == 1) return 'v';
    if (dir.y == -1) return '^';
    if (dir.x == 1) return '>';
    if (dir.x == -1) return '<';
}

console.timeEnd('Time');