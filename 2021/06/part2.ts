import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let count = new Array(9);
let result = 0;
for (let i = 0; i < count.length; i++) {
    count[i] = input.filter(x => x == i).length;
}
for (let i = 0; i < 256; i++) {
    count.push(count[0]);
    count[7] += count[0];
    count.splice(0, 1);
}
for (let i = 0; i < count.length; i++) {
    result += count[i];
}
console.log(result);
console.timeEnd('Time');