import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
}

let directions: Pos[] = [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }];

input.push(new Array(input[0].length).fill('-'));
input.unshift(new Array(input[0].length).fill('-'));

for (let y = 0; y < input.length; y++) {
    input[y].push('-');
    input[y].unshift('-');
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '-') {
            let currentType = input[y][x];
            let toCheck: Pos[] = [{ x: x, y: y }];
            input[y][x] = '.';

            let area = 1;
            let sides = 0;

            while (toCheck.length != 0) {
                let currentToCheck = toCheck.shift();

                for (let d = 0; d < directions.length; d++) {
                    if (input[currentToCheck.y + directions[d].y][currentToCheck.x + directions[d].x] == currentType) {
                        toCheck.push({ x: currentToCheck.x + directions[d].x, y: currentToCheck.y + directions[d].y });
                        input[currentToCheck.y + directions[d].y][currentToCheck.x + directions[d].x] = '.';
                        area++;
                    }
                }
            }

            for (let y1 = 0; y1 < input.length; y1++) {
                for (let x1 = 0; x1 < input[y1].length; x1++) {
                    if (input[y1][x1] == '.') {
                        for (let d1 = 0; d1 < directions.length; d1++) {
                            for (let d2 = d1 + 1; d2 < directions.length; d2++) {
                                if (directions[d1].x + directions[d2].x != 0) {
                                    if ((input[y1 + directions[d1].y][x1 + directions[d1].x] != '.' && input[y1 + directions[d2].y][x1 + directions[d2].x] != '.') || (input[y1 + directions[d1].y][x1 + directions[d1].x] == '.' && input[y1 + directions[d2].y][x1 + directions[d2].x] == '.' && input[y1 + directions[d1].y + directions[d2].y][x1 + directions[d1].x + directions[d2].x] != '.')) {
                                        sides++;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (let y1 = 0; y1 < input.length; y1++) {
                for (let x1 = 0; x1 < input[y1].length; x1++) {
                    if (input[y1][x1] == '.') input[y1][x1] = '-';
                }
            }

            result += area * sides;
        }
    }
}

console.log(result);
console.timeEnd('Time');