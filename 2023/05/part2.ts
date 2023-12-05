import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/:\r\n|:\s/)[1]).map(y => y.split('\r\n').map(z => z.split(' ').map(t => parseInt(t))));
let result = 0;

let locations: number[] = [];

let newSeeds: number[] = [];
for (let s = 0; s < input[0][0].length; s += 2) {
    for (let i = input[0][0][s]; i < input[0][0][s] + input[0][0][s + 1]; i += (i > 100 ? 30000 : 1)) {
        newSeeds.push(i);
    }
}

let searchValue = 0;

for (let j = 0; j <= 1; j++) {
    for (let s = j == 0 ? 0 : Math.max(0, searchValue - 30000); s < (j == 0 ? newSeeds.length : (newSeeds.length > 1000 ? searchValue + 30000 : newSeeds.length)); s++) {
        let currentSeed = newSeeds.length > 1000 ? (j == 0 ? newSeeds[s] : s) : newSeeds[s];

        for (let i = 1; i < input.length; i++) {
            for (let l = 0; l < input[i].length; l++) {
                if (currentSeed >= input[i][l][1] && currentSeed < input[i][l][1] + input[i][l][2]) {
                    currentSeed += input[i][l][0] - input[i][l][1];
                    break;
                }
            }
        }

        locations.push(currentSeed);
    }

    searchValue = newSeeds[locations.indexOf(Math.min(...locations))];

    if (j == 0) locations = [];
}

result = Math.min(...locations);
console.log(result);
console.timeEnd('Time');