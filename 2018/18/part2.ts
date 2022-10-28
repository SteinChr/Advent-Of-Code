import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let woodedAcres = 0;
let lumberyards = 0;
let result = 0;

let previousStates: string[] = [];
let startOfRepetition: number = 0;
let lengthOfRepetition: number = 0;

doSteps(1000, true);
let indexForResult = ((1000000000 - startOfRepetition) % lengthOfRepetition) + startOfRepetition;
input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
doSteps(indexForResult, false);

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '|') woodedAcres++;
        if (input[y][x] == '#') lumberyards++;
    }
}

result = woodedAcres * lumberyards;
console.log(result);

function doSteps(numberOfSteps: number, checkForRepetition: boolean) {
    for (let i = 0; i < numberOfSteps; i++) {
        if (checkForRepetition) {
            startOfRepetition = checkPrevious(previousStates, input.join(','));
            if (startOfRepetition != -1) {
                lengthOfRepetition = i - startOfRepetition;
                break;
            }
            previousStates.push(input.join(','));
        }

        let startGrid = new Array(input.length);
        for (let l = 0; l < startGrid.length; l++) {
            startGrid[l] = input[l].slice();
        }

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (startGrid[y][x] == '.') {
                    if (countAdjacent(x, y, '|', startGrid) >= 3) input[y][x] = '|';
                } else if (startGrid[y][x] == '|') {
                    if (countAdjacent(x, y, '#', startGrid) >= 3) input[y][x] = '#';
                } else if (startGrid[y][x] == '#') {
                    if (!(countAdjacent(x, y, '#', startGrid) >= 1 && countAdjacent(x, y, '|', startGrid) >= 1)) input[y][x] = '.';
                }
            }
        }
    }
}

function checkPrevious(previous: string[], current: string): number {
    for (let i = 0; i < previous.length; i++) {
        if (previous[i] == current) return i;
    }
    return -1;
}

function countAdjacent(x: number, y: number, target: string, grid: string[][]): number {
    let matching: number = 0;

    if (y > 0) {
        if (grid[y - 1][x] == target) matching++;
        if (x > 0 && grid[y - 1][x - 1] == target) matching++;
        if (x < grid[y].length - 1 && grid[y - 1][x + 1] == target) matching++;
    }

    if (x > 0 && grid[y][x - 1] == target) matching++;
    if (x < grid[y].length && grid[y][x + 1] == target) matching++;

    if (y < grid.length - 1) {
        if (grid[y + 1][x] == target) matching++;
        if (x > 0 && grid[y + 1][x - 1] == target) matching++;
        if (x < grid[y].length - 1 && grid[y + 1][x + 1] == target) matching++;
    }

    return matching;
}

console.timeEnd('Time');