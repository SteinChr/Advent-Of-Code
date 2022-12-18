import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));

class Coordinate {
    x: number;
    y: number;
    z: number;
}

let coordinates: Coordinate[] = []
for (let i = 0; i < input.length; i++) {
    coordinates.push({ x: input[i][0], y: input[i][1], z: input[i][2] });
}
let result = coordinates.length * 6;

for (let i = 0; i < coordinates.length - 1; i++) {
    for (let l = i + 1; l < coordinates.length; l++) {
        if (coordinates[i].x - 1 == coordinates[l].x && coordinates[i].y == coordinates[l].y && coordinates[i].z == coordinates[l].z) result -= 2;
        if (coordinates[i].x + 1 == coordinates[l].x && coordinates[i].y == coordinates[l].y && coordinates[i].z == coordinates[l].z) result -= 2;
        if (coordinates[i].y - 1 == coordinates[l].y && coordinates[i].x == coordinates[l].x && coordinates[i].z == coordinates[l].z) result -= 2;
        if (coordinates[i].y + 1 == coordinates[l].y && coordinates[i].x == coordinates[l].x && coordinates[i].z == coordinates[l].z) result -= 2;
        if (coordinates[i].z - 1 == coordinates[l].z && coordinates[i].x == coordinates[l].x && coordinates[i].y == coordinates[l].y) result -= 2;
        if (coordinates[i].z + 1 == coordinates[l].z && coordinates[i].x == coordinates[l].x && coordinates[i].y == coordinates[l].y) result -= 2;
    }
}

console.log(result);
console.timeEnd('Time');