import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let result = 0;

let left = input.split('\r\n').map(x => parseInt(x.split('   ')[0]));
let right = input.split('\r\n').map(x => parseInt(x.split('   ')[1]));

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
}

console.log(result);
console.timeEnd('Time');