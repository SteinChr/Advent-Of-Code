import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\r\n|\s|,/);
let depth: number = parseInt(input[1]);
let target: { x: number, y: number } = { x: parseInt(input[3]), y: parseInt(input[4]) };

class Region {
    type: number;
    geologicIndex: number;
    erosionLevel: number;
}

let cave: Region[][] = [];
let result = 0;

for (let y = 0; y <= target.y; y++) {
    cave[y] = [];
    for (let x = 0; x <= target.x; x++) {
        let currentType: number;
        let currentGeologicIndex: number;
        let currentErosionLevel: number;

        if ((x == 0 && y == 0) || (x == target.x && y == target.y)) {
            currentGeologicIndex = 0;
        } else if (y == 0) {
            currentGeologicIndex = x * 16807;
        } else if (x == 0) {
            currentGeologicIndex = y * 48271;
        } else {
            currentGeologicIndex = cave[y][x - 1].erosionLevel * cave[y - 1][x].erosionLevel;
        }

        currentErosionLevel = (currentGeologicIndex + depth) % 20183;
        currentType = currentErosionLevel % 3;

        cave[y][x] = { type: currentType, geologicIndex: currentGeologicIndex, erosionLevel: currentErosionLevel };
    }
}

for (let y = 0; y < cave.length; y++) {
    for (let x = 0; x < cave[y].length; x++) {
        result += cave[y][x].type;
    }
}

console.log(result);
console.timeEnd('Time');