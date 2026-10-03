import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\)\s->\s|\s\(|\)/));
let result = 0;

let names1 = [];
let names2 = [];

for (let i = 0; i < input.length; i++) {
    names1.push(input[i][0]);

    let programsAbove = input[i][2].split(/,\s/);

    for (let l = 0; l < programsAbove.length && programsAbove[0] != ''; l++) {
        names2.push(programsAbove[l]);
    }
}

for (let i = 0; i < names1.length; i++) {
    if (!names2.includes(names1[i])) {
        result = names1[i];
        break;
    }
}

console.log(result);
console.timeEnd('Time');