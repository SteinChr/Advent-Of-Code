import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let oxygenGeneratorRating = 0;
let co2ScrubberRating = 0;
let result = 0;
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < input[0].length; i++) {
        let zeroes = 0;
        let ones = 0;
        for (let l = 0; l < input.length; l++) {
            if (input[l].charAt(i) == '0') {
                zeroes++;
            } else {
                ones++;
            }
        }
        for (let l = input.length - 1; l >= 0; l--) {
            if (input.length > 1) {
                if (zeroes != ones) {
                    if ((zeroes > ones && j == 0) || (zeroes < ones && j == 1)) {
                        if (input[l].charAt(i) == '1') {
                            input.splice(l, 1);
                        }
                    } else {
                        if (input[l].charAt(i) == '0') {
                            input.splice(l, 1);
                        }
                    }
                } else {
                    if (j == 0) {
                        if (input[l].charAt(i) == '0') {
                            input.splice(l, 1);
                        }
                    } else {
                        if (input[l].charAt(i) == '1') {
                            input.splice(l, 1);
                        }
                    }
                }
            }
        }
    }
    if (j == 0) {
        oxygenGeneratorRating = parseInt(input[0], 2);
    } else {
        co2ScrubberRating = parseInt(input[0], 2);
    }
    input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
}
result = oxygenGeneratorRating * co2ScrubberRating;
console.log(result);
console.timeEnd('Time');