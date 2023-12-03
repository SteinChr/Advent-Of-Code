import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|,\s|;\s|\s/));
let result = 0;

for (let g = 0; g < input.length; g++) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (let i = 2; i < input[g].length; i += 2) {
        if (input[g][i + 1] == 'red' && parseInt(input[g][i]) > maxRed) maxRed = parseInt(input[g][i]);
        if (input[g][i + 1] == 'green' && parseInt(input[g][i]) > maxGreen) maxGreen = parseInt(input[g][i]);
        if (input[g][i + 1] == 'blue' && parseInt(input[g][i]) > maxBlue) maxBlue = parseInt(input[g][i]);
    }

    result += maxRed * maxGreen * maxBlue;
}

console.log(result);
console.timeEnd('Time');