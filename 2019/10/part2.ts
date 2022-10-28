import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));

class Pos {
    x: number;
    y: number;
    numberOfDetectedAsteroids: number;
}

class Atan {
    x: number;
    y: number;
    quadrant: number;
    manhattanDistance: number;
    atan: number;
}

let possibleResults: Pos[] = [];
let posOfLaser: Pos;
let result = 0;
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') {
            possibleResults.push({ x: x, y: y, numberOfDetectedAsteroids: findNumberOfDetectedAsteroids(input, y, x) });
        }
    }
}

possibleResults.sort((a, b) => b.numberOfDetectedAsteroids - a.numberOfDetectedAsteroids);
posOfLaser = possibleResults[0];

let atans: Atan[] = getAtans(input, posOfLaser.x, posOfLaser.y);
atans.sort(compare);

let lastAtan: number;
for (let i = 1; i < 200; i++) {
    if (atans[0].atan == lastAtan) {
        atans.push(atans.shift());
        i--;
    } else {
        lastAtan = atans[0].atan;
        atans.shift();
    }
}
result = atans[0].x * 100 + atans[0].y;
console.log(result);

function compare(a, b): number {
    if (a.quadrant == b.quadrant) {
        if (a.atan == b.atan) {
            if (a.manhattanDistance < b.manhattanDistance) {
                return - 1;
            } else {
                return 1;
            }
        } else {
            if (b.atan < a.atan) {
                return -1;
            } else {
                return 1;
            }
        }
    } else {
        if (a.quadrant < b.quadrant) {
            return - 1;
        } else {
            return 1;
        }
    }
}

function getAtans(grid: string[][], laserPosX: number, laserPosY: number): Atan[] {
    let atans: Atan[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if ((x != laserPosX || y != laserPosY) && grid[y][x] == '#') {
                let quadrant = 0;
                if (x >= laserPosX && y < laserPosY) quadrant = 1;
                if (x > laserPosX && y >= laserPosY) quadrant = 2;
                if (x <= laserPosX && y >= laserPosY) quadrant = 3;
                if (x < laserPosX && y < laserPosY) quadrant = 4;

                let manhattanDistance = Math.abs(x - laserPosX) + Math.abs(y - laserPosY);
                atans.push({ x: x, y: y, quadrant: quadrant, manhattanDistance: manhattanDistance, atan: Math.atan((x - laserPosX) / (y - laserPosY)) });
            }
        }
    }
    return atans;
}

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