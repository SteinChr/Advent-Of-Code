import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

class Gear {
    adjacentNumbers: number;
    gearRatio: number;
}

let gears = new Map<string, Gear>();

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (!isNaN(parseInt(input[y][x]))) {
            let numberOfDigits = 1;

            if (x < input[y].length - 1 && !isNaN(parseInt(input[y][x + 1]))) numberOfDigits++;
            if (x < input[y].length - 2 && !isNaN(parseInt(input[y][x + 2]))) numberOfDigits++;

            let currentNumber = parseInt(input[y].substr(x, numberOfDigits));
            checkForGear(x, y, numberOfDigits, currentNumber);

            x += numberOfDigits - 1;
        }
    }
}

let gearRatios = Array.from(gears.values());
for (let i = 0; i < gearRatios.length; i++) {
    if (gearRatios[i].adjacentNumbers == 2) result += gearRatios[i].gearRatio;
}

console.log(result);

function checkForGear(x: number, y: number, numberOfDigits: number, currentNumber: number) {
    for (let yChange = -1; yChange <= 1; yChange++) {
        for (let xChange = -1; xChange <= numberOfDigits; xChange++) {
            if (x + xChange > 0 && x + xChange < input[0].length - 1 && y + yChange > 0 && y + yChange < input.length - 1 && input[y + yChange][x + xChange] == '*') {
                let coordinates: string = (x + xChange).toString() + '-' + (y + yChange).toString();
                let oldGear: Gear = gears.get(coordinates);

                if (oldGear) {
                    gears.set(coordinates, { adjacentNumbers: oldGear.adjacentNumbers + 1, gearRatio: oldGear.gearRatio * currentNumber});
                } else {
                    gears.set(coordinates, { adjacentNumbers: 1, gearRatio: currentNumber });
                }
            }
        }
    }
}

console.timeEnd('Time');