import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/:\r\n|:\s/)[1]).map(y => y.split('\r\n').map(z => z.split(' ').map(t => parseInt(t))));
let result = 0;

let locations: number[] = [];

for (let s = 0; s < input[0][0].length; s++) {
    let currentSeed = input[0][0][s];

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

result = Math.min(...locations);
console.log(result);
console.timeEnd('Time');