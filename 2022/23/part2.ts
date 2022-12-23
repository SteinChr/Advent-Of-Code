import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Coordinate {
    x: number;
    y: number
}

class Elf {
    position: Coordinate;
    proposedDirection: Coordinate;
}

class Direction {
    x: number;
    y: number;
    checkX1: number;
    checkY1: number;
    checkX2: number;
    checkY2: number;
}

let directions: Direction[] = [
    { x: 0, y: -1, checkX1: -1, checkY1: -1, checkX2: 1, checkY2: -1 },
    { x: 0, y: 1, checkX1: -1, checkY1: 1, checkX2: 1, checkY2: 1 },
    { x: -1, y: 0, checkX1: -1, checkY1: -1, checkX2: -1, checkY2: 1 },
    { x: 1, y: 0, checkX1: 1, checkY1: -1, checkX2: 1, checkY2: 1 }
];

let elves: Elf[] = []
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') elves.push({ position: { x: x, y: y }, proposedDirection: { x: 3, y: 3 } });
    }
}

let elfMoved: boolean = true;
checkIfGridExtensionIsNecessary();
for (let round = 0; elfMoved; round++) {
    elfMoved = false;
    for (let elf of elves) {
        if (checkIfElfHasNeighbour(elf.position.x, elf.position.y)) {
            for (let direction of directions) {
                if (input[elf.position.y + direction.checkY1][elf.position.x + direction.checkX1] != '#' &&
                    input[elf.position.y + direction.checkY2][elf.position.x + direction.checkX2] != '#') {
                    if (input[elf.position.y + direction.y][elf.position.x + direction.x] == '.') {
                        elf.proposedDirection.x = direction.x;
                        elf.proposedDirection.y = direction.y;
                        input[elf.position.y + direction.y][elf.position.x + direction.x] = 'x';
                        break;
                    } else if (input[elf.position.y + direction.y][elf.position.x + direction.x] == 'x') {
                        input[elf.position.y + direction.y][elf.position.x + direction.x] = '.';
                        break;
                    }
                }
            }
        }
    }
    for (let elf of elves) {
        if (elf.proposedDirection.x != 3 && elf.proposedDirection.y != 3) {
            if (input[elf.position.y + elf.proposedDirection.y][elf.position.x + elf.proposedDirection.x] == 'x') {
                elfMoved = true;
                input[elf.position.y][elf.position.x] = '.';
                elf.position.y += elf.proposedDirection.y;
                elf.position.x += elf.proposedDirection.x;
                input[elf.position.y][elf.position.x] = '#';
            }
            elf.proposedDirection.y = 3;
            elf.proposedDirection.x = 3;
        }
    }
    directions.push(directions.shift());
    checkIfGridExtensionIsNecessary();
    result++;
}

console.log(result);

function checkIfElfHasNeighbour(x: number, y: number): boolean {
    if (input[y - 1][x - 1] != '#' &&
        input[y - 1][x] != '#' &&
        input[y - 1][x + 1] != '#' &&
        input[y][x - 1] != '#' &&
        input[y][x + 1] != '#' &&
        input[y + 1][x - 1] != '#' &&
        input[y + 1][x] != '#' &&
        input[y + 1][x + 1] != '#') {
        return false;
    } else {
        return true;
    }
}

function checkIfGridExtensionIsNecessary() {
    let necessary: boolean = false;
    for (let x = 0; x < input[0].length && !necessary; x++) {
        if (input[0][x] == '#') necessary = true;
    }
    if (necessary) extendGrid('up');
    necessary = false;

    for (let y = 0; y < input.length && !necessary; y++) {
        if (input[y][0] == '#') necessary = true;
    }
    if (necessary) extendGrid('left');
    necessary = false;

    for (let y = 0; y < input.length && !necessary; y++) {
        if (input[y][input[y].length - 1] == '#') necessary = true;
    }
    if (necessary) extendGrid('right');
    necessary = false;

    for (let x = 0; x < input[input.length - 1].length && !necessary; x++) {
        if (input[input.length - 1][x] == '#') necessary = true;
    }
    if (necessary) extendGrid('down');
    necessary = false;
}

function extendGrid(direction: string) {
    if (direction == 'up') {
        input.unshift(new Array(input[0].length).fill('.'));
        for (let elf of elves) {
            elf.position.y++;
        }
    } else if (direction == 'down') {
        input.push(new Array(input[0].length).fill('.'));
    } else if (direction == 'left') {
        input.map(x => x.unshift('.'));
        for (let elf of elves) {
            elf.position.x++;
        }
    } else if (direction == 'right') {
        input.map(x => x.push('.'));
    }
}

console.timeEnd('Time');