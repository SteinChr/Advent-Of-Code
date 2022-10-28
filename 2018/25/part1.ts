import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

class Point {
    x: number;
    y: number;
    z: number;
    t: number;
    constellation: number;
}

let allPoints: Point[] = [];
for (let i = 0; i < input.length; i++) {
    let currentCoordinate = input[i].split(',');
    allPoints.push({ x: parseInt(currentCoordinate[0]), y: parseInt(currentCoordinate[1]), z: parseInt(currentCoordinate[2]), t: parseInt(currentCoordinate[3]), constellation: -1 });
}

let constellations: Point[][] = [];

for (let constellationIndex = 0; allPoints.length > 0; constellationIndex++) {
    allPoints[0].constellation = constellationIndex;
    constellations[constellationIndex] = [allPoints[0]];
    allPoints.splice(0, 1);
    let oldConstellationSize = 0;
    while (constellations[constellationIndex].length > oldConstellationSize) {
        oldConstellationSize = constellations[constellationIndex].length;
        for (let p = 0; p < allPoints.length; p++) {
            for (let c = 0; c < constellations[constellationIndex].length; c++) {
                if (manhattanDistance(constellations[constellationIndex][c].x, constellations[constellationIndex][c].y, constellations[constellationIndex][c].z, constellations[constellationIndex][c].t, allPoints[p].x, allPoints[p].y, allPoints[p].z, allPoints[p].t) <= 3) {
                    allPoints[p].constellation = constellationIndex;
                    constellations[constellationIndex].push(allPoints[p]);
                    allPoints.splice(p, 1);
                    p--;
                    break;
                }
            }
        }
    }
}

result = constellations.length;
console.log(result);

function manhattanDistance(x1, y1, z1, t1, x2, y2, z2, t2): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2) + Math.abs(t1 - t2);
}

console.timeEnd('Time');