import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').filter(y => y != ''));
let result = 1;

let times = [];
let distances = [];
for (let i = 1; i < input[0].length; i++) {
    times.push(parseInt(input[0][i]));
    distances.push(parseInt(input[1][i]));
}

for (let r = 0; r < times.length; r++) {
    let numberOfWaysToWin = 0;

    for (let i = 0; i <= times[r]; i++) {
        if ((times[r] - i) * i > distances[r]) numberOfWaysToWin++;
    }

    result *= numberOfWaysToWin;
}

console.log(result);
console.timeEnd('Time');