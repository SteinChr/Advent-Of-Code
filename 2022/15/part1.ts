import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,|:|=|\s/));
let result = 0;

const rowToSearch = 2000000;

class SensorBeaconPair {
    sensorX: number;
    sensorY: number;
    beaconX: number;
    beaconY: number;
}

let sensorsAndBeacons: SensorBeaconPair[] = [];
for (let i = 0; i < input.length; i++) {
    sensorsAndBeacons.push({ sensorX: parseInt(input[i][3]), sensorY: parseInt(input[i][6]), beaconX: parseInt(input[i][13]), beaconY: parseInt(input[i][16]) });
}

let minX: number;
let maxX: number;
getMinAndMaxX();
let possibleBeaconPositions = new Array(Math.abs(minX) + Math.abs(maxX)).fill(true);

let beaconsXInRowToSearch = new Set<number>();
for (let i = 0; i < sensorsAndBeacons.length; i++) {
    if (sensorsAndBeacons[i].beaconY == rowToSearch) beaconsXInRowToSearch.add(sensorsAndBeacons[i].beaconX);
}

for (let i = 0; i < sensorsAndBeacons.length; i++) {
    let currentManhattanDistance = manhattanDistance(sensorsAndBeacons[i].sensorX, sensorsAndBeacons[i].sensorY, sensorsAndBeacons[i].beaconX, sensorsAndBeacons[i].beaconY);
    for (let x = 0; x < possibleBeaconPositions.length; x++) {
        if (!beaconsXInRowToSearch.has(x) && possibleBeaconPositions[x] && manhattanDistance(minX + x, rowToSearch, sensorsAndBeacons[i].sensorX, sensorsAndBeacons[i].sensorY) <= currentManhattanDistance) {
            possibleBeaconPositions[x] = false;
            result++;
        }
    }
}

console.log(result);

function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getMinAndMaxX() {
    let maxXSensor = sensorsAndBeacons.reduce((previous, currrent) => {
        return previous.sensorX > currrent.sensorX ? previous : currrent;
    }).sensorX;
    let maxXBeacon = sensorsAndBeacons.reduce((previous, currrent) => {
        return previous.beaconX > currrent.beaconX ? previous : currrent;
    }).beaconX;
    maxX = Math.max(maxXSensor, maxXBeacon) + 500000;

    let minXSensor = sensorsAndBeacons.reduce((previous, currrent) => {
        return previous.sensorX < currrent.sensorX ? previous : currrent;
    }).sensorX;
    let minXBeacon = sensorsAndBeacons.reduce((previous, currrent) => {
        return previous.beaconX < currrent.beaconX ? previous : currrent;
    }).beaconX;
    minX = Math.min(minXSensor, minXBeacon) - 500000;
}

console.timeEnd('Time');