import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let horizontalPosition = 0;
let depth = 0;
let result = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i].charAt(0) == 'f') {
        horizontalPosition += parseInt(input[i].charAt(input[i].length - 1));
    } else if (input[i].charAt(0) == 'd') {
        depth += parseInt(input[i].charAt(input[i].length - 1));
    } else if (input[i].charAt(0) == 'u') {
        depth -= parseInt(input[i].charAt(input[i].length - 1));
    }
}
result = horizontalPosition * depth;
console.log(result);
console.timeEnd('Time');