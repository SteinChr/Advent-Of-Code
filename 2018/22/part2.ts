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

class Point {
    x: number;
    y: number;
    equipment: number; // 0 == neither, 1 == torch, 2 == climbing gear
    minutes: number;
}

let cave: Region[][] = [];
const extraSize = 100;
let maxXSize = target.x + extraSize;
let maxYSize = target.y + extraSize;
let result = Number.MAX_VALUE;

for (let y = 0; y <= target.y + extraSize; y++) {
    cave[y] = [];
    for (let x = 0; x <= target.x + extraSize; x++) {
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

let shortestPaths: number[][][] = new Array(3);
for (let d = 0; d < shortestPaths.length; d++) {
    shortestPaths[d] = new Array(maxYSize + 1);
    for (let y = 0; y < shortestPaths[d].length; y++) {
        shortestPaths[d][y] = new Array(maxXSize + 1).fill(Number.MAX_VALUE);
    }
}

let pointsToCheck: Point[] = [{ x: 0, y: 0, equipment: 1, minutes: 0 }];
for (let i = 0; pointsToCheck.length > 0; i++) {
    pointsToCheck.sort((a, b) => a.minutes - b.minutes);
    let currentPoint: Point | undefined = pointsToCheck.shift();
    if (currentPoint) {
        if (currentPoint.x == target.x && currentPoint.y == target.y) {
            if (currentPoint.equipment == 2) {
                currentPoint.equipment = 1;
                currentPoint.minutes += 7;
            }
            if (result > currentPoint.minutes) result = currentPoint.minutes;
        } else if (currentPoint.minutes < shortestPaths[currentPoint.equipment][currentPoint.y][currentPoint.x]) {
            shortestPaths[currentPoint.equipment][currentPoint.y][currentPoint.x] = currentPoint.minutes;
            if (currentPoint.x >= 1) { // left
                const possibleEquipments = getpossibleEquipments(currentPoint.x, currentPoint.y, currentPoint.x - 1, currentPoint.y, currentPoint.equipment);
                for (let possibleEqiupment of possibleEquipments) {
                    let addedMinutes = 1;
                    if (possibleEqiupment != currentPoint.equipment) addedMinutes += 7;
                    if (currentPoint.minutes + addedMinutes < shortestPaths[possibleEqiupment][currentPoint.y][currentPoint.x - 1]) {
                        if (!pointsToCheck.some(p => currentPoint && p.x == currentPoint.x - 1 && p.y == currentPoint.y && p.equipment == possibleEqiupment && p.minutes <= currentPoint.minutes + addedMinutes)) {
                            pointsToCheck = pointsToCheck.filter(p => currentPoint && (p.x != currentPoint.x - 1 || p.y != currentPoint.y || p.equipment != possibleEqiupment));
                            pointsToCheck.push({ x: currentPoint.x - 1, y: currentPoint.y, equipment: possibleEqiupment, minutes: currentPoint.minutes + addedMinutes });
                        }
                    }
                }
            }
            if (currentPoint.x < maxXSize) { // right
                const possibleEquipments = getpossibleEquipments(currentPoint.x, currentPoint.y, currentPoint.x + 1, currentPoint.y, currentPoint.equipment);
                for (let possibleEqiupment of possibleEquipments) {
                    let addedMinutes = 1;
                    if (possibleEqiupment != currentPoint.equipment) addedMinutes += 7;
                    if (currentPoint.minutes + addedMinutes < shortestPaths[possibleEqiupment][currentPoint.y][currentPoint.x + 1]) {
                        if (!pointsToCheck.some(p => currentPoint && p.x == currentPoint.x + 1 && p.y == currentPoint.y && p.equipment == possibleEqiupment && p.minutes <= currentPoint.minutes + addedMinutes)) {
                            pointsToCheck = pointsToCheck.filter(p => currentPoint && (p.x != currentPoint.x + 1 || p.y != currentPoint.y || p.equipment != possibleEqiupment));
                            pointsToCheck.push({ x: currentPoint.x + 1, y: currentPoint.y, equipment: possibleEqiupment, minutes: currentPoint.minutes + addedMinutes });
                        }
                    }
                }
            }
            if (currentPoint.y >= 1) { // up
                const possibleEquipments = getpossibleEquipments(currentPoint.x, currentPoint.y, currentPoint.x, currentPoint.y - 1, currentPoint.equipment);
                for (let possibleEqiupment of possibleEquipments) {
                    let addedMinutes = 1;
                    if (possibleEqiupment != currentPoint.equipment) addedMinutes += 7;
                    if (currentPoint.minutes + addedMinutes < shortestPaths[possibleEqiupment][currentPoint.y - 1][currentPoint.x]) {
                        if (!pointsToCheck.some(p => currentPoint && p.x == currentPoint.x && p.y == currentPoint.y - 1 && p.equipment == possibleEqiupment && p.minutes <= currentPoint.minutes + addedMinutes)) {
                            pointsToCheck = pointsToCheck.filter(p => currentPoint && (p.x != currentPoint.x || p.y != currentPoint.y - 1 || p.equipment != possibleEqiupment));
                            pointsToCheck.push({ x: currentPoint.x, y: currentPoint.y - 1, equipment: possibleEqiupment, minutes: currentPoint.minutes + addedMinutes });
                        }
                    }
                }
            }
            if (currentPoint.y < maxYSize) { // down
                const possibleEquipments = getpossibleEquipments(currentPoint.x, currentPoint.y, currentPoint.x, currentPoint.y + 1, currentPoint.equipment);
                for (let possibleEqiupment of possibleEquipments) {
                    let addedMinutes = 1;
                    if (possibleEqiupment != currentPoint.equipment) addedMinutes += 7;
                    if (currentPoint.minutes + addedMinutes < shortestPaths[possibleEqiupment][currentPoint.y + 1][currentPoint.x]) {
                        if (!pointsToCheck.some(p => currentPoint && p.x == currentPoint.x && p.y == currentPoint.y + 1 && p.equipment == possibleEqiupment && p.minutes <= currentPoint.minutes + addedMinutes)) {
                            pointsToCheck = pointsToCheck.filter(p => currentPoint && (p.x != currentPoint.x || p.y != currentPoint.y + 1 || p.equipment != possibleEqiupment));
                            pointsToCheck.push({ x: currentPoint.x, y: currentPoint.y + 1, equipment: possibleEqiupment, minutes: currentPoint.minutes + addedMinutes });
                        }
                    }
                }
            }
        }
    }
}

console.log(result);

function getpossibleEquipments(x1, y1, x2, y2, currentEquipment): number[] {
    let possibleEquipments: number[] = [];
    if (cave[y1][x1].type == 0) possibleEquipments = [1, 2];
    if (cave[y1][x1].type == 1) possibleEquipments = [0, 2];
    if (cave[y1][x1].type == 2) possibleEquipments = [0, 1];

    if (cave[y2][x2].type == 0) {
        let index = possibleEquipments.indexOf(0);
        if (index >= 0) possibleEquipments.splice(index, 1);
    }

    if (cave[y2][x2].type == 1) {
        let index = possibleEquipments.indexOf(1);
        if (index >= 0) possibleEquipments.splice(index, 1);
    }

    if (cave[y2][x2].type == 2) {
        let index = possibleEquipments.indexOf(2);
        if (index >= 0) possibleEquipments.splice(index, 1);
    }

    if (possibleEquipments.includes(currentEquipment)) return [currentEquipment];
    return possibleEquipments;
}

console.timeEnd('Time');