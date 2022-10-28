import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let result = 0;
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if ((l === input[i].length - 1 || input[i].charAt(l) < input[i].charAt(l + 1)) &&
            (i === input.length - 1 || input[i].charAt(l) < input[i + 1].charAt(l)) &&
            (l === 0 || input[i].charAt(l) < input[i].charAt(l - 1)) &&
            (i === 0 || input[i].charAt(l) < input[i - 1].charAt(l))) {
            result += parseInt(input[i].charAt(l)) + 1;
        }
    }
}
console.log(result);
console.timeEnd('Time');