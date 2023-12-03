import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (!isNaN(parseInt(input[y][x]))) {
            let numberOfDigits = 1;

            if (x < input[y].length - 1 && !isNaN(parseInt(input[y][x + 1]))) numberOfDigits++;
            if (x < input[y].length - 2 && !isNaN(parseInt(input[y][x + 2]))) numberOfDigits++;

            if (checkForSymbol(x, y, numberOfDigits)) result += parseInt(input[y].substr(x, numberOfDigits));
            
            x += numberOfDigits - 1;
        }
    }
}

console.log(result);

function checkForSymbol(x: number, y: number, numberOfDigits: number): boolean {
    for (let yChange = -1; yChange <= 1; yChange++) {
        for (let xChange = -1; xChange <= numberOfDigits; xChange++) {
            if (x + xChange > 0 && x + xChange < input[0].length - 1 && y + yChange > 0 && y + yChange < input.length - 1 && isNaN(parseInt(input[y + yChange][x + xChange])) && input[y + yChange][x + xChange] != '.') return true;
        }
    }
    return false;
}

console.timeEnd('Time');