import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));

console.log(doCycle(doCycle(1000000000, true), false));

function doCycle(numberOfCycles: number, searchForRepetition: boolean): number {
    input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
    let oldGrids: string[] = [];

    for (let c = 0; c < numberOfCycles; c++) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == 'O') {
                    for (let currentY = y - 1; currentY >= 0 && input[currentY][x] == '.'; currentY--) {
                        input[currentY + 1][x] = '.';
                        input[currentY][x] = 'O';
                    }
                }
            }
        }

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == 'O') {
                    for (let currentX = x - 1; currentX >= 0 && input[y][currentX] == '.'; currentX--) {
                        input[y][currentX + 1] = '.';
                        input[y][currentX] = 'O';
                    }
                }
            }
        }

        for (let y = input.length - 1; y >= 0; y--) {
            for (let x = input[y].length - 1; x >= 0; x--) {
                if (input[y][x] == 'O') {
                    for (let currentY = y + 1; currentY < input.length && input[currentY][x] == '.'; currentY++) {
                        input[currentY - 1][x] = '.';
                        input[currentY][x] = 'O';
                    }
                }
            }
        }

        for (let y = input.length - 1; y >= 0; y--) {
            for (let x = input[y].length - 1; x >= 0; x--) {
                if (input[y][x] == 'O') {
                    for (let currentX = x + 1; currentX < input[y].length && input[y][currentX] == '.'; currentX++) {
                        input[y][currentX - 1] = '.';
                        input[y][currentX] = 'O';
                    }
                }
            }
        }

        if (searchForRepetition) {
            let gridString = input.map(x => x.join('')).join('');

            if (oldGrids.includes(gridString)) {
                let oldRepeat = oldGrids.indexOf(gridString);
                let newRepeat = c;
                let repeatValue = oldRepeat;

                for (let r = oldRepeat; r < 1000000000; r += newRepeat - oldRepeat) {
                    repeatValue = r;
                }

                return 1000000000 - repeatValue + oldRepeat;
            }
            
            oldGrids.push(gridString);
        }
    }

    let result = 0;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'O') result += input.length - y;
        }
    }

    return result;
}

console.timeEnd('Time');