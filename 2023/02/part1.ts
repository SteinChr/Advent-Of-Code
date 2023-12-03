import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|,\s|;\s|\s/));
let result = 0;

let maxColors = new Map<string, number>();
maxColors.set('red', 12);
maxColors.set('green', 13);
maxColors.set('blue', 14);

for (let g = 0; g < input.length; g++) {
    let gamePossible: boolean = true;
    
    for (let i = 2; i < input[g].length; i += 2) {
        if (maxColors.get(input[g][i + 1]) < parseInt(input[g][i])) {
            gamePossible = false;
            break;
        }
    }

    if (gamePossible) result += parseInt(input[g][1]);
}

console.log(result);
console.timeEnd('Time');