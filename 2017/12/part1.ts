import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s<->\s|,\s/).map(y => parseInt(y)));
let result = 0;

let pipes = new Map<number, number[]>();

for (let i = 0; i < input.length; i++) {
    pipes.set(input[i][0], input[i].slice(1));
}

let groupWithZero = new Set<number>();
let toCheck: number[] = [0];

while (toCheck.length != 0) {
    let currentToCheck: number[] = pipes.get(toCheck.shift());

    for (let i = 0; i < currentToCheck.length; i++) {
        if (!groupWithZero.has(currentToCheck[i])) {
            groupWithZero.add(currentToCheck[i]);
            toCheck.push(currentToCheck[i]);
        }
    }
}

result = groupWithZero.size;
console.log(result);
console.timeEnd('Time');