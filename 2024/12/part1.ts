import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
}

let directions: Pos[] = [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }];

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '-') {
            let currentType = input[y][x];
            let toCheck: Pos[] = [{ x: x, y: y }];
            input[y][x] = '.';

            let area = 1;
            let perimeter = 0;

            while (toCheck.length != 0) {
                let currentToCheck = toCheck.shift();

                for (let d = 0; d < directions.length; d++) {
                    if (currentToCheck.y + directions[d].y >= 0 && currentToCheck.y + directions[d].y < input.length && currentToCheck.x + directions[d].x >= 0 && currentToCheck.x + directions[d].x < input[y].length) {
                        if (input[currentToCheck.y + directions[d].y][currentToCheck.x + directions[d].x] == currentType) {
                            toCheck.push({ x: currentToCheck.x + directions[d].x, y: currentToCheck.y + directions[d].y });
                            input[currentToCheck.y + directions[d].y][currentToCheck.x + directions[d].x] = '.';
                            area++;
                        } else {
                            if (input[currentToCheck.y + directions[d].y][currentToCheck.x + directions[d].x] != '.') perimeter++;
                        }
                    } else {
                        perimeter++;
                    }
                }
            }

            for (let y1 = 0; y1 < input.length; y1++) {
                for (let x1 = 0; x1 < input[y1].length; x1++) {
                    if (input[y1][x1] == '.') input[y1][x1] = '-';
                }
            }

            result += area * perimeter;
        }
    }
}

console.log(result);
console.timeEnd('Time');