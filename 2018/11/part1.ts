import { readFileSync } from 'fs';
console.time('Time');
let input = parseInt(readFileSync('./input.txt', 'utf-8'));
let highestPower = 0;
let resultX = 0;
let resultY = 0;

for (let y = 1; y <= 298; y++) {
    for (let x = 1; x <= 298; x++) {
        let currentPower = 0;
        for (let i = 0; i < 3; i++) {
            for (let l = 0; l < 3; l++) {
                currentPower += calculatePowerLevel(y + i, x + l);
            }
        }
        if (currentPower > highestPower) {
            highestPower = currentPower;
            resultX = x;
            resultY = y;
        }
    }
}
console.log(resultX + ',' + resultY);

function calculatePowerLevel(y: number, x: number): number {
    return Math.floor((((x + 10) * y + input) * (x + 10) / 100) % 10) - 5;
}

console.timeEnd('Time');