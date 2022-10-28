import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let possibleResults = [];
let result = 0;
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') {
            possibleResults.push(findNumberOfDetectedAsteroids(input, y, x));
        }
    }
}
result = Math.max(...possibleResults);
console.log(result);

function findNumberOfDetectedAsteroids(grid: string[][], posY: number, posX: number): number {
    let angles = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if ((x != posX || y != posY) && grid[y][x] == '#') {
                let currentAngle = Math.atan((x - posX) / (y - posY));
                if (y - posY < 0) currentAngle += 10;
                angles.push(currentAngle);
            }
        }
    }
    let distinctAngles = [];
    for (let i = 0; i < angles.length; i++) {
        if (!distinctAngles.includes(angles[i])) distinctAngles.push(angles[i]);
    }
    return distinctAngles.length;
}

console.timeEnd('Time');