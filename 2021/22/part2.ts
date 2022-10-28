import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\sx=|\..|y=|z=/));
input = input.map(x => x.map(y => y.replace('on', '1')));
input = input.map(x => x.map(y => y.replace('off', '0')));
let cubes = input.map(x => x.map(y => parseInt(y))).reverse();
let result = 0;

for (let c = 0; c < cubes.length; c++) {
    if (cubes[c][0] == 1) {
        result += getVolume(cubes[c]) - getVolumeOfIntersections(cubes[c], cubes.slice(0, c));
    }
}

console.log(result);

function getVolume(cuboid: number[]) {
    return (cuboid[2] - cuboid[1] + 1) * (cuboid[4] - cuboid[3] + 1) * (cuboid[6] - cuboid[5] + 1);
}

function getIntersection(c1: number[], c2: number[]): number {
    let vol = 1;
    for (let i = 1; i <= 5; i += 2) {
        let currentVol = Math.min(c1[i + 1], c2[i + 1]) - Math.max(c1[i], c2[i]) + 1;
        if (currentVol >= 0) {
            vol *= Math.min(c1[i + 1], c2[i + 1]) - Math.max(c1[i], c2[i]) + 1;
        } else {
            vol = 0;
        }
    }
    return vol;
}

function getVolumeOfIntersections(cube: number[], previousCubes: number[][]): number {
    let volume = 0;
    for (let i = 0; i < previousCubes.length; i++) {
        let intersection = getIntersection(cube, previousCubes[i]);
        if (intersection != 0) {
            volume += intersection - getVolumeOfIntersections(getIntersectionCube(cube, previousCubes[i]), previousCubes.slice(i + 1));
        }
    }
    return volume;
}

function getIntersectionCube(c1: number[], c2: number[]): number[] {
    return [c1[0], Math.max(c1[1], c2[1]), Math.min(c1[2], c2[2]), Math.max(c1[3], c2[3]), Math.min(c1[4], c2[4]), Math.max(c1[5], c2[5]), Math.min(c1[6], c2[6])];
}

console.timeEnd('Time');