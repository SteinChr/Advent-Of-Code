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

let result = ranges.indexOf(Math.min(...ranges));
console.log(result);

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

console.timeEnd('Time');