import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' ').filter(y => y != ''));
let result = 1;

let time: number = 0;
let distance: number = 0;
let timeString: string = '';
let distanceString: string = '';

for (let i = 1; i < input[0].length; i++) {
    timeString += input[0][i];
    distanceString += input[1][i];
}

time = parseInt(timeString);
distance = parseInt(distanceString);

let numberOfWaysToWin = 0;

for (let i = 0; i <= time; i++) {
    if ((time - i) * i > distance) numberOfWaysToWin++;
}

result *= numberOfWaysToWin;

console.log(result);
console.timeEnd('Time');