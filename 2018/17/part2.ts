import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,\s|=|\.\./));
let minAndMax = findMinAndMax();
let minX = minAndMax[0];
let maxX = minAndMax[1];
let minY = minAndMax[2];
let maxY = minAndMax[3];
let result = 0;

let grid: string[][] = new Array(maxY - minY + 1);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(maxX - minX + 1).fill('.');
}
createGrid();

interface Coordinates {
    x: number;
    y: number;
}

let currentWaterX = 500 - minX;
let currentWaterY = 0;

grid[currentWaterY][currentWaterX] = '|';
currentWaterY++;
let coordinatesToCheck: Coordinates[] = [{ x: currentWaterX, y: currentWaterY }];

for (let i = 0; coordinatesToCheck.length > 0; i++) {
    currentWaterX = coordinatesToCheck[0].x;
    currentWaterY = coordinatesToCheck[0].y;
    coordinatesToCheck.shift();

    if (grid[currentWaterY][currentWaterX] != '#' && grid[currentWaterY][currentWaterX] != '~' && currentWaterY < grid.length - 1) {

        if (currentWaterY > 0 && grid[currentWaterY - 1][currentWaterX] == '|' && grid[currentWaterY][currentWaterX] == '.') {
            grid[currentWaterY][currentWaterX] = '|';
            addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY);
        }
        if (checkLeftAndRight(currentWaterX, currentWaterY) && grid[currentWaterY][currentWaterX] == '|') {
            grid[currentWaterY][currentWaterX] = '~';
            addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY);
        }
        if (currentWaterY > 0 && (grid[currentWaterY - 1][currentWaterX] == '~' || grid[currentWaterY][currentWaterX - 1] == '~' || grid[currentWaterY][currentWaterX + 1] == '~') && (grid[currentWaterY][currentWaterX] == '.' || grid[currentWaterY][currentWaterX] == '|')) {
            grid[currentWaterY][currentWaterX] = '~';
            addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY);
        }
        if (grid[currentWaterY][currentWaterX] == '|' && (grid[currentWaterY + 1][currentWaterX] == '#' || grid[currentWaterY + 1][currentWaterX] == '~')) {
            if (grid[currentWaterY][currentWaterX + 1] == '.') {
                grid[currentWaterY][currentWaterX + 1] = '|';
                addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY);
                addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY + 1);
            }
            if (grid[currentWaterY][currentWaterX - 1] == '.') {
                grid[currentWaterY][currentWaterX - 1] = '|';
                addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY);
                addCorrdinatesThatHaveToBeChecked(currentWaterX, currentWaterY + 1);
            }
        }
    }
}

grid.shift();

result = countWater();
console.log(result);

function countWater(): number {
    let water = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '~') water++;
        }
    }
    return water;
}

function addCorrdinatesThatHaveToBeChecked(x: number, y: number) {
    if (x < grid[0].length - 1 && !checkIfCoordinateIsAlreadyInArray(x + 1, y)) coordinatesToCheck.unshift({ x: x + 1, y: y });
    if (x > 0 && !checkIfCoordinateIsAlreadyInArray(x - 1, y)) coordinatesToCheck.unshift({ x: x - 1, y: y });
    if (y < grid.length - 1 && !checkIfCoordinateIsAlreadyInArray(x, y + 1)) coordinatesToCheck.push({ x: x, y: y + 1 });
    if (y > 0 && !checkIfCoordinateIsAlreadyInArray(x, y - 1)) coordinatesToCheck.push({ x: x, y: y - 1 });
}

function checkIfCoordinateIsAlreadyInArray(x: number, y: number): boolean {
    for (let i = 0; i < coordinatesToCheck.length; i++) {
        if (coordinatesToCheck[i].x == x && coordinatesToCheck[i].y == y) return true;
    }
    return false;
}

function checkLeftAndRight(x: number, y: number): boolean {
    if (y > grid.length - 2) return false;
    let possible: boolean = true;
    let currentX = x;

    while (currentX >= 0 && grid[y][currentX] != '#') {
        if ((grid[y + 1][currentX] == '#' || grid[y + 1][currentX] == '~') && grid[y][currentX] != '#') {
            currentX--;
        } else {
            possible = false;
            break;
        }
    }

    currentX = x;

    while (currentX < grid[0].length && grid[y][currentX] != '#') {
        if ((grid[y + 1][currentX] == '#' || grid[y + 1][currentX] == '~') && grid[y][currentX] != '#') {
            currentX++;
        } else {
            possible = false;
            break;
        }
    }

    return possible;
}

function createGrid() {
    for (let i = 0; i < input.length; i++) {
        if (input[i][0] == 'x') {
            for (let l = parseInt(input[i][3]) - minY; l < parseInt(input[i][4]) - minY + 1; l++) {
                grid[l][parseInt(input[i][1]) - minX] = '#';
            }
        } else {
            for (let l = parseInt(input[i][3]) - minX; l < parseInt(input[i][4]) - minX + 1; l++) {
                grid[parseInt(input[i][1]) - minY][l] = '#';
            }
        }
    }
    grid.unshift(new Array(maxX - minX + 1).fill('.'));
    grid.push(new Array(maxX - minX + 1).fill('.'));
}

function findMinAndMax(): number[] {
    let minY = Number.MAX_VALUE;
    let maxY = 0;
    let minX = Number.MAX_VALUE;
    let maxX = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i][0] == 'y') {
            if (parseInt(input[i][1]) < minY) minY = parseInt(input[i][1]);
            if (parseInt(input[i][1]) > maxY) maxY = parseInt(input[i][1]);
            if (parseInt(input[i][3]) < minX) minX = parseInt(input[i][3]);
            if (parseInt(input[i][4]) > maxX) maxX = parseInt(input[i][4]);
        } else {
            if (parseInt(input[i][3]) < minY) minY = parseInt(input[i][3]);
            if (parseInt(input[i][4]) > maxY) maxY = parseInt(input[i][4]);
            if (parseInt(input[i][1]) < minX) minX = parseInt(input[i][1]);
            if (parseInt(input[i][1]) > maxX) maxX = parseInt(input[i][1]);
        }
    }
    return [minX - 5, maxX + 5, minY, maxY];
}

console.timeEnd('Time');