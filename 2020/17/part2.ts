import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(l => l.split(''));
const cycle = 6;
let maxX = input[0].length + 2 * cycle;
let maxY = input.length + 2 * cycle;
let maxZ = 1 + 2 * cycle;
let maxW = 1 + 2 * cycle;
let state = createNewArray(maxX, maxY, maxZ, maxW);
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        state[cycle][cycle][y + cycle][x + cycle] = input[y][x];
    }
}


for (let i = 0; i < cycle; i++) {
    let newState = createNewArray(maxX, maxY, maxZ, maxW);

    for (let w = 0; w < maxW; w++) {
        for (let z = 0; z < maxZ; z++) {
            for (let y = 0; y < maxY; y++) {
                for (let x = 0; x < maxX; x++) {
                    let numberOfNeighbours = getNeighbours(x, y, z, w);
                    if (state[w][z][y][x] == '#' && (numberOfNeighbours == 2 || numberOfNeighbours == 3)) {
                        newState[w][z][y][x] = '#';
                    } else if (state[w][z][y][x] == '.' && numberOfNeighbours == 3) {
                        newState[w][z][y][x] = '#';
                    }
                }
            }
        }
    }
    state = newState;
}

for (let w = 0; w < maxW; w++) {
    for (let z = 0; z < maxZ; z++) {
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                if (state[w][z][y][x] == '#') {
                    result++;
                }
            }
        }
    }
}

console.log(result);

function createNewArray(maxX: number, maxY: number, maxZ: number, maxW: number): string[][][][] {
    let array: string[][][][] = new Array(maxW);
    for (let w = 0; w < maxW; w++) {
        array[w] = new Array(maxZ);
        for (let z = 0; z < maxZ; z++) {
            array[w][z] = new Array(maxY);
            for (let y = 0; y < maxY; y++) {
                array[w][z][y] = new Array(maxX);
                for (let x = 0; x < maxX; x++) {
                    array[w][z][y][x] = '.';
                }
            }
        }
    }
    return array;
}

function getNeighbours(x: number, y: number, z: number, w: number) {
    let counter = 0;
    for (let currentW = w - 1; currentW <= w + 1; currentW++) {
        for (let currentZ = z - 1; currentZ <= z + 1; currentZ++) {
            for (let currentY = y - 1; currentY <= y + 1; currentY++) {
                for (let currentX = x - 1; currentX <= x + 1; currentX++) {
                    if (!(currentW == w && currentZ == z && currentY == y && currentX == x)) {
                        if (state[currentW] != null &&
                            state[currentW][currentZ] != null &&
                            state[currentW][currentZ][currentY] != null &&
                            state[currentW][currentZ][currentY][currentX] == '#') {
                            counter++;
                        }
                    }
                }
            }
        }
    }
    return counter;
}

console.timeEnd('Time');