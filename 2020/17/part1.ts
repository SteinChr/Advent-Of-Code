import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(l => l.split(''));
const cycle = 6;
let maxX = input[0].length + 2 * cycle;
let maxY = input.length + 2 * cycle;
let maxZ = 1 + 2 * cycle;
let state = createNewArray(maxX, maxY, maxZ);
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        state[cycle][y + cycle][x + cycle] = input[y][x];
    }
}


for (let i = 0; i < cycle; i++) {
    let newState = createNewArray(maxX, maxY, maxZ);

    for (let z = 0; z < maxZ; z++) {
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                let numberOfNeighbours = getNeighbours(x, y, z);
                if (state[z][y][x] == '#' && (numberOfNeighbours == 2 || numberOfNeighbours == 3)) {
                    newState[z][y][x] = '#';
                } else if (state[z][y][x] == '.' && numberOfNeighbours == 3) {
                    newState[z][y][x] = '#';
                }
            }
        }
    }
    state = newState;
}

for (let z = 0; z < maxZ; z++) {
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            if (state[z][y][x] == '#') {
                result++;
            }
        }
    }
}

console.log(result);

function createNewArray(maxX: number, maxY: number, maxZ: number): string[][][] {
    let array: string[][][] = new Array(maxZ);
    for (let z = 0; z < maxZ; z++) {
        array[z] = new Array(maxY);
        for (let y = 0; y < maxY; y++) {
            array[z][y] = new Array(maxX);
            for (let x = 0; x < maxX; x++) {
                array[z][y][x] = '.';
            }
        }
    }
    return array;
}

function getNeighbours(x: number, y: number, z: number) {
    let counter = 0;
    for (let currentZ = z - 1; currentZ <= z + 1; currentZ++) {
        for (let currentY = y - 1; currentY <= y + 1; currentY++) {
            for (let currentX = x - 1; currentX <= x + 1; currentX++) {
                if (!(currentZ == z && currentY == y && currentX == x)) {
                    if (state[currentZ] != null && state[currentZ][currentY] != null && state[currentZ][currentY][currentX] == '#') {
                        counter++;
                    }
                }
            }
        }
    }
    return counter;
}

console.timeEnd('Time');