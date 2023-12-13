import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').map(y => y.split('')));
let result = 0;

for (let p = 0; p < input.length; p++) {
    let mirrorFound: boolean = false;

    for (let y = 0; y < input[p].length - 1 && !mirrorFound; y++) {
        let horizontalMirror: boolean = true;

        distanceLoop: for (let d = 0; true; d++) {
            for (let x = 0; x < input[p][y].length; x++) {
                if (y - d < 0 || y + d + 1 >= input[p].length) break distanceLoop;
                if (input[p][y - d][x] != input[p][y + d + 1][x]) {
                    horizontalMirror = false;
                    break distanceLoop;
                }
            }
        }

        if (horizontalMirror) {
            result += (y + 1) * 100;
            mirrorFound = true;
        }
    }

    for (let x = 0; x < input[p][0].length - 1 && !mirrorFound; x++) {
        let verticalMirror: boolean = true;

        distanceLoop: for (let d = 0; true; d++) {
            for (let y = 0; y < input[p].length; y++) {
                if (x - d < 0 || x + d + 1 >= input[p][0].length) break distanceLoop;
                if (input[p][y][x - d] != input[p][y][x + d + 1]) {
                    verticalMirror = false;
                    break distanceLoop;
                }
            }
        }

        if (verticalMirror) {
            result += x + 1;
            mirrorFound = true;
        }
    }
}

console.log(result);
console.timeEnd('Time');