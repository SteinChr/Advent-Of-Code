import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));

class Coordinate {
    x: number;
    y: number;
    z: number;
}

let coordinates: Set<number> = new Set();
for (let i = 0; i < input.length; i++) {
    coordinates.add(input[i][0] * 10000 + input[i][1] * 100 + input[i][2] + 10101);
}

let previousInvertedCubes: Set<number> = new Set();
let currentInvertedCubes: Set<number> = new Set();
let newInvertedCubes: Set<number> = new Set();
newInvertedCubes.add(0);
const movements: number[] = [10000, -10000, 100, -100, 1, -1];
let result = 0;

let minX: number = Math.min(...Array.from(coordinates.values()).map(x => Math.floor(x / 10000))) - 1;
let maxX: number = Math.max(...Array.from(coordinates.values()).map(x => Math.floor(x / 10000))) + 1;
let minY: number = Math.min(...Array.from(coordinates.values()).map(x => Math.floor(x / 100) % 100)) - 1;
let maxY: number = Math.max(...Array.from(coordinates.values()).map(x => Math.floor(x / 100) % 100)) + 1;
let minZ: number = Math.min(...Array.from(coordinates.values()).map(x => x % 100)) - 1;
let maxZ: number = Math.max(...Array.from(coordinates.values()).map(x => x % 100)) + 1;

do {
    for (const newInvertedCube of newInvertedCubes) {
        currentInvertedCubes.add(newInvertedCube);
    }
    previousInvertedCubes = newInvertedCubes;
    newInvertedCubes = new Set();
    for (const previousInvertedCube of previousInvertedCubes) {
        for (const movement of movements) {
            let toCheckNumber: number = previousInvertedCube + movement;
            let toCheckCoordinate: Coordinate = toCoordinate(toCheckNumber);
            if (toCheckCoordinate.x >= minX && toCheckCoordinate.x <= maxX && toCheckCoordinate.y >= minY && toCheckCoordinate.y <= maxY && toCheckCoordinate.z >= minZ && toCheckCoordinate.z <= maxZ &&
                !coordinates.has(toCheckNumber) && !currentInvertedCubes.has(toCheckNumber)) {
                newInvertedCubes.add(toCheckNumber);
            }
        }
    }
} while (newInvertedCubes.size > 0)

result = Array.from(currentInvertedCubes.values()).reduce((previous, current) => previous + movements.filter(m => coordinates.has(current + m)).length, 0);
console.log(result);

function toCoordinate(n: number): Coordinate {
    return { x: Math.floor(n / 10000), y: Math.floor(n / 100) % 100, z: n % 100 };
}

console.timeEnd('Time');