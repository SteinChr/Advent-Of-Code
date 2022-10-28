import { readFileSync } from 'fs';
console.time('Time');
let input = parseInt(readFileSync('./input.txt', 'utf-8'));
let highestPower = 0;
let resultX = 0;
let resultY = 0;
let resultSize = 0;
let grid: number[][] = createGrid();

for (let y = 1; y <= 298; y++) {
    for (let x = 1; x <= 298; x++) {
        let currentPower = 0;
        for (let s = 1; s <= Math.min(300 - x, 300 - y); s++) {
            currentPower += grid[y + s - 1][x + s - 1];
            for (let n = 1; n < s; n++) {
                currentPower += grid[y + n - 1][s + x - 1];
                currentPower += grid[s + y - 1][x + n - 1];
            }
            if (currentPower > highestPower) {
                highestPower = currentPower;
                resultX = x;
                resultY = y;
                resultSize = s;
            }
        }
    }
}
console.log(resultX + ',' + resultY + ',' + resultSize);

function calculatePowerLevel(y: number, x: number): number {
    return Math.floor((((x + 10) * y + input) * (x + 10) / 100) % 10) - 5;
}

function createGrid(): number[][] {
    let grid = [];
    for (let y = 0; y < 300; y++) {
        grid[y] = [];
        for (let x = 0; x < 300; x++) {
            grid[y][x] = calculatePowerLevel(y, x);
        }
    }
    return grid;
}

console.timeEnd('Time');