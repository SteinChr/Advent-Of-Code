import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let newValues = [];
    let oldValues = [];

    result += input[i][input[i].length - 1];

    do {
        if (newValues.length == 0) {
            oldValues = input[i].slice();
        } else {
            oldValues = newValues.slice();
            newValues = [];
        }

        for (let l = 0; l < oldValues.length - 1; l++) {
            newValues.push(oldValues[l + 1] - oldValues[l]);
        }

        result += newValues[newValues.length - 1];

    } while (newValues.filter(x => x == newValues[0]).length != newValues.length);
}

console.log(result);
console.timeEnd('Time');