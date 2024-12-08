import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/).map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let possibilities: number[][] = [];
    possibilities.push([input[i][1] + input[i][2], ...input[i].slice(3)]);
    possibilities.push([input[i][1] * input[i][2], ...input[i].slice(3)]);

    while (possibilities.length != 0) {
        let currentPossibility = possibilities.shift();

        if (currentPossibility.length == 1) {
            if (currentPossibility[0] == input[i][0]) {
                result += input[i][0];
                break;
            }
        } else {
            possibilities.push([currentPossibility[0] + currentPossibility[1], ...currentPossibility.slice(2)]);
            possibilities.push([currentPossibility[0] * currentPossibility[1], ...currentPossibility.slice(2)]);
        }
    }
}

console.log(result);
console.timeEnd('Time');