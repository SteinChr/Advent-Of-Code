import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let differenceValid: boolean = true;
    let incdec: number = 0; // 0=initial state, 1=increasing, 2=decreasing, 3=unsafe

    for (let l = 0; l < input[i].length - 1; l++) {
        if (Math.abs(input[i][l] - input[i][l + 1]) > 3) differenceValid = false;
        
        if (input[i][l] < input[i][l + 1]) {
            if (incdec == 0) incdec = 1;
            if (incdec == 2) incdec = 3;
        } else if (input[i][l] > input[i][l + 1]) {
            if (incdec == 0) incdec = 2;
            if (incdec == 1) incdec = 3;
        } else {
            incdec = 3;
        }
    }

    if (differenceValid && incdec != 3) result++;
}

console.log(result);
console.timeEnd('Time');