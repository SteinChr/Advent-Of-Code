import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').reverse());
let decimalResult = 0;
let result = '';

for (let i = 0; i < input.length; i++) {
    let currentPower = 1;
    let decimal = 0;
    for (let l = 0; l < input[i].length; l++) {
        if (input[i][l] == '2' || input[i][l] == '1') decimal += parseInt(input[i][l]) * currentPower;
        if (input[i][l] == '-') decimal += -1 * currentPower;
        if (input[i][l] == '=') decimal += -2 * currentPower;
        currentPower *= 5;
    }
    decimalResult += decimal;
}

while (decimalResult != 0) {
    if (decimalResult % 5 == 0) {
        result += '0';
    } else if (decimalResult % 5 == 1) {
        result += '1';
        decimalResult -= 1;
    } else if (decimalResult % 5 == 2) {
        result += '2';
        decimalResult -= 2;
    } else if (decimalResult % 5 == 3) {
        result += '=';
        decimalResult += 2;
    } else if (decimalResult % 5 == 4) {
        result += '-';
        decimalResult += 1;
    }
    decimalResult /= 5;
}

result = result.split('').reverse().join('');
console.log(result);
console.timeEnd('Time');