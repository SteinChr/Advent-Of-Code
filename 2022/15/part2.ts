import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,|:|=|\s/));
let result = 0;

const maxBound = 4000000;

class SensorBeaconPair {
    sensorX: number;
    sensorY: number;
    beaconX: number;
    beaconY: number;
    distance: number;
}

let sensorsAndBeacons: SensorBeaconPair[] = [];
for (let i = 0; i < input.length; i++) {
    let currentPair = { sensorX: parseInt(input[i][3]), sensorY: parseInt(input[i][6]), beaconX: parseInt(input[i][13]), beaconY: parseInt(input[i][16]), distance: -1 };
    currentPair.distance = manhattanDistance(currentPair.sensorX, currentPair.sensorY, currentPair.beaconX, currentPair.beaconY);
    sensorsAndBeacons.push(currentPair);
}

outerLoop: for (let i = 0; i < sensorsAndBeacons.length; i++) {
    let currentX: number = sensorsAndBeacons[i].sensorX;
    let currentY: number = sensorsAndBeacons[i].sensorY + sensorsAndBeacons[i].distance + 1;
    let directions: number[][] = [[1, -1], [-1, -1], [-1, 1], [1, 1]];
    for (let dix = 0; dix < directions.length; dix++) {
        const d = directions[dix];
        while (dix % 2 == 0 ? currentY != sensorsAndBeacons[i].sensorY : currentX != sensorsAndBeacons[i].sensorX) {
            let covered: boolean = false;
            if (currentX >= 0 && currentX <= maxBound && currentY >= 0 && currentY <= maxBound) {
                for (let l = 0; l < sensorsAndBeacons.length; l++) {
                    if (manhattanDistance(currentX, currentY, sensorsAndBeacons[l].sensorX, sensorsAndBeacons[l].sensorY) <= sensorsAndBeacons[l].distance) {
                        covered = true;
                        if (currentX == 22 && currentY == 7) console.log('Point', currentX, currentY, currentX * 4000000 + currentY, sensorsAndBeacons[l]);
                        break;
                    }
                }
                if (!covered) {
                    result = currentX * 4000000 + currentY;
                    break outerLoop;
                }
            }
            currentX += d[0];
            currentY += d[1];
        }
    }
}

console.log(result);

function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

console.timeEnd('Time');