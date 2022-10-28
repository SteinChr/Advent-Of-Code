import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;
let output = new Array(input.length);
let originalInput = new Array(input.length);
for (let i = 0; i < input.length; i++) {
    output[i] = input[i].slice();
    originalInput[i] = input[i].slice();
}
for (let step = 1; result == 0; step++) {
    for (let i = 0; i < 2; i++) {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == '>' && i == 0) {
                    if (x + 1 < input[y].length && input[y][x + 1] == '.') {
                        output[y][x] = '.';
                        output[y][x + 1] = '>';
                    } else if (x + 1 >= input[y].length && input[y][0] == '.') {
                        output[y][x] = '.';
                        output[y][0] = '>';
                    }
                } else if (input[y][x] == 'v' && i == 1) {
                    if (y + 1 < input.length && input[y + 1][x] == '.') {
                        output[y][x] = '.';
                        output[y + 1][x] = 'v'
                    } else if (y + 1 >= input.length && input[0][x] == '.') {
                        output[y][x] = '.';
                        output[0][x] = 'v';
                    }
                }
            }
        }
        if (i == 1) {
            let count = 0;
            for (let l = 0; l < originalInput.length; l++) {
                if (originalInput[l].join('') == output[l].join('')) count++;
            }
            if (count == originalInput.length) result = step;
        }

        for (let l = 0; l < input.length; l++) {
            input[l] = output[l].slice();
        }
        if (i == 1) {
            for (let l = 0; l < input.length; l++) {
                originalInput[l] = input[l].slice();
            }
        }
    }
}
console.log(result);
console.timeEnd('Time');