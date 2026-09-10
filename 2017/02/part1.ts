import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s|\t/).map(y => parseInt(y)));
let result = 0;

for (let i = 0; i < input.length; i++) {
    result += Math.max(...input[i]) - Math.min(...input[i]);
}

console.log(result);
console.timeEnd('Time');