import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    let newValues = [];
    let oldValues = [];
    let firstValues = [input[i][0]];

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

        firstValues.push(newValues[0]);

    } while (newValues.filter(x => x == newValues[0]).length != newValues.length);

    for (let l = 0; l < firstValues.length; l++) {
        result += firstValues[l] * (l % 2 == 0 ? 1 : -1);
    }
}

console.log(result);
console.timeEnd('Time');