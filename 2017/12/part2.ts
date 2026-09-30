import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s<->\s|,\s/).map(y => parseInt(y)));
let result = 0;

let pipes = new Map<number, number[]>();

for (let i = 0; i < input.length; i++) {
    pipes.set(input[i][0], input[i].slice(1));
}

let inGroup = new Set<number>();
let toCheck: number[] = [];

for (let l = 0; l < input.length; l++) {
    if (!inGroup.has(l)) {
        toCheck.push(l);
        result++;
    }

    while (toCheck.length != 0) {
        let currentToCheck: number[] = pipes.get(toCheck.shift());

        for (let i = 0; i < currentToCheck.length; i++) {
            if (!inGroup.has(currentToCheck[i])) {
                inGroup.add(currentToCheck[i]);
                toCheck.push(currentToCheck[i]);
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');