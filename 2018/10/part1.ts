import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/=<\s|=<|,\s|>/));
class Light {
    posX: number;
    posY: number;
    velocityX: number;
    velocityY: number;
}

const addAmount = 60000;
let lights: Light[] = createLights(input);

let ranges = [getRange(lights)];
processLights(20000, true);

let necessarySeconds = ranges.indexOf(Math.min(...ranges));
lights = createLights(input);
processLights(necessarySeconds, false);

let minMaxX = getXMinAndMax(lights);
let minMaxY = getYMinAndMax(lights);
for (let i = 0; i < lights.length; i++) {
    lights[i].posX -= minMaxX[1];
    lights[i].posY -= minMaxY[1];
}

let grid = createGrid(lights, minMaxY[0] - minMaxY[1] + 1, minMaxX[0] - minMaxX[1] + 1);
displayGrid(grid);

function createLights(input: string[][]): Light[] {
    let lights: Light[] = [];
    for (let i = 0; i < input.length; i++) {
        lights.push({ posX: parseInt(input[i][1]) + addAmount, posY: parseInt(input[i][2]) + addAmount, velocityX: parseInt(input[i][4]), velocityY: parseInt(input[i][5]) });
    }
    return lights;
}

function processLights(seconds: number, rangesNecessary: boolean) {
    for (let s = 0; s < seconds; s++) {
        for (let i = 0; i < lights.length; i++) {
            lights[i].posX += lights[i].velocityX;
            lights[i].posY += lights[i].velocityY;
        }
        if (rangesNecessary) ranges.push(getRange(lights));
    }
}

function getRange(lights: Light[]) {
    let arr = getXMinAndMax(lights);
    return arr[0] - arr[1];
}

function getXMinAndMax(lights: Light[]) {
    let posXArray = new Array(lights.length);
    for (let i = 0; i < posXArray.length; i++) {
        posXArray[i] = lights[i].posX;
    }
    return [Math.max(...posXArray), Math.min(...posXArray)];
}

function getYMinAndMax(lights: Light[]) {
    let posYArray = new Array(lights.length);
    for (let i = 0; i < posYArray.length; i++) {
        posYArray[i] = lights[i].posY;
    }
    return [Math.max(...posYArray), Math.min(...posYArray)];
}

function createGrid(lights: Light[], gridSizeVertical: number, gridSizeHorizontal: number): string[][] {
    let grid = new Array(gridSizeVertical);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(gridSizeHorizontal);
        for (let l = 0; l < grid[i].length; l++) {
            grid[i][l] = '.';
        }
    }

    for (let i = 0; i < lights.length; i++) {
        grid[lights[i].posY][lights[i].posX] = '#';
    }
    return grid;
}

function displayGrid(grid: string[][]) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }
}

console.timeEnd('Time');