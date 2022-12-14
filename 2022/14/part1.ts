import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' -> ').map(y => y.split(',').map(z => parseInt(z))));
let maxY: number = 0;
let grid: string[][] = new Array(250);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(1000).fill('.');
}
let result = 0;

grid[0][500] = '+';
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length - 1; l++) {
        if (input[i][l][1] > maxY) maxY = input[i][l][1];

        if (input[i][l][0] == input[i][l + 1][0]) {
            let dir = input[i][l][1] < input[i][l + 1][1] ? 1 : -1;
            for (let y = input[i][l][1]; dir == 1 ? y <= input[i][l + 1][1] : y >= input[i][l + 1][1]; y += dir) {
                grid[y][input[i][l][0]] = '#';
            }
        } else {
            let dir = input[i][l][0] < input[i][l + 1][0] ? 1 : -1;
            for (let x = input[i][l][0]; dir == 1 ? x <= input[i][l + 1][0] : x >= input[i][l + 1][0]; x += dir) {
                grid[input[i][l][1]][x] = '#';
            }
        }
    }
}

let notInVoid: boolean = true;
while (notInVoid) {
    let sandInMotion: boolean = true;
    let currentSand: { x: number, y: number } = { x: 500, y: 0 };
    while (sandInMotion) {
        if (currentSand.y == maxY) {
            notInVoid = false;
            break;
        } else if (grid[currentSand.y + 1][currentSand.x] == '.') {
            currentSand.y++;
        } else if (grid[currentSand.y + 1][currentSand.x - 1] == '.') {
            currentSand.y++;
            currentSand.x--;
        } else if (grid[currentSand.y + 1][currentSand.x + 1] == '.') {
            currentSand.y++;
            currentSand.x++;
        } else {
            grid[currentSand.y][currentSand.x] = 'o';
            result++;
            sandInMotion = false;
        }
    }
}

console.log(result);
console.timeEnd('Time');