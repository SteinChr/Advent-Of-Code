import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

let doMul: boolean = true;

for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if (input[i].substr(l, 4) == 'do()') doMul = true;
        if (input[i].substr(l, 7) == 'don\'t()') doMul = false;

        if (doMul) {
            if (input[i].substr(l, 4) == 'mul(') {
                let possibleMulExpression: string = '';
                let corrupt: boolean = true;

                for (let j = l + 4; j < l + 12; j++) {
                    if (input[i][j] == ')') {
                        corrupt = false;
                        break;
                    }

                    if (!'0123456789,'.includes(input[i][j])) break;
                    possibleMulExpression += input[i][j];
                }

                if (!corrupt) {
                    let mulNumbers = possibleMulExpression.split(',').map(x => parseInt(x));
                    result += mulNumbers[0] * mulNumbers[1];
                }
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');